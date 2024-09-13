import { Insertable, Selectable } from 'kysely';
import { MainDatabase } from 'src/data/main/database';
import { VehicleAttribute } from 'src/data/main/main-db';

export interface IVehicleAttributeRepository {
	getVehicleAttributesByVehicleId(vehicleId: number): Promise<Selectable<VehicleAttribute>[]>;
	createVehicleAttribute(vehicleAttributeData: Insertable<VehicleAttribute>[]): Promise<Selectable<VehicleAttribute>[]>;
}

export class VehicleAttributeRepository implements IVehicleAttributeRepository {
	constructor(readonly db: MainDatabase) {}

	getVehicleAttributesByVehicleId(vehicleId: number): Promise<Selectable<VehicleAttribute>[]> {
		return this.db.selectFrom('vehicle_attributes').where('vehicle_id', '=', vehicleId).selectAll().execute();
	}

	createVehicleAttribute(
		vehicleAttributeData: Insertable<VehicleAttribute>[]
	): Promise<Selectable<VehicleAttribute>[]> {
		return this.db.insertInto('vehicle_attributes').values(vehicleAttributeData).returningAll().execute();
	}
}
