import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { components, paths } from 'src/api/types/openapi';
import { getRequiredUserId } from 'src/api/util';
import { ResourceNotFoundError } from 'src/domains/common/errors/resource-not-found.error';
import {
	IMaintenanceLogService,
	MaintenanceLogWithServicesDto,
} from 'src/domains/main/services/maintenance-log.service';
import { IVehicleService } from 'src/domains/main/services/vehicle.service';

export type GetMaintenanceLogsRequest = Request<paths['/maintenance-logs/{vehicleId}']['get']['parameters']['path']>;
export type MaintenanceLogResponseBody = components['schemas']['MaintenanceLog'];
export type CreateMaintenanceLogRequestBody = Request<
	paths['/maintenance-logs/{vehicleId}']['post']['parameters']['path'],
	never,
	components['schemas']['CreateMaintenanceLog']
>;

export interface IMaintenanceLogsController {
	getMaintenanceLogsByVehicleId(
		req: GetMaintenanceLogsRequest,
		res: Response<MaintenanceLogResponseBody[]>
	): Promise<void>;
	createMaintenanceLog(req: CreateMaintenanceLogRequestBody, res: Response<MaintenanceLogResponseBody>): Promise<void>;
}

export class MaintenanceLogsController implements IMaintenanceLogsController {
	constructor(
		readonly maintenanceLogService: IMaintenanceLogService,
		readonly vehicleService: IVehicleService
	) {}

	async getMaintenanceLogsByVehicleId(
		req: GetMaintenanceLogsRequest,
		res: Response<MaintenanceLogResponseBody[]>
	): Promise<void> {
		const userId = getRequiredUserId(req);
		const { vehicleId } = req.params;

		const vehicle = await this.vehicleService.getVehicleById(vehicleId);

		if (!vehicle) {
			throw new ResourceNotFoundError('Vehicle', { vehicleId });
		}

		const maintenanceLogs = await this.maintenanceLogService.getMaintenanceLogsByUserIdAndVehicleId(userId, vehicleId);

		res.json(maintenanceLogs.map(this.#toMaintenanceLog));
	}

	async createMaintenanceLog(
		req: CreateMaintenanceLogRequestBody,
		res: Response<MaintenanceLogResponseBody>
	): Promise<void> {
		const userId = getRequiredUserId(req);
		const { vehicleId } = req.params;

		const vehicle = await this.vehicleService.getVehicleById(vehicleId);

		if (!vehicle) {
			throw new ResourceNotFoundError('Vehicle', { vehicleId });
		}

		const maintenanceLog = await this.maintenanceLogService.createMaintenanceLog({
			...req.body,
			notes: req.body.notes || null,
			userId,
			vehicleId,
			serviceDate: DateTime.fromISO(req.body.serviceDate).toJSDate(),
		});

		res.json(this.#toMaintenanceLog(maintenanceLog));
	}

	#toMaintenanceLog(maintenanceLog: MaintenanceLogWithServicesDto): MaintenanceLogResponseBody {
		return {
			...maintenanceLog,
			createdAt: maintenanceLog.createdAt.toISOString(),
			updatedAt: maintenanceLog.updatedAt.toISOString(),
			serviceDate: maintenanceLog.serviceDate.toISOString(),
		};
	}
}
