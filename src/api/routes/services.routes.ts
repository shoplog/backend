import { Router } from 'express';
import { SCOPES } from 'src/api/constants/scopes';
import { IServicesController } from 'src/api/controllers/services.controller';
import { checkJwt, checkScopes, contextWrapMiddleware } from 'src/api/middlewares';

export const createServicesRoutes = async (servicesController: IServicesController) => {
	const router = Router();
	router.use(checkJwt);
	router.use(checkScopes(SCOPES.VPIC_READ));
	router.get('/services', contextWrapMiddleware(servicesController.getServices.bind(servicesController)));

	return router;
};
