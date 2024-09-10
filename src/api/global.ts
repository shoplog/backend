import { VehiclesController } from 'src/api/controllers/vehicles.controller';
import { VPICController } from 'src/api/controllers/vpic.controller';
import { MainDatabase } from 'src/data/main/database';
import { VehicleRepository } from 'src/data/main/repositories';
import { VPICDatabase } from 'src/data/vpic/database';
import {
	LookupRepository,
	MakeRepository,
	ModelRepository,
	VinRepository,
	YearRepository,
} from 'src/data/vpic/repositories';
import { VehicleService } from 'src/domains/main/services/vehicle.service';
import { VPICService } from 'src/domains/vpic/services/vpic.service';

export const loadDependencies = (vpicDatabase: VPICDatabase, mainDatabase: MainDatabase) => {
	const vinRepository = new VinRepository(vpicDatabase);
	const yearRepository = new YearRepository(vpicDatabase);
	const makeRepository = new MakeRepository(vpicDatabase);
	const modelRepository = new ModelRepository(vpicDatabase);
	const lookupRepository = new LookupRepository(vpicDatabase);
	const vpicService = new VPICService(vinRepository, yearRepository, makeRepository, modelRepository, lookupRepository);
	const vpicController = new VPICController(vpicService);

	const vehicleRepository = new VehicleRepository(mainDatabase);
	const vehicleService = new VehicleService(vehicleRepository);
	const vehiclesController = new VehiclesController(vehicleService);

	return {
		controllers: {
			vpicController,
			vehiclesController,
		},
	};
};

export type Dependencies = ReturnType<typeof loadDependencies>;
