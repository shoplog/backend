import { DistanceUnit } from '@prisma/client';
import { IVehicleRepository, VehicleWithAttributes } from 'src/data/main/repositories';

export type VehicleDto = {
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
	attributes?: VehicleAttributeDto[];
};

export type CreateVehicleDto = {
	userId: string;
	make: string;
	model: string;
	year: number;
	vin?: string | null;
	plate?: string | null;
	color?: string | null;
	mileage: number;
	mileageDistanceUnit: DistanceUnit;
	attributes?: VehicleAttributeDto[];
};

export type VehicleAttributeDto = {
	code: string;
	name: string;
	value: string;
};

export interface IVehicleService {
	getVehiclesByUserId(userId: string): Promise<VehicleDto[]>;
	createVehicle(vehicle: CreateVehicleDto): Promise<VehicleDto>;
}

export class VehicleService implements IVehicleService {
	constructor(readonly vehicleRepository: IVehicleRepository) {}

	async getVehiclesByUserId(userId: string): Promise<VehicleDto[]> {
		const vehicles = await this.vehicleRepository.getVehiclesByUserId(userId);

		return vehicles.map(this.#toVehicle);
	}

	async createVehicle(vehicle: CreateVehicleDto): Promise<VehicleDto> {
		const createdVehicle = await this.vehicleRepository.createVehicle({
			...vehicle,
			vehicleAttributes: {
				create: vehicle.attributes,
			},
		});

		return this.#toVehicle(createdVehicle);
	}

	#toVehicle(vehicleWithAttributes: VehicleWithAttributes): VehicleDto {
		const { vehicleAttributes: _, ...vehicle } = vehicleWithAttributes;

		return {
			...vehicle,
			mileageDistanceUnit: vehicleWithAttributes.mileageDistanceUnit as DistanceUnit,
			attributes: vehicleWithAttributes.vehicleAttributes.map((attribute) => ({
				code: attribute.code,
				name: attribute.name,
				value: attribute.value,
			})),
		};
	}
}
