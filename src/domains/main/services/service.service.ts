import { Selectable } from 'kysely';
import { Service } from 'src/data/main/main-db';
import { IServiceRepository } from 'src/data/main/repositories/service.repository';

export type ServiceDto = {
	id: number;
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

		return services.map(ServiceService.toServiceDto);
	}

	static toServiceDto(service: Selectable<Service>): ServiceDto {
		return {
			id: service.id,
			name: service.name,
			description: service.description,
			userId: service.user_id,
			createdAt: service.created_at,
			updatedAt: service.updated_at,
		};
	}
}
