import { Service } from '@prisma/client';
import { IServiceRepository } from 'src/data/main/repositories/service.repository';

export type ServiceDto = {
	id: string;
	userId: string | null;
	name: string;
	description: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export interface IServiceService {
	getServicesByUserId(userId: string): Promise<ServiceDto[]>;
}

export class ServiceService implements IServiceService {
	constructor(readonly serviceRepository: IServiceRepository) {}

	async getServicesByUserId(userId: string): Promise<ServiceDto[]> {
		const services = await this.serviceRepository.getServicesByUserId(userId, true);

		return services.map(this.#toServiceDto);
	}

	#toServiceDto(service: Service): ServiceDto {
		return {
			...service,
		};
	}
}
