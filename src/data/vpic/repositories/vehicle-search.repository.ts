import { sql } from 'kysely';
import { VehicleDb } from 'src/common/initializers/db';
import { DecodingOutput } from 'src/data/vpic/db';

type VehicleSearchResult = {
	[key: string]: string | null;
};

export class VehicleSearchRepository {
	constructor(readonly db: VehicleDb) {}

	/**
	 * Return vehicles information by VIN number
	 * @param vin VIN (vehicle identification number)
	 * @returnsAll Attributes of the vehicle if found
	 */
	async searchByVin(vin: string): Promise<VehicleSearchResult> {
		const { rows } = await sql`EXEC spVinDecode ${vin}`.execute(this.db);
		const data = rows as DecodingOutput[];
		const result: VehicleSearchResult = data.reduce(
			function (acc: VehicleSearchResult, cur: DecodingOutput) {
				if (cur.Code) {
					acc[cur.Code] = cur.Value;
				}

				return acc;
			},
			{ SuggestedVIN: '', ErrorCode: '', ErrorText: '' }
		);

		return result;
	}
}
