import { Request, Response } from 'express';
import { components } from 'src/api/types/openapi';
import { getRequiredUserId } from 'src/api/util/helpers';
import { IVehicleService } from 'src/domains/main/services/vehicle.service';

export type Vehicle = components['schemas']['Vehicle'];
export type VehicleCreateRequestBody = Request<never, never, components['schemas']['VehicleCreateRequestBody']>;

export interface IVehiclesController {
	getVehicles(req: Request, res: Response<Vehicle[]>): Promise<void>;
	createVehicle(req: VehicleCreateRequestBody, res: Response<Vehicle>): Promise<void>;
}

export class VehiclesController implements IVehiclesController {
	constructor(readonly vehicleService: IVehicleService) {}

	async getVehicles(req: Request, res: Response<Vehicle[]>): Promise<void> {
		const userId = getRequiredUserId(req);
		const vehicles = await this.vehicleService.getVehiclesByUserId(userId);

		res.json(
			vehicles.map((vehicle) => ({
				...vehicle,
				createdAt: vehicle.createdAt.toISOString(),
				updatedAt: vehicle.updatedAt.toISOString(),
			}))
		);
	}

	async createVehicle(req: VehicleCreateRequestBody, res: Response<Vehicle>): Promise<void> {
		const userId = getRequiredUserId(req);
		const vehicle = await this.vehicleService.createVehicle({
			...req.body,
			userId,
		});

		res.json({
			...vehicle,
			createdAt: vehicle.createdAt.toISOString(),
			updatedAt: vehicle.updatedAt.toISOString(),
		});
	}
}
