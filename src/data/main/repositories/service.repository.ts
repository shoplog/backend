import { Selectable } from 'kysely';
import { MainDatabase } from 'src/data/main/database';
import { Service } from 'src/data/main/main-db';

export interface IServiceRepository {
	getServicesByUserId(userId: string, includeDefaults: boolean): Promise<Selectable<Service>[]>;
}

export class ServiceRepository implements IServiceRepository {
	constructor(readonly db: MainDatabase) {}

	getServicesByUserId(userId: string, includeDefaults: boolean): Promise<Selectable<Service>[]> {
		const query = this.db.selectFrom('services').selectAll().where('user_id', '=', userId);

		if (includeDefaults) {
			query.where('user_id', '=', null);
		}

		return query.execute();
	}
}
