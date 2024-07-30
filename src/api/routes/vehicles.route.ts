import { Request, Response, Router } from 'express';
import { components, paths } from 'src/api/types/openapi';

type VehiclesSearchByVinRequest = Request<
	unknown,
	unknown,
	unknown,
	paths['/vehicles/search/by-vin']['get']['parameters']['query']
>;
type VehiclesSearchByVinResponse = Response<components['schemas']['VehiclesSearchByVinResult']>;

export const createVehiclesRoutes = async () => {
	const router = Router();

	router.get('/vehicles/search/by-vin', (req: VehiclesSearchByVinRequest, res: VehiclesSearchByVinResponse) => {
		res.json({
			vin: '1HGCM82633A123456',
			makeId: 448,
			make: 'Toyota',
			modelId: 2223,
			model: 'Tacoma',
			year: 2002,
		});
	});

	return router;
};
