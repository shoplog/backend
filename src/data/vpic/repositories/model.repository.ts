import { Selectable, sql } from 'kysely';
import { VPICDatabase } from 'src/common/initializers/database';
import { SelectableLookup } from 'src/data/vpic/types/common';
import { Model } from 'src/data/vpic/vpic-db';

interface AttributeQueryResult {
	AttributeId: string;
	VinSchemaId: number;
	Name: string;
	Code: string;
	DataType: string | null;
	Description: string | null;
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
		const distinctModels = this.db
			.selectFrom('Pattern as p')
			.innerJoin('Element as e', 'e.Id', 'p.ElementId')
			.innerJoin('Wmi_VinSchema as wvs', 'wvs.VinSchemaId', 'p.VinSchemaId')
			.where('p.AttributeId', '=', id.toString())
			.where('e.Id', '=', ModelElementId)
			.where('wvs.YearFrom', '<=', year)
			.where(sql`ISNULL(wvs.YearTo, 2999)`, '>=', year)
			.select(['p.Id', 'p.AttributeId as ModelId', 'p.VinSchemaId'])
			.distinct();

		const query = await this.db
			.selectFrom(distinctModels.as('models'))
			.innerJoin('Pattern as p', 'p.VinSchemaId', 'models.VinSchemaId')
			.innerJoin('Element as e', 'e.Id', 'p.ElementId')
			.orderBy('e.Code asc')
			.orderBy('p.VinSchemaId asc')
			.select(({ fn }) => [
				fn.coalesce('e.Code').$notNull().as('Code'),
				'e.Name',
				'e.Description',
				'p.AttributeId',
				'e.LookupTable',
				'e.DataType',
				'p.VinSchemaId',
			])
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
