import { VehicleAttribute } from '@prisma/client';
import { MainDatabase } from 'src/data/main/database';

export interface IVehicleAttributeRepository {
	getVehicleAttributesByVehicleId(vehicleId: string): Promise<VehicleAttribute[]>;
	createVehicleAttribute(vehicleAttribute: VehicleAttribute): Promise<VehicleAttribute>;
}

export class VehicleAttributeRepository implements IVehicleAttributeRepository {
	constructor(readonly db: MainDatabase) {}

	getVehicleAttributesByVehicleId(vehicleId: string): Promise<VehicleAttribute[]> {
		return this.db.vehicleAttribute.findMany({ where: { vehicleId } });
	}

	createVehicleAttribute(vehicleAttribute: VehicleAttribute): Promise<VehicleAttribute> {
		return this.db.vehicleAttribute.create({ data: vehicleAttribute });
	}
}
