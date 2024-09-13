import type { ColumnType } from 'kysely';

export type Generated<T> =
	T extends ColumnType<infer S, infer I, infer U> ? ColumnType<S, I | undefined, U> : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const DistanceUnit = {
	MI: 'MI',
	KM: 'KM',
} as const;
export type DistanceUnit = (typeof DistanceUnit)[keyof typeof DistanceUnit];
export const TimeUnit = {
	DAY: 'DAY',
	WEEK: 'WEEK',
	MONTH: 'MONTH',
	YEAR: 'YEAR',
} as const;
export type TimeUnit = (typeof TimeUnit)[keyof typeof TimeUnit];
export const VehicleServiceRepeatType = {
	MILEAGE: 'MILEAGE',
	TIME: 'TIME',
} as const;
export type VehicleServiceRepeatType = (typeof VehicleServiceRepeatType)[keyof typeof VehicleServiceRepeatType];
export type MaintenanceLog = {
	id: Generated<number>;
	user_id: string;
	vehicle_id: number;
	serviced_by_shop_id: number | null;
	service_date: Timestamp;
	mileage: number;
	notes: string | null;
	created_at: Generated<Timestamp>;
	updated_at: Generated<Timestamp>;
};
export type MaintenanceLogService = {
	maintenance_log_id: number;
	service_id: number;
};
export type MaintenanceLogServicePart = {
	maintenance_log_id: number;
	service_id: number;
	part_id: number;
	quantity: number;
};
export type Part = {
	id: Generated<number>;
	name: string;
	description: string | null;
	part_number: string | null;
	oem_part_number: string | null;
	lifespan_lower_bound: number | null;
	lifespan_upper_bound: number | null;
	lifespan_distance_unit: DistanceUnit | null;
	created_at: Generated<Timestamp>;
	updated_at: Generated<Timestamp>;
};
export type Service = {
	id: Generated<number>;
	user_id: string | null;
	name: string;
	description: string | null;
	created_at: Generated<Timestamp>;
	updated_at: Generated<Timestamp>;
};
export type ServiceShop = {
	id: Generated<number>;
	name: string;
	description: string | null;
	contact_name: string | null;
	address: string | null;
	city: string | null;
	state: string | null;
	postal_code: string | null;
	phone_number: string | null;
	email: string | null;
	created_at: Generated<Timestamp>;
	updated_at: Generated<Timestamp>;
};
export type Vehicle = {
	id: Generated<number>;
	user_id: string;
	make: string;
	model: string;
	year: number;
	vin: string | null;
	plate: string | null;
	color: string | null;
	mileage: number;
	mileage_distance_unit: DistanceUnit;
	created_at: Generated<Timestamp>;
	updated_at: Generated<Timestamp>;
};
export type VehicleAttribute = {
	id: Generated<number>;
	vehicle_id: number;
	code: string;
	name: string;
	value: string;
	created_at: Generated<Timestamp>;
	updated_at: Generated<Timestamp>;
};
export type VehiclePart = {
	vehicle_id: number;
	part_id: number;
};
export type VehicleService = {
	vehicle_id: number;
	service_id: number;
	repeat_type: VehicleServiceRepeatType | null;
	repeat_interval_lower_bound: number | null;
	repeat_interval_upper_bound: number | null;
	repeat_interval_distance_unit: DistanceUnit | null;
	repeat_interval_time_unit: TimeUnit | null;
};
export type DB = {
	maintenance_logs: MaintenanceLog;
	maintenance_logs_services: MaintenanceLogService;
	maintenance_logs_services_parts: MaintenanceLogServicePart;
	parts: Part;
	service_shops: ServiceShop;
	services: Service;
	vehicle_attributes: VehicleAttribute;
	vehicles: Vehicle;
	vehicles_parts: VehiclePart;
	vehicles_services: VehicleService;
};
