import {
	IMaintenanceLogRepository,
	MaintenanceLogWithServices,
} from 'src/data/main/repositories/maintenance-log.repository';

export type CreateMaintenanceLogDto = {
	userId: string;
	vehicleId: string;
	serviceDate: Date;
	mileage: number;
	notes: string;
	serviceIds: string[];
};

export type MaintenanceLogWithServicesDto = {
	id: string;
	userId: string;
	vehicleId: string;
	serviceDate: Date;
	mileage: number;
	notes: string;
	createdAt: Date;
	updatedAt: Date;
	serviceIds: string[];
};

export interface IMaintenanceLogService {
	getMaintenanceLogsByUserIdAndVehicleId(userId: string, vehicleId: string): Promise<MaintenanceLogWithServicesDto[]>;
	createMaintenanceLog(maintenanceLog: CreateMaintenanceLogDto): Promise<MaintenanceLogWithServicesDto>;
}

export class MaintenanceLogService implements IMaintenanceLogService {
	constructor(readonly maintenanceLogRepository: IMaintenanceLogRepository) {}

	async getMaintenanceLogsByUserIdAndVehicleId(
		userId: string,
		vehicleId: string
	): Promise<MaintenanceLogWithServicesDto[]> {
		const maintenanceLogs = await this.maintenanceLogRepository.getMaintenanceLogsByUserIdAndVehicleId(
			userId,
			vehicleId
		);

		return maintenanceLogs.map(this.#toMaintenanceLogWithServicesDto);
	}

	async createMaintenanceLog(maintenanceLog: CreateMaintenanceLogDto): Promise<MaintenanceLogWithServicesDto> {
		const { serviceIds, ...data } = maintenanceLog;
		const newMaintenanceLog = await this.maintenanceLogRepository.createMaintenanceLog({
			...data,
			vehicle: {
				connect: { id: maintenanceLog.vehicleId },
			},
			maintenanceLogServices: {
				createMany: {
					data: serviceIds.map((serviceId) => ({ serviceId })),
				},
			},
		});

		return this.#toMaintenanceLogWithServicesDto(newMaintenanceLog);
	}

	#toMaintenanceLogWithServicesDto(maintenanceLog: MaintenanceLogWithServices): MaintenanceLogWithServicesDto {
		const { maintenanceLogServices, ...log } = maintenanceLog;
		return {
			...log,
			serviceIds: maintenanceLogServices.map((service) => service.serviceId),
		};
	}
}