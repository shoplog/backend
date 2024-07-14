import { Router } from 'express';
import { $VehicleSearchController } from 'src/api/global';
import { checkJwt, contextWrapMiddleware } from 'src/api/middlewares';

export async function createVehicleSearchRoutes(): Promise<Router> {
	const router = Router();

	router.use(checkJwt);

	router.get(
		'/by-vin',
		contextWrapMiddleware($VehicleSearchController.searchByVin.bind($VehicleSearchController), {
			disableTransaction: true,
		})
	);

	return router;
}
