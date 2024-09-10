import { DistanceUnit } from '@prisma/client';
import { IVehicleRepository, VehicleWithAttributes } from 'src/data/main/repositories';

export type Vehicle = {
	id: string;
	userId: string;
	make: string;
	model: string;
	year: number;
	vin?: string | null;
	plate?: string | null;
	color?: string | null;
	mileage: number;
	mileageDistanceUnit: 'KM' | 'MI';
	createdAt: Date;
	updatedAt: Date;
	attributes?: VehicleAttribute[];
};

export type CreateVehicle = {
	userId: string;
	make: string;
	model: string;
	year: number;
	vin?: string | null;
	plate?: string | null;
	color?: string | null;
	mileage: number;
	mileageDistanceUnit: DistanceUnit;
	attributes?: VehicleAttribute[];
};

export type VehicleAttribute = {
	code: string;
	name: string;
	value: string;
};

export interface IVehicleService {
	getVehiclesByUserId(userId: string): Promise<Vehicle[]>;
	createVehicle(vehicle: CreateVehicle): Promise<Vehicle>;
}

export class VehicleService implements IVehicleService {
	constructor(readonly vehicleRepository: IVehicleRepository) {}

	async getVehiclesByUserId(userId: string): Promise<Vehicle[]> {
		const vehicles = await this.vehicleRepository.getVehiclesByUserId(userId);

		return vehicles.map(this.#toVehicle);
	}

	async createVehicle(vehicle: CreateVehicle): Promise<Vehicle> {
		const createdVehicle = await this.vehicleRepository.createVehicle({
			...vehicle,
			vehicleAttributes: {
				create: vehicle.attributes,
			},
		});

		return this.#toVehicle(createdVehicle);
	}

	#toVehicle(vehicleWithAttributes: VehicleWithAttributes): Vehicle {
		return {
			id: vehicleWithAttributes.id,
			make: vehicleWithAttributes.make,
			model: vehicleWithAttributes.model,
			year: vehicleWithAttributes.year,
			vin: vehicleWithAttributes.vin,
			plate: vehicleWithAttributes.plate,
			color: vehicleWithAttributes.color,
			createdAt: vehicleWithAttributes.createdAt,
			updatedAt: vehicleWithAttributes.updatedAt,
			userId: vehicleWithAttributes.userId,
			mileage: vehicleWithAttributes.mileage,
			mileageDistanceUnit: vehicleWithAttributes.mileageDistanceUnit as DistanceUnit,
			attributes: vehicleWithAttributes.vehicleAttributes.map((attribute) => ({
				code: attribute.code,
				name: attribute.name,
				value: attribute.value,
			})),
		};
	}
}
