import { DistanceUnit, Vehicle } from '@prisma/client';
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
};

export type VehicleWithAttributesDto = {
	attributes?: VehicleAttributeDto[];
} & VehicleDto;

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
	getVehicleById(vehicleId: string): Promise<VehicleDto | null>;
	getVehiclesByUserId(userId: string): Promise<VehicleWithAttributesDto[]>;
	createVehicle(vehicle: CreateVehicleDto): Promise<VehicleWithAttributesDto>;
}

export class VehicleService implements IVehicleService {
	constructor(readonly vehicleRepository: IVehicleRepository) {}

	async getVehicleById(vehicleId: string): Promise<VehicleDto | null> {
		const vehicle = await this.vehicleRepository.getVehicleById(vehicleId);

		return vehicle ? this.#toVehicleDto(vehicle) : null;
	}

	async getVehiclesByUserId(userId: string): Promise<VehicleWithAttributesDto[]> {
		const vehicles = await this.vehicleRepository.getVehiclesByUserId(userId);

		return vehicles.map(this.#toVehicleWithAttributesDto);
	}

	async createVehicle(vehicle: CreateVehicleDto): Promise<VehicleWithAttributesDto> {
		const createdVehicle = await this.vehicleRepository.createVehicle({
			...vehicle,
			vehicleAttributes: {
				create: vehicle.attributes,
			},
		});

		return this.#toVehicleWithAttributesDto(createdVehicle);
	}

	#toVehicleDto(vehicle: Vehicle): VehicleWithAttributesDto {
		return {
			...vehicle,
			mileageDistanceUnit: vehicle.mileageDistanceUnit as DistanceUnit,
		};
	}

	#toVehicleWithAttributesDto(vehicleWithAttributes: VehicleWithAttributes): VehicleWithAttributesDto {
		const { vehicleAttributes, ...vehicle } = vehicleWithAttributes;

		return {
			...this.#toVehicleDto(vehicle),
			attributes: vehicleAttributes.map((attribute) => ({
				code: attribute.code,
				name: attribute.name,
				value: attribute.value,
			})),
		};
	}
}
