import { Insertable, Selectable } from 'kysely';
import { MainDatabase } from 'src/data/main/database';
import { jsonArrayFrom } from 'src/data/main/helpers';
import { MaintenanceLog, Service } from 'src/data/main/main-db';

export type SelectableMaintenanceLogWithServices = Selectable<MaintenanceLog> & {
	services: Selectable<Service>[];
};

export type InsertableMaintenanceLogWithServices = Insertable<MaintenanceLog> & {
	serviceIds?: number[];
};

export interface IMaintenanceLogRepository {
	getMaintenanceLogsByUserIdAndVehicleId(
		userId: string,
		vehicleId: number
	): Promise<SelectableMaintenanceLogWithServices[]>;
	createMaintenanceLog(
		maintenanceLogData: InsertableMaintenanceLogWithServices
	): Promise<SelectableMaintenanceLogWithServices>;
}

export class MaintenanceLogRepository implements IMaintenanceLogRepository {
	constructor(readonly db: MainDatabase) {}

	getMaintenanceLogsByUserIdAndVehicleId(
		userId: string,
		vehicleId: number
	): Promise<SelectableMaintenanceLogWithServices[]> {
		return this.db
			.selectFrom('maintenance_logs')
			.selectAll('maintenance_logs')
			.select((eb) =>
				jsonArrayFrom(
					eb
						.selectFrom('maintenance_logs_services as mls')
						.innerJoin('services as s', 's.id', 'mls.service_id')
						.whereRef('mls.maintenance_log_id', '=', 'maintenance_logs.id')
						.selectAll('s')
				).as('services')
			)
			.where('maintenance_logs.user_id', '=', userId)
			.where('maintenance_logs.vehicle_id', '=', vehicleId)
			.execute();
	}

	async createMaintenanceLog(
		maintenanceLogData: InsertableMaintenanceLogWithServices
	): Promise<SelectableMaintenanceLogWithServices> {
		const { serviceIds, ...data } = maintenanceLogData;

		const maintenanceLog = await this.db
			.insertInto('maintenance_logs')
			.values(data)
			.returningAll()
			.executeTakeFirstOrThrow();

		const services: Selectable<Service>[] = [];

		if (serviceIds) {
			for (const serviceId of serviceIds) {
				await this.db
					.insertInto('maintenance_logs_services')
					.values({
						maintenance_log_id: maintenanceLog.id,
						service_id: serviceId,
					})
					.execute();
			}

			services.push(...(await this.db.selectFrom('services').selectAll().where('id', 'in', serviceIds).execute()));
		}

		return {
			...maintenanceLog,
			services,
		};
	}
}
