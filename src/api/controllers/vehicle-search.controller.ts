import { VehicleSearchByVinRequest, VehicleSearchByVinResponse } from 'src/api/models/vehicle-search.models';
import { VehicleSearchService } from 'src/domain/services/vehicle-search.service';

export class VehicleSearchController {
	constructor(readonly vehicleSearchService: VehicleSearchService) {
		this.vehicleSearchService = vehicleSearchService;
	}

	async searchByVin(req: VehicleSearchByVinRequest, res: VehicleSearchByVinResponse) {
		const { vin } = req.query;
		const result = await this.vehicleSearchService.searchByVin(vin);

		res.json(result);
	}
}
