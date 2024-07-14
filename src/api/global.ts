import { VehicleSearchController } from 'src/api/controllers/vehicle-search.controller';
import { VehicleDb } from 'src/common/initializers/db';
import { VehicleSearchRepository } from 'src/data/vpic/repositories/vehicle-search.repository';
import { VehicleSearchService } from 'src/domain/services/vehicle-search.service';

export const $VehicleSearchRepository = new VehicleSearchRepository(VehicleDb);
export const $VehicleSearchService = new VehicleSearchService($VehicleSearchRepository);
export const $VehicleSearchController = new VehicleSearchController($VehicleSearchService);
