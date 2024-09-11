import { Service } from '@prisma/client';
import { MainDatabase } from 'src/data/main/database';

export interface IServiceRepository {
	getServicesByUserId(userId: string, includeDefaults: boolean): Promise<Service[]>;
}

export class ServiceRepository implements IServiceRepository {
	constructor(readonly db: MainDatabase) {}

	getServicesByUserId(userId: string, includeDefaults: boolean): Promise<Service[]> {
		const OR: { userId: string | null }[] = [
			{
				userId,
			},
		];

		if (includeDefaults) {
			OR.push({ userId: null });
		}

		return this.db.service.findMany({
			where: {
				OR,
			},
		});
	}
}
