import { VehicleSearchRepository } from 'src/data/vpic/repositories/vehicle-search.repository';
import { VehicleSearchByVinError } from 'src/domain/errors/vehicle-search-by-vin.error';

export type VehicleSearchResult = {
	[key: string]: string | null;
};

export class VehicleSearchService {
	constructor(readonly vehicleSearchRepository: VehicleSearchRepository) {}
	async searchByVin(vin: string): Promise<VehicleSearchResult> {
		const result = await this.vehicleSearchRepository.searchByVin(vin);

		if (result.ErrorCode == '0') {
			result.ErrorText = null;
			result.ErrorCode = null;
		} else {
			if (result.ErrorText) {
				result.ErrorText = result.ErrorText.split('-')[1].trim();
			}

			if (!result.SuggestedVin) {
				throw new VehicleSearchByVinError('Failed to decode VIN', {
					vin,
					errorText: result.ErrorText,
					errorCode: result.ErrorCode,
				});
			}
		}

		return result;
	}
}
