import { Selectable, sql } from 'kysely';
import { VPICDatabase } from 'src/data/vpic/database';
import { SelectableLookup } from 'src/data/vpic/types/common';
import { Model } from 'src/data/vpic/vpic-db';

interface AttributeQueryResult {
	AttributeId: string;
	VinSchemaId: number;
	Name: string;
	Code: string;
	DataType: string;
	Description: string;
	LookupTable: string | null;
}

export interface IModelRepository {
	getModel(id: number): Promise<Selectable<Model> | undefined>;
	getModelAttributesByModelIdYear(id: number, year: number): Promise<AttributeQueryResult[]>;
	getModelsByMakeYear(makeId: number, year: number): Promise<SelectableLookup[]>;
}

const ModelElementId = 28;

export class ModelRepository implements IModelRepository {
	constructor(readonly db: VPICDatabase) {}

	async getModel(id: number): Promise<Selectable<Model> | undefined> {
		return await this.db.selectFrom('Model').selectAll().where('Id', '=', id).executeTakeFirst();
	}

	async getModelAttributesByModelIdYear(id: number, year: number): Promise<AttributeQueryResult[]> {
		const query = await this.db
			.selectFrom('Pattern as p')
			.innerJoin(
				(eb) =>
					eb
						.selectFrom('Pattern as p')
						.innerJoin('Element as e', 'e.Id', 'p.ElementId')
						.innerJoin('Wmi_VinSchema as wvs', 'wvs.VinSchemaId', 'p.VinSchemaId')
						.where('p.AttributeId', '=', id.toString())
						.where('e.Id', '=', ModelElementId)
						.where('wvs.YearFrom', '<=', year)
						.where(sql`ISNULL(wvs.YearTo, 2999)`, '>=', year)
						.select(['p.Id', 'p.AttributeId as ModelId', 'p.VinSchemaId'])
						.distinct()
						.as('distinctModels'),
				(join) => join.onRef('distinctModels.VinSchemaId', '=', 'p.VinSchemaId')
			)
			.innerJoin('Element as e', 'e.Id', 'p.ElementId')

			.select([
				sql<string>`ISNULL(e.Code, '')`.as('Code'),
				'e.Name',
				sql<string>`ISNULL(e.Description, '')`.as('Description'),
				'p.AttributeId',
				'e.LookupTable',
				sql<string>`ISNULL(e.DataType, '')`.as('DataType'),
				'p.VinSchemaId',
			])
			.orderBy('e.Code asc')
			.orderBy('p.VinSchemaId asc')
			.execute();

		return query;
	}

	async getModelsByMakeYear(makeId: number, year: number): Promise<SelectableLookup[]> {
		return await this.db
			.selectFrom('Pattern as p')
			.innerJoin('Element as e', 'e.Id', 'p.ElementId')
			.innerJoin('Wmi_VinSchema as wvs', 'wvs.VinSchemaId', 'p.VinSchemaId')
			.innerJoin('Wmi_Make as wm', 'wm.WmiId', 'wvs.WmiId')
			.innerJoin('Model as m', 'm.Id', 'p.AttributeId')
			.where('wm.MakeId', '=', makeId)
			.where('wvs.YearFrom', '<=', year)
			.where(sql`ISNULL(wvs.YearTo, 2999)`, '>=', year)
			.where('e.Id', '=', ModelElementId)
			.select(['m.Id', 'm.Name'])
			.orderBy('m.Name')
			.distinct()
			.execute();
	}
}
