import {
	IMaintenanceLogRepository,
	SelectableMaintenanceLogWithServices,
} from 'src/data/main/repositories/maintenance-log.repository';

export type CreateMaintenanceLogDto = {
	userId: string;
	vehicleId: number;
	serviceDate: Date;
	mileage: number;
	notes: string | null;
	serviceIds?: number[];
};

export type MaintenanceLogWithServicesDto = {
	id: number;
	userId: string;
	vehicleId: number;
	serviceDate: Date;
	mileage: number;
	notes: string | null;
	createdAt: Date;
	updatedAt: Date;
	serviceIds: number[];
};

export interface IMaintenanceLogService {
	getMaintenanceLogsByUserIdAndVehicleId(userId: string, vehicleId: number): Promise<MaintenanceLogWithServicesDto[]>;
	createMaintenanceLog(maintenanceLog: CreateMaintenanceLogDto): Promise<MaintenanceLogWithServicesDto>;
}

export class MaintenanceLogService implements IMaintenanceLogService {
	constructor(readonly maintenanceLogRepository: IMaintenanceLogRepository) {}

	async getMaintenanceLogsByUserIdAndVehicleId(
		userId: string,
		vehicleId: number
	): Promise<MaintenanceLogWithServicesDto[]> {
		const maintenanceLogs = await this.maintenanceLogRepository.getMaintenanceLogsByUserIdAndVehicleId(
			userId,
			vehicleId
		);

		return maintenanceLogs.map(MaintenanceLogService.toMaintenanceLogWithServicesDto);
	}

	async createMaintenanceLog(maintenanceLog: CreateMaintenanceLogDto): Promise<MaintenanceLogWithServicesDto> {
		const { serviceIds, userId, mileage, serviceDate, notes, vehicleId } = maintenanceLog;
		const newMaintenanceLog = await this.maintenanceLogRepository.createMaintenanceLog({
			vehicle_id: vehicleId,
			user_id: userId,
			mileage,
			service_date: serviceDate,
			notes,
			serviceIds,
		});

		return MaintenanceLogService.toMaintenanceLogWithServicesDto(newMaintenanceLog);
	}

	static toMaintenanceLogWithServicesDto(
		maintenanceLog: SelectableMaintenanceLogWithServices
	): MaintenanceLogWithServicesDto {
		const { services, ...log } = maintenanceLog;

		return {
			id: log.id,
			mileage: log.mileage,
			notes: log.notes,
			vehicleId: log.vehicle_id,
			userId: log.user_id,
			serviceDate: log.service_date,
			serviceIds: services.map((service) => service.id),
			createdAt: log.created_at,
			updatedAt: log.updated_at,
		};
	}
}
