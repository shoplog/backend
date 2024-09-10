import { Router } from 'express';
import { SCOPES } from 'src/api/constants/scopes';
import { IVehiclesController } from 'src/api/controllers/vehicles.controller';
import { checkJwt, checkScopes, contextWrapMiddleware } from 'src/api/middlewares';

export const createVehiclesRoutes = async (vehiclesController: IVehiclesController) => {
	const router = Router();
	router.use(checkJwt);
	router.use(checkScopes(SCOPES.VPIC_READ));
	router.get('/vehicles', contextWrapMiddleware(vehiclesController.getVehicles.bind(vehiclesController)));
	router.post('/vehicles', contextWrapMiddleware(vehiclesController.createVehicle.bind(vehiclesController)));

	return router;
};
