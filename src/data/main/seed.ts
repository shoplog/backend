import { logger } from 'src/common/initializers/logger';
import { MainDatabase } from 'src/data/main/database';

const main = async () => {
	logger.info('Seeding started');

	const userId = 'auth0|6670f1c394d1babea1593c36';
	const vehicleId = 1;

	await MainDatabase.insertInto('vehicles')
		.values({
			id: vehicleId,
			user_id: userId,
			make: 'Toyota',
			model: 'Tacoma',
			year: 2002,
			vin: '5TEWN72N82Z891171',
			mileage: 312997,
			mileage_distance_unit: 'KM',
			plate: 'MA TACO',
			color: 'Red',
		})
		.onConflict((oc) => oc.doNothing())
		.execute();

	await MainDatabase.insertInto('vehicle_attributes')
		.values([
			{ vehicle_id: vehicleId, code: 'VehicleDescriptor', name: 'Vehicle Descriptor', value: '5TEWN72N*2Z' },
			{ vehicle_id: vehicleId, code: 'Make', name: 'Make', value: 'TOYOTA' },
			{
				vehicle_id: vehicleId,
				code: 'Manufacturer',
				name: 'Manufacturer Name',
				value: 'TOYOTA MOTOR MANUFACTURING, CALIFORNIA, INC.',
			},
			{ vehicle_id: vehicleId, code: 'Model', name: 'Model', value: 'Tacoma' },
			{ vehicle_id: vehicleId, code: 'ModelYear', name: 'Model Year', value: '2002' },
			{ vehicle_id: vehicleId, code: 'PlantCity', name: 'Plant City', value: 'FREMONT' },
			{ vehicle_id: vehicleId, code: 'Series', name: 'Series', value: 'RZN171L/VZN170L' },
			{ vehicle_id: vehicleId, code: 'Trim', name: 'Trim', value: 'DELUXE' },
			{ vehicle_id: vehicleId, code: 'VehicleType', name: 'Vehicle Type', value: 'TRUCK' },
			{ vehicle_id: vehicleId, code: 'PlantCountry', name: 'Plant Country', value: 'UNITED STATES (USA)' },
			{
				vehicle_id: vehicleId,
				code: 'PlantCompanyName',
				name: 'Plant Company Name',
				value: 'New United Motor Manufacturing (NUMMI)',
			},
			{ vehicle_id: vehicleId, code: 'PlantState', name: 'Plant State', value: 'CALIFORNIA' },
			{
				vehicle_id: vehicleId,
				code: 'Note',
				name: 'Note',
				value: 'Chassis: With 1/2 ton Independent Front Suspension',
			},
			{ vehicle_id: vehicleId, code: 'Note', name: 'Note', value: 'Extra Cab' },
			{ vehicle_id: vehicleId, code: 'BodyClass', name: 'Body Class', value: 'Pickup' },
			{ vehicle_id: vehicleId, code: 'WheelBaseType', name: 'Wheel Base Type', value: 'Extra Long' },
			{
				vehicle_id: vehicleId,
				code: 'GVWR',
				name: 'Gross Vehicle Weight Rating From',
				value: 'Class 1D: 5,001 - 6,000 lb (2,268 - 2,722 kg)',
			},
			{ vehicle_id: vehicleId, code: 'BodyCabType', name: 'Cab Type', value: 'Extra/Super/Quad/Double/King/Extended' },
			{ vehicle_id: vehicleId, code: 'TrailerType', name: 'Trailer Type Connection', value: 'Not Applicable' },
			{ vehicle_id: vehicleId, code: 'TrailerBodyType', name: 'Trailer Body Type', value: 'Not Applicable' },
			{ vehicle_id: vehicleId, code: 'DriveType', name: 'Drive Type', value: '4WD/4-Wheel Drive/4x4' },
			{ vehicle_id: vehicleId, code: 'BrakeSystemType', name: 'Brake System Type', value: 'Hydraulic' },
			{ vehicle_id: vehicleId, code: 'EngineCylinders', name: 'Engine Number of Cylinders', value: '6' },
			{ vehicle_id: vehicleId, code: 'DisplacementCC', name: 'Displacement (CC)', value: '3378' },
			{ vehicle_id: vehicleId, code: 'DisplacementCI', name: 'Displacement (CI)', value: '207.4807299' },
			{ vehicle_id: vehicleId, code: 'DisplacementL', name: 'Displacement (L)', value: '3.4' },
			{ vehicle_id: vehicleId, code: 'EngineModel', name: 'Engine Model', value: '5VZ-FE' },
			{ vehicle_id: vehicleId, code: 'FuelTypePrimary', name: 'Fuel Type - Primary', value: 'Gasoline' },
			{ vehicle_id: vehicleId, code: 'EngineConfiguration', name: 'Engine Configuration', value: 'V-Shaped' },
			{ vehicle_id: vehicleId, code: 'EngineHP', name: 'Engine Brake (hp) From', value: '190' },
			{ vehicle_id: vehicleId, code: 'CoolingType', name: 'Cooling Type', value: 'Water' },
			{ vehicle_id: vehicleId, code: 'EngineHP_to', name: 'Engine Brake (hp) To', value: '190' },
			{ vehicle_id: vehicleId, code: 'EngineManufacturer', name: 'Engine Manufacturer', value: 'Toyota' },
		])
		.onConflict((oc) => oc.columns(['vehicle_id', 'code']).doNothing())
		.execute();

	const serviceId = 1;

	await MainDatabase.insertInto('services')
		.values({
			id: serviceId,
			name: 'Oil Change',
			description: 'Change engine oil and filter',
		})
		.onConflict((oc) => oc.doNothing())
		.execute();

	await MainDatabase.insertInto('vehicles_services')
		.values({
			vehicle_id: vehicleId,
			service_id: serviceId,
			repeat_interval_distance_unit: 'KM',
			repeat_interval_lower_bound: 5000,
			repeat_interval_upper_bound: 5000,
			repeat_type: 'MILEAGE',
		})
		.onConflict((oc) => oc.doNothing())
		.execute();
};

main()
	.then(async () => {
		await MainDatabase.destroy();
		logger.info('Seeding completed');
	})
	.catch(async (e) => {
		logger.error(e, 'Seeding failed');
		await MainDatabase.destroy();
		process.exit(1);
	});
