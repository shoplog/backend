import { Router } from 'express';
import { VehiclesController } from 'src/api/controllers/vehicles-controller';
import { contextWrapMiddleware } from 'src/api/middlewares';
import { VPICDatabase } from 'src/common/initializers/database';
import { VinRepository } from 'src/data/vpic/repositories/vin.repository';
import { YearRepository } from 'src/data/vpic/repositories/year.repository';
import { VehicleSearchService } from 'src/domain/services/vehicle-search.service';

export const createVehiclesRoutes = async () => {
	const router = Router();
	const vinRepository = new VinRepository(VPICDatabase);
	const yearRepository = new YearRepository(VPICDatabase);
	const service = new VehicleSearchService(vinRepository, yearRepository);
	const controller = new VehiclesController(service);

	router.get('/vehicles/search/by-vin', contextWrapMiddleware(controller.searchByVin.bind(controller)));
	router.get('/vehicles/search/years', contextWrapMiddleware(controller.searchYears.bind(controller)));

	return router;
};
