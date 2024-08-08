import { Router } from 'express';
import { VPICController } from 'src/api/controllers/vpic.controller';
import { contextWrapMiddleware } from 'src/api/middlewares';
import { VPICDatabase } from 'src/common/initializers/database';
import { MakeRepository } from 'src/data/vpic/repositories/make.repository';
import { ModelRepository } from 'src/data/vpic/repositories/model.repository';
import { VinRepository } from 'src/data/vpic/repositories/vin.repository';
import { YearRepository } from 'src/data/vpic/repositories/year.repository';
import { VPICService } from 'src/domains/vpic/services/vpic.service';

export const createVPICRoutes = async () => {
	const router = Router();
	const vinRepository = new VinRepository(VPICDatabase);
	const yearRepository = new YearRepository(VPICDatabase);
	const makeRepository = new MakeRepository(VPICDatabase);
	const modelRepository = new ModelRepository(VPICDatabase);
	const service = new VPICService(vinRepository, yearRepository, makeRepository, modelRepository);
	const controller = new VPICController(service);

	router.get('/vpic/vin', contextWrapMiddleware(controller.searchByVin.bind(controller)));
	router.get('/vpic/years', contextWrapMiddleware(controller.getYears.bind(controller)));
	router.get('/vpic/makes', contextWrapMiddleware(controller.getMakes.bind(controller)));
	router.get('/vpic/models', contextWrapMiddleware(controller.getModels.bind(controller)));

	return router;
};
