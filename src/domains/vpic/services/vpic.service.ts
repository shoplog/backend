import { camelCase, capitalize } from 'lodash';
import { ILookupRepository } from 'src/data/vpic/repositories/lookup.repository';
import { IMakeRepository } from 'src/data/vpic/repositories/make.repository';
import { IModelRepository } from 'src/data/vpic/repositories/model.repository';
import { IVinRepository, VehicleElements } from 'src/data/vpic/repositories/vin.repository';
import { IYearRepository } from 'src/data/vpic/repositories/year.repository';
import { ResourceNotFoundError } from 'src/domains/common/errors/resource-not-found.error';
import { ElementLoadError } from 'src/domains/vpic/errors/element-load.error';
import { SearchByVinError } from 'src/domains/vpic/errors/search-by-vin.error';
import { toLookupDto } from 'src/domains/vpic/utils/map';
import { stripHtml } from 'string-strip-html';

export type SearchByVinResultDto = {
	vin: string;
	suggestedVin?: string;
	makeId: number;
	make: string;
	modelId: number;
	model: string;
	year: number;
	attributes?: {
		[key: string]: string | number;
	};
};

export type LookupDto = {
	id: number;
	name: string;
};

export type ModelAttributeDto = {
	code: string;
	name: string;
	description: string;
	values: {
		id: number | null;
		value: string | number;
		vinSchemaIds: number[];
	}[];
};

export interface IVPICService {
	searchByVin(vin: string): Promise<SearchByVinResultDto | undefined>;
	getAllSupportedYears(): Promise<number[]>;
	getMakesByYear(year: number): Promise<LookupDto[]>;
	getModelsByMakeIdAndYear(makeId: number, year: number): Promise<LookupDto[]>;
	getModelAttributesByIdAndYear(modelId: number, year: number): Promise<ModelAttributeDto[]>;
}

export class VPICService implements IVPICService {
	constructor(
		readonly vinRepository: IVinRepository,
		readonly yearRepository: IYearRepository,
		readonly makeRepository: IMakeRepository,
		readonly modelRepository: IModelRepository,
		readonly lookupRepository: ILookupRepository
	) {}

	async getModelAttributesByIdAndYear(modelId: number, year: number): Promise<ModelAttributeDto[]> {
		const model = await this.modelRepository.getModel(modelId);

		if (!model) {
			throw new ResourceNotFoundError('Model', { modelId });
		}

		type Code = {
			Name: string;
			LookupTable: string | null;
			DataType: string;
			Description: string;
			Values: Map<string | number, Set<number>>;
		};

		const attributes = await this.modelRepository.getModelAttributesByModelIdYear(modelId, year);
		const attributesMap = attributes.reduce((acc, currentValue) => {
			const { Code, Name, Description, AttributeId, DataType, LookupTable, VinSchemaId } = currentValue;
			const code = acc.get(Code);

			if (!code) {
				acc.set(Code, {
					Name,
					Description,
					DataType,
					LookupTable,
					Values: new Map([[AttributeId, new Set([VinSchemaId])]]),
				});
			} else {
				const attribute = code.Values.get(AttributeId);

				if (!attribute) {
					code.Values.set(AttributeId, new Set([VinSchemaId]));
				} else {
					attribute.add(VinSchemaId);
				}
			}

			return acc;
		}, new Map<string, Code>());

		return await Promise.all(
			Array.from(attributesMap, async ([code, element]) => {
				const modelAttribute: ModelAttributeDto = {
					code: camelCase(code),
					name: element.Name,
					description: stripHtml(element.Description).result,
					values: await Promise.all(
						Array.from(element.Values, async ([key, vinSchemaIdSet]) => {
							let value: string | number;
							let id: number | null = null;

							if (element.DataType === 'int' || element.DataType === 'decimal') {
								const num = Number(key);
								value = isNaN(num) ? key : num;
							} else if (element.DataType === 'string') {
								value = key;
							} else if (element.DataType === 'lookup' && element.LookupTable) {
								id = Number(key);

								const lookup = await this.lookupRepository.getLookup(id, element.LookupTable);

								if (lookup) {
									value = lookup.Name;
								} else {
									value = '';
								}
							} else {
								value = '';
							}

							if (!value) {
								throw new ElementLoadError(code, { element });
							}

							return {
								id,
								value,
								vinSchemaIds: Array.from(vinSchemaIdSet),
							};
						})
					),
				};

				return modelAttribute;
			})
		);
	}

	async searchByVin(vin: string): Promise<SearchByVinResultDto> {
		const vehicleElements = await this.vinRepository.vinDecode(vin);
		const excludeElements: (keyof VehicleElements)[] = [
			'Make',
			'MakeId',
			'Model',
			'ModelId',
			'ModelYear',
			'ErrorCode',
			'SuggestedVIN',
			'ErrorText',
			'ErrorCodeId',
			'PossibleValues',
			'AdditionalErrorText',
		];

		if (
			vehicleElements.Make &&
			vehicleElements.MakeId &&
			vehicleElements.Model &&
			vehicleElements.ModelId &&
			vehicleElements.ModelYear
		) {
			if (vehicleElements.ErrorCode === '0' || vehicleElements.SuggestedVIN) {
				const elements = Object.fromEntries(
					Object.keys(vehicleElements)
						.map((key) => key as keyof VehicleElements)
						.filter((key) => !excludeElements.includes(key))
						.map((code) => [
							camelCase(code),
							typeof vehicleElements[code] === 'string'
								? (vehicleElements[code] as string)
								: Number(vehicleElements[code]),
						])
				);

				return {
					vin,
					suggestedVin: vehicleElements.SuggestedVIN ? vehicleElements.SuggestedVIN : undefined,
					makeId: vehicleElements.MakeId,
					make: capitalize(vehicleElements.Make.toLowerCase()),
					modelId: vehicleElements.ModelId,
					model: vehicleElements.Model,
					year: Number(vehicleElements.ModelYear),
					attributes: elements,
				};
			} else {
				throw new SearchByVinError('Failed to decode VIN', {
					vin,
				});
			}
		} else {
			const errorText = vehicleElements.ErrorText ? vehicleElements.ErrorText.split('-')[1].trim() : null;
			const errorCode = vehicleElements.ErrorCode;

			throw new SearchByVinError('Failed to decode VIN', {
				vin,
				errorText,
				errorCode,
			});
		}
	}

	async getAllSupportedYears(): Promise<number[]> {
		return await this.yearRepository.getAllYears();
	}

	async getMakesByYear(year: number): Promise<LookupDto[]> {
		const makes = await this.makeRepository.getMakesByYear(year);

		return makes.map(toLookupDto);
	}

	async getModelsByMakeIdAndYear(makeId: number, year: number): Promise<LookupDto[]> {
		const models = await this.modelRepository.getModelsByMakeYear(makeId, year);

		return models.map(toLookupDto);
	}
}
