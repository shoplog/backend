import { camelCase, capitalize } from 'lodash';
import { IVinRepository, VehicleElements } from 'src/data/vpic/repositories/vin.repository';
import { SearchByVinError } from 'src/domain/errors/search-by-vin.error';

export type VehicleSearchByVinResultDto = {
	vin?: string;
	suggestedVin?: string;
	makeId?: number;
	make?: string;
	modelId?: number;
	model?: string;
	year?: number;
	attributes?: {
		[key: string]: string | number;
	};
};

export interface IVehicleSearchService {
	searchByVin(vin: string): Promise<VehicleSearchByVinResultDto | undefined>;
}

export class VehicleSearchService implements IVehicleSearchService {
	constructor(readonly vinRepository: IVinRepository) {}

	async searchByVin(vin: string): Promise<VehicleSearchByVinResultDto> {
		const vehicleElements = await this.vinRepository.searchByVin(vin);
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
}
