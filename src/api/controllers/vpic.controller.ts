import { Request, Response } from 'express';
import { components, paths } from 'src/api/types/openapi';
import { IVPICService } from 'src/domains/vpic/services/vpic.service';

export type VPICVinRequest = Request<unknown, unknown, unknown, paths['/vpic/vin']['get']['parameters']['query']>;
export type VPICVinResponseBody = components['schemas']['VPICVinResponseBody'];
export type VPICYearsResponseBody = components['schemas']['VPICYearsResponseBody'];
export type VPICMakesRequest = Request<unknown, unknown, unknown, paths['/vpic/makes']['get']['parameters']['query']>;
export type VPICMakesByYearResponseBody = components['schemas']['VPICMakesResponseBody'];

export class VPICController {
	constructor(readonly VPICService: IVPICService) {}

	async searchByVin(req: VPICVinRequest, res: Response<VPICVinResponseBody>) {
		const result = await this.VPICService.searchByVin(req.query.vin);

		res.json(result);
	}

	async getYears(req: Request, res: Response<VPICYearsResponseBody>) {
		const years = await this.VPICService.getAllSupportedYears();

		res.json(years);
	}

	async getMakes(req: VPICMakesRequest, res: Response<VPICMakesByYearResponseBody>) {
		const makes = await this.VPICService.getMakesByYear(req.query.year);

		res.json(makes);
	}
}
