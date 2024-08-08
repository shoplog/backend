import { Router } from 'express';
import { IVPICController } from 'src/api/controllers/vpic.controller';
import { contextWrapMiddleware } from 'src/api/middlewares';

export const createVPICRoutes = async (vpicController: IVPICController) => {
	const router = Router();

	router.get('/vpic/vin/:vin', contextWrapMiddleware(vpicController.searchByVin.bind(vpicController)));
	router.get('/vpic/years', contextWrapMiddleware(vpicController.getYears.bind(vpicController)));
	router.get('/vpic/years/:year/makes', contextWrapMiddleware(vpicController.getMakes.bind(vpicController)));
	router.get(
		'/vpic/makes/:makeId/year/:year/models',
		contextWrapMiddleware(vpicController.getModels.bind(vpicController))
	);
	router.get(
		'/vpic/models/:modelId/year/:year/attributes',
		contextWrapMiddleware(vpicController.getModelAttributes.bind(vpicController))
	);

	return router;
};
