import { sql } from 'kysely';
import { VPICDatabase } from 'src/data/vpic/database';
import { SelectableLookup } from 'src/data/vpic/types/common';

export interface IMakeRepository {
	getMakesByYear(year: number): Promise<SelectableLookup[]>;
}

export class MakeRepository implements IMakeRepository {
	constructor(readonly db: VPICDatabase) {}

	async getMakesByYear(year: number): Promise<SelectableLookup[]> {
		const query = await this.db
			.selectFrom('Wmi_Make as wm')
			.innerJoin('Wmi_VinSchema as wv', 'wv.WmiId', 'wm.WmiId')
			.innerJoin('Make as m', 'm.Id', 'wm.MakeId')
			.where('wv.YearFrom', '<=', year)
			.where(sql`ISNULL(wv.YearTo, 2999)`, '>=', year)
			.select(['m.Id', 'm.Name'])
			.distinct()
			.orderBy('m.Name', 'asc')
			.execute();

		return query;
	}
}
