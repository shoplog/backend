import { Prisma } from '@prisma/client';
import { MainDatabase } from 'src/data/main/database';

export type MaintenanceLogWithServices = Prisma.MaintenanceLogGetPayload<{
	include: { maintenanceLogServices: { include: { service: true } } };
}>;

export interface IMaintenanceLogRepository {
	getMaintenanceLogsByUserIdAndVehicleId(userId: string, vehicleId: string): Promise<MaintenanceLogWithServices[]>;
	createMaintenanceLog(maintenanceLog: Prisma.MaintenanceLogCreateInput): Promise<MaintenanceLogWithServices>;
}

export class MaintenanceLogRepository implements IMaintenanceLogRepository {
	constructor(readonly db: MainDatabase) {}

	getMaintenanceLogsByUserIdAndVehicleId(userId: string, vehicleId: string): Promise<MaintenanceLogWithServices[]> {
		return this.db.maintenanceLog.findMany({
			where: {
				userId,
				vehicleId,
			},
			include: {
				maintenanceLogServices: {
					include: {
						service: true,
					},
				},
			},
		});
	}

	createMaintenanceLog(maintenanceLog: Prisma.MaintenanceLogCreateInput): Promise<MaintenanceLogWithServices> {
		return this.db.maintenanceLog.create({
			data: maintenanceLog,
			include: {
				maintenanceLogServices: {
					include: {
						service: true,
					},
				},
			},
		});
	}
}
