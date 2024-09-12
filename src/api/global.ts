import { MaintenanceLogsController } from 'src/api/controllers/maintenance-logs.controller';
import { ServicesController } from 'src/api/controllers/services.controller';
import { VehiclesController } from 'src/api/controllers/vehicles.controller';
import { VPICController } from 'src/api/controllers/vpic.controller';
import { MainDatabase } from 'src/data/main/database';
import { VehicleRepository } from 'src/data/main/repositories';
import { MaintenanceLogRepository } from 'src/data/main/repositories/maintenance-log.repository';
import { ServiceRepository } from 'src/data/main/repositories/service.repository';
import { VPICDatabase } from 'src/data/vpic/database';
import {
	LookupRepository,
	MakeRepository,
	ModelRepository,
	VinRepository,
	YearRepository,
} from 'src/data/vpic/repositories';
import { MaintenanceLogService } from 'src/domains/main/services/maintenance-log.service';
import { ServiceService } from 'src/domains/main/services/service.service';
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

	const maintenanceLogRepository = new MaintenanceLogRepository(mainDatabase);
	const maintenanceLogService = new MaintenanceLogService(maintenanceLogRepository);
	const maintenancesLogController = new MaintenanceLogsController(maintenanceLogService);

	const servicesRepository = new ServiceRepository(mainDatabase);
	const servicesService = new ServiceService(servicesRepository);
	const servicesController = new ServicesController(servicesService);

	const vehicleRepository = new VehicleRepository(mainDatabase);
	const vehicleService = new VehicleService(vehicleRepository);
	const vehiclesController = new VehiclesController(vehicleService);

	return {
		controllers: {
			vpicController,
			vehiclesController,
			servicesController,
			maintenancesLogController,
		},
	};
};

export type Dependencies = ReturnType<typeof loadDependencies>;
