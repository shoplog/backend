import { VPICController } from 'src/api/controllers/vpic.controller';
import { VPICDatabase } from 'src/common/initializers/database';
import {
	LookupRepository,
	MakeRepository,
	ModelRepository,
	VinRepository,
	YearRepository,
} from 'src/data/vpic/repositories';
import { VPICService } from 'src/domains/vpic/services/vpic.service';

const vinRepository = new VinRepository(VPICDatabase);
const yearRepository = new YearRepository(VPICDatabase);
const makeRepository = new MakeRepository(VPICDatabase);
const modelRepository = new ModelRepository(VPICDatabase);
const lookupRepository = new LookupRepository(VPICDatabase);
const vpicService = new VPICService(vinRepository, yearRepository, makeRepository, modelRepository, lookupRepository);
const vpicController = new VPICController(vpicService);

export { vpicController };
