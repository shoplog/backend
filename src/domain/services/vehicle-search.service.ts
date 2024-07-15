import { camelCase, capitalize } from 'lodash';
import { VehicleElements, VehicleSearchRepository } from 'src/data/vpic/repositories/vehicle-search.repository';
import { VehicleSearchByVinError } from 'src/domain/errors/vehicle-search-by-vin.error';

export type VehicleSearchResult = {
	vin: string;
	suggestedVIN?: string;
	makeId: number;
	make: string;
	modelId: number;
	model: string;
	year: number;
	attributes: {
		[element: string]: string | number | undefined;
	};
};

export class VehicleSearchService {
	constructor(readonly vehicleSearchRepository: VehicleSearchRepository) {}
	async searchByVin(vin: string): Promise<VehicleSearchResult> {
		const vehicleElements = await this.vehicleSearchRepository.searchByVin(vin);
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
						.map((code) => [camelCase(code), vehicleElements[code] as string | undefined])
				);

				return {
					vin,
					suggestedVIN: vehicleElements.SuggestedVIN ?? undefined,
					makeId: vehicleElements.MakeId,
					make: capitalize(vehicleElements.Make.toLowerCase()),
					modelId: vehicleElements.ModelId,
					model: vehicleElements.Model,
					year: Number(vehicleElements.ModelYear),
					attributes: elements,
				};
			} else {
				throw new VehicleSearchByVinError('Failed to decode VIN', {
					vin,
				});
			}
		} else {
			const errorText = vehicleElements.ErrorText ? vehicleElements.ErrorText.split('-')[1].trim() : null;
			const errorCode = vehicleElements.ErrorCode;

			throw new VehicleSearchByVinError('Failed to decode VIN', {
				vin,
				errorText,
				errorCode,
			});
		}
	}
}
