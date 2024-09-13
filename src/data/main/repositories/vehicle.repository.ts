import { Insertable, Selectable } from 'kysely';
import { MainDatabase } from 'src/data/main/database';
import { Vehicle } from 'src/data/main/main-db';

export type SelectableVehicle = Selectable<Vehicle>;
export interface IVehicleRepository {
	getVehicleById(vehicleId: number): Promise<SelectableVehicle | undefined>;
	getVehiclesByUserId(userId: string): Promise<SelectableVehicle[]>;
	createVehicle(vehicle: Insertable<Vehicle>): Promise<SelectableVehicle>;
}

export class VehicleRepository implements IVehicleRepository {
	constructor(readonly db: MainDatabase) {}

	getVehicleById(vehicleId: number): Promise<SelectableVehicle | undefined> {
		return this.db.selectFrom('vehicles').where('id', '=', vehicleId).selectAll().executeTakeFirst();
	}

	getVehiclesByUserId(userId: string): Promise<SelectableVehicle[]> {
		return this.db.selectFrom('vehicles').where('user_id', '=', userId).selectAll().execute();
	}

	createVehicle(vehicleData: Insertable<Vehicle>): Promise<SelectableVehicle> {
		return this.db.insertInto('vehicles').values(vehicleData).returningAll().executeTakeFirstOrThrow();
	}
}
