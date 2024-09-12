import { Prisma, Vehicle } from '@prisma/client';
import { MainDatabase } from 'src/data/main/database';

export type VehicleWithAttributes = Prisma.VehicleGetPayload<{ include: { vehicleAttributes: true } }>;

export interface IVehicleRepository {
	getVehicleById(vehicleId: string): Promise<Vehicle | null>;
	getVehiclesByUserId(userId: string): Promise<VehicleWithAttributes[]>;
	createVehicle(vehicle: Prisma.VehicleCreateInput): Promise<VehicleWithAttributes>;
}

export class VehicleRepository implements IVehicleRepository {
	constructor(readonly db: MainDatabase) {}

	getVehicleById(vehicleId: string): Promise<Vehicle | null> {
		return this.db.vehicle.findUnique({ where: { id: vehicleId } });
	}

	getVehiclesByUserId(userId: string): Promise<VehicleWithAttributes[]> {
		return this.db.vehicle.findMany({ where: { userId }, include: { vehicleAttributes: true } });
	}

	createVehicle(vehicle: Prisma.VehicleCreateInput): Promise<VehicleWithAttributes> {
		return this.db.vehicle.create({
			data: vehicle,
			include: { vehicleAttributes: true },
		});
	}
}
