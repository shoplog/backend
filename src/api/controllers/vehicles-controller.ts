import { Request, Response } from 'express';
import { components, paths } from 'src/api/types/openapi';
import { IVehicleSearchService } from 'src/domain/services/vehicle-search.service';

export type VehiclesSearchByVinRequest = Request<
	unknown,
	unknown,
	unknown,
	paths['/vehicles/search/by-vin']['get']['parameters']['query']
>;

export type VehiclesSearchByVinResponseBody = components['schemas']['VehiclesSearchByVinResponseBody'];
export type VehiclesSearchYearsResponseBody = components['schemas']['VehiclesSearchYearsResponseBody'];

export class VehiclesController {
	constructor(readonly vehicleSearchService: IVehicleSearchService) {}

	async searchByVin(req: VehiclesSearchByVinRequest, res: Response<VehiclesSearchByVinResponseBody>) {
		const result = await this.vehicleSearchService.searchByVin(req.query.vin);

		res.json(result);
	}

	async searchYears(req: Request, res: Response<VehiclesSearchYearsResponseBody>) {
		const years = await this.vehicleSearchService.getAllSupportedYears();

		res.json(years);
	}
}
