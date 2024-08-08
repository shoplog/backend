import { Request, Response } from 'express';
import { components, paths } from 'src/api/types/openapi';
import { VehicleSearchService } from 'src/domain/services/vehicle-search.service';

export type VehiclesSearchByVinRequest = Request<
	unknown,
	unknown,
	unknown,
	paths['/vehicles/search/by-vin']['get']['parameters']['query']
>;

export type VehiclesSearchByVinResponseBody = components['schemas']['VehiclesSearchByVinResult'];
export type VehiclesSearchByVinResponse = Response<VehiclesSearchByVinResponseBody>;

export class VehiclesController {
	constructor(readonly vehicleSearchService: VehicleSearchService) {}

	async searchByVin(req: VehiclesSearchByVinRequest, res: VehiclesSearchByVinResponse) {
		const result = await this.vehicleSearchService.searchByVin(req.query.vin);

		res.json(result);
	}
}
