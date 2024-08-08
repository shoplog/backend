import { Request, Response } from 'express';
import { components, paths } from 'src/api/types/openapi';
import { IVPICService } from 'src/domains/vpic/services/vpic.service';

export type VPICVinRequest = Request<paths['/vpic/vin/{vin}']['get']['parameters']['path']>;
export type VPICVinResponseBody = components['schemas']['VPICVinResponseBody'];
export type VPICYearsResponseBody = components['schemas']['VPICYearsResponseBody'];
export type VPICMakesRequest = Request<paths['/vpic/years/{year}/makes']['get']['parameters']['path']>;
export type VPICMakesByYearResponseBody = components['schemas']['VPICMakesResponseBody'];
export type VPICModelsRequest = Request<paths['/vpic/makes/{makeId}/year/{year}/models']['get']['parameters']['path']>;
export type VPICModelsResponseBody = components['schemas']['VPICModelsResponseBody'];
export type VPICModelAttributesRequest = Request<
	paths['/vpic/models/{modelId}/year/{year}/attributes']['get']['parameters']['path']
>;
export type VPICModelAttributesResponseBody = components['schemas']['VPICModelAttributesResponseBody'];

export interface IVPICController {
	searchByVin(req: VPICVinRequest, res: Response<VPICVinResponseBody>): Promise<void>;
	getYears(req: Request, res: Response<VPICYearsResponseBody>): Promise<void>;
	getMakes(req: VPICMakesRequest, res: Response<VPICMakesByYearResponseBody>): Promise<void>;
	getModels(req: VPICModelsRequest, res: Response<VPICModelsResponseBody>): Promise<void>;
	getModelAttributes(req: VPICModelAttributesRequest, res: Response<VPICModelAttributesResponseBody>): Promise<void>;
}

export class VPICController implements IVPICController {
	constructor(readonly VPICService: IVPICService) {}

	async searchByVin(req: VPICVinRequest, res: Response<VPICVinResponseBody>) {
		const result = await this.VPICService.searchByVin(req.params.vin);

		res.json(result);
	}

	async getYears(req: Request, res: Response<VPICYearsResponseBody>) {
		const years = await this.VPICService.getAllSupportedYears();

		res.json(years);
	}

	async getMakes(req: VPICMakesRequest, res: Response<VPICMakesByYearResponseBody>) {
		const makes = await this.VPICService.getMakesByYear(req.params.year);

		res.json(makes);
	}

	async getModels(req: VPICModelsRequest, res: Response<VPICModelsResponseBody>) {
		const { makeId, year } = req.params;
		const models = await this.VPICService.getModelsByMakeIdAndYear(makeId, year);

		res.json(models);
	}

	async getModelAttributes(req: VPICModelAttributesRequest, res: Response<VPICModelAttributesResponseBody>) {
		const { modelId, year } = req.params;
		const attributes = await this.VPICService.getModelAttributesByIdAndYear(modelId, year);

		res.json(attributes);
	}
}
