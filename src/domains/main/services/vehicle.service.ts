import { Selectable } from 'kysely';
import { DistanceUnit, Vehicle, VehicleAttribute } from 'src/data/main/main-db';
import { IVehicleAttributeRepository, IVehicleRepository } from 'src/data/main/repositories';

export type VehicleDto = {
	id: number;
	userId: string;
	make: string;
	model: string;
	year: number;
	vin: string | null;
	plate: string | null;
	color: string | null;
	mileage: number;
	mileageDistanceUnit: DistanceUnit;
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
	getVehicleById(vehicleId: number): Promise<VehicleDto | undefined>;
	getVehiclesByUserId(userId: string): Promise<VehicleDto[]>;
	createVehicle(vehicle: CreateVehicleDto): Promise<VehicleWithAttributesDto>;
}

export class VehicleService implements IVehicleService {
	constructor(
		readonly vehicleRepository: IVehicleRepository,
		readonly vehicleAttributeRepository: IVehicleAttributeRepository
	) {}

	async getVehicleById(vehicleId: number): Promise<VehicleDto | undefined> {
		const vehicle = await this.vehicleRepository.getVehicleById(vehicleId);

		if (!vehicle) {
			return;
		}

		return VehicleService.toVehicleDto(vehicle);
	}

	async getVehiclesByUserId(userId: string): Promise<VehicleWithAttributesDto[]> {
		const vehicles = await this.vehicleRepository.getVehiclesByUserId(userId);

		return vehicles.map(VehicleService.toVehicleDto);
	}

	async createVehicle(vehicle: CreateVehicleDto): Promise<VehicleWithAttributesDto> {
		const { attributes, ...vehicleData } = vehicle;
		const createdVehicle = await this.vehicleRepository.createVehicle({
			...vehicleData,
			mileage_distance_unit: vehicleData.mileageDistanceUnit,
			user_id: vehicleData.userId,
		});

		const createdAttributes: Selectable<VehicleAttribute>[] = [];

		if (attributes) {
			createdAttributes.push(
				...(await this.vehicleAttributeRepository.createVehicleAttribute(
					attributes.map((attribute) => ({ vehicle_id: createdVehicle.id, ...attribute }))
				))
			);
		}

		return VehicleService.toVehicleWithAttributesDto(createdVehicle, createdAttributes);
	}

	static toVehicleDto(vehicle: Selectable<Vehicle>): VehicleDto {
		return {
			id: vehicle.id,
			userId: vehicle.user_id,
			color: vehicle.color,
			make: vehicle.make,
			mileage: vehicle.mileage,
			mileageDistanceUnit: vehicle.mileage_distance_unit,
			model: vehicle.model,
			plate: vehicle.plate,
			vin: vehicle.vin,
			year: vehicle.year,
			createdAt: vehicle.created_at,
			updatedAt: vehicle.updated_at,
		};
	}

	static toVehicleWithAttributesDto(
		vehicle: Selectable<Vehicle>,
		vehicleAttributes: Selectable<VehicleAttribute>[]
	): VehicleWithAttributesDto {
		return {
			...VehicleService.toVehicleDto(vehicle),
			attributes: vehicleAttributes.map((attribute) => ({
				code: attribute.code,
				name: attribute.name,
				value: attribute.value,
			})),
		};
	}
}
