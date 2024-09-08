import { PrismaClient } from '@prisma/client';
import { logger } from 'src/common/initializers/logger';

const prisma = new PrismaClient();

const main = async () => {
	logger.info('Seeding started');

	const userId = 'auth0|6670f1c394d1babea1593c36';
	const vehicleId = '940e5585-3fd0-4f22-9157-828e7482ea70';

	await prisma.vehicle.upsert({
		where: {
			id: vehicleId,
		},
		update: {},
		create: {
			id: vehicleId,
			userId,
			make: 'Toyota',
			model: 'Tacoma',
			year: 2002,
			vin: '5TEWN72N82Z891171',
			odometer: 312997,
			odometerUnit: 'KM',
			plate: 'MA TACO',
			color: 'Red',
			createdAt: new Date(),
			updatedAt: new Date(),
			vehicleAttributes: {
				createMany: {
					data: [
						{ code: 'VehicleDescriptor', name: 'Vehicle Descriptor', value: '5TEWN72N*2Z' },
						{ code: 'Make', name: 'Make', value: 'TOYOTA' },
						{ code: 'Manufacturer', name: 'Manufacturer Name', value: 'TOYOTA MOTOR MANUFACTURING, CALIFORNIA, INC.' },
						{ code: 'Model', name: 'Model', value: 'Tacoma' },
						{ code: 'ModelYear', name: 'Model Year', value: '2002' },
						{ code: 'PlantCity', name: 'Plant City', value: 'FREMONT' },
						{ code: 'Series', name: 'Series', value: 'RZN171L/VZN170L' },
						{ code: 'Trim', name: 'Trim', value: 'DELUXE' },
						{ code: 'VehicleType', name: 'Vehicle Type', value: 'TRUCK' },
						{ code: 'PlantCountry', name: 'Plant Country', value: 'UNITED STATES (USA)' },
						{ code: 'PlantCompanyName', name: 'Plant Company Name', value: 'New United Motor Manufacturing (NUMMI)' },
						{ code: 'PlantState', name: 'Plant State', value: 'CALIFORNIA' },
						{ code: 'Note', name: 'Note', value: 'Chassis: With 1/2 ton Independent Front Suspension' },
						{ code: 'Note', name: 'Note', value: 'Extra Cab' },
						{ code: 'BodyClass', name: 'Body Class', value: 'Pickup' },
						{ code: 'WheelBaseType', name: 'Wheel Base Type', value: 'Extra Long' },
						{
							code: 'GVWR',
							name: 'Gross Vehicle Weight Rating From',
							value: 'Class 1D: 5,001 - 6,000 lb (2,268 - 2,722 kg)',
						},
						{ code: 'BodyCabType', name: 'Cab Type', value: 'Extra/Super/Quad/Double/King/Extended' },
						{ code: 'TrailerType', name: 'Trailer Type Connection', value: 'Not Applicable' },
						{ code: 'TrailerBodyType', name: 'Trailer Body Type', value: 'Not Applicable' },
						{ code: 'DriveType', name: 'Drive Type', value: '4WD/4-Wheel Drive/4x4' },
						{ code: 'BrakeSystemType', name: 'Brake System Type', value: 'Hydraulic' },
						{ code: 'EngineCylinders', name: 'Engine Number of Cylinders', value: '6' },
						{ code: 'DisplacementCC', name: 'Displacement (CC)', value: '3378' },
						{ code: 'DisplacementCI', name: 'Displacement (CI)', value: '207.4807299' },
						{ code: 'DisplacementL', name: 'Displacement (L)', value: '3.4' },
						{ code: 'EngineModel', name: 'Engine Model', value: '5VZ-FE' },
						{ code: 'FuelTypePrimary', name: 'Fuel Type - Primary', value: 'Gasoline' },
						{ code: 'EngineConfiguration', name: 'Engine Configuration', value: 'V-Shaped' },
						{ code: 'EngineHP', name: 'Engine Brake (hp) From', value: '190' },
						{ code: 'CoolingType', name: 'Cooling Type', value: 'Water' },
						{ code: 'EngineHP_to', name: 'Engine Brake (hp) To', value: '190' },
						{ code: 'EngineManufacturer', name: 'Engine Manufacturer', value: 'Toyota' },
					],
				},
			},
		},
	});
};

main()
	.then(async () => {
		await prisma.$disconnect();
		logger.info('Seeding completed');
	})
	.catch(async (e) => {
		logger.error(e, 'Seeding failed');
		await prisma.$disconnect();
		process.exit(1);
	});
