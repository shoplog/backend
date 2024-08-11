import { sql } from 'kysely';
import { VPICDatabase, VPICTables } from 'src/data/vpic/database';
import { SelectableLookup } from 'src/data/vpic/types/common';

export interface ILookupRepository {
	getLookup(id: number, table: string): Promise<SelectableLookup | undefined>;
}

export class LookupRepository implements ILookupRepository {
	constructor(readonly db: VPICDatabase) {}

	async getLookup(id: number, table: VPICTables): Promise<SelectableLookup | undefined> {
		return await this.db
			.selectFrom(table)
			.select([sql<number>`Id`.as('Id'), sql<string>`Name`.as('Name')])
			.where('Id', '=', id)
			.executeTakeFirst();
	}
}
