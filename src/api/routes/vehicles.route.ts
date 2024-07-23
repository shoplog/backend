import { Static } from '@sinclair/typebox';
import { Request, Response, Router } from 'express';
import { VehiclesSearchByVinResponseBodySchema } from 'src/api/openapi/schemas/vehicles.schema';

type VehiclesSearchByVinRequest = Request<unknown, unknown, unknown, { vin: string }>;
type VehiclesSearchByVinResponse = Response<Static<typeof VehiclesSearchByVinResponseBodySchema>>;

export const createVehiclesRoutes = async () => {
	const router = Router();

	router.get('/vehicles/search/by-vin', (req: VehiclesSearchByVinRequest, res: VehiclesSearchByVinResponse) => {
		res.json({
			VIN: '1HGCM82633A123456',
			makeId: 448,
			make: 'Toyota',
			modelId: 2223,
			model: 'Tacoma',
			year: 2002,
		});
	});

	return router;
};
