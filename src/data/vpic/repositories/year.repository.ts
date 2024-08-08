import { VPICDatabase } from 'src/common/initializers/database';

export interface IYearRepository {
	getAllYears(): Promise<number[]>;
}

export class YearRepository implements IYearRepository {
	constructor(readonly db: VPICDatabase) {}

	async getAllYears(): Promise<number[]> {
		const data = await this.db
			.selectFrom('WMIYearValidChars')
			.select('Year')
			.distinct()
			.orderBy('Year', 'asc')
			.execute();

		return data.map((d) => d.Year);
	}
}
