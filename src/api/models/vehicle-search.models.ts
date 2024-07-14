import { Request, Response } from 'express';
import { components, paths } from 'src/api/types/openapi';

export type VehiclesSearchByVinResult = components['schemas']['VehiclesSearchByVinResult'];
export type VehicleSearchByVinRequest = Request<
	unknown,
	unknown,
	unknown,
	paths['/vehicles/search/by-vin']['get']['parameters']['query']
>;
export type VehicleSearchByVinResponse = Response<VehiclesSearchByVinResult>;
