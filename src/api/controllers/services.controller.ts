import { Request, Response } from 'express';
import { components } from 'src/api/types/openapi';
import { getRequiredUserId } from 'src/api/util';
import { IServiceService, ServiceDto } from 'src/domains/main/services/service.service';

export type ServiceResponse = components['schemas']['Service'];

export interface IServicesController {
	getServices: (req: Request, res: Response<ServiceResponse[]>) => Promise<void>;
}

export class ServicesController implements IServicesController {
	constructor(readonly serviceService: IServiceService) {}

	async getServices(req: Request, res: Response<ServiceResponse[]>): Promise<void> {
		const userId = getRequiredUserId(req);
		const services = await this.serviceService.getServicesByUserId(userId);

		res.json(services.map(this.#toServiceDto));
	}

	#toServiceDto(service: ServiceDto): ServiceResponse {
		return {
			...service,
			createdAt: service.createdAt.toISOString(),
			updatedAt: service.updatedAt.toISOString(),
		};
	}
}
