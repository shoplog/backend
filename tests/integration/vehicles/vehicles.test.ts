import { Express } from 'express';
import { Vehicle } from 'src/api/controllers/vehicles.controller';
import { MainDatabase } from 'src/data/main/database';
import { Transaction, beginTransaction } from 'src/data/main/transaction';
import supertest from 'supertest';
import { createTestApp } from 'tests/utils/app';
import { createJwt } from 'tests/utils/jwt';

describe('/vehicles', () => {
	describe('GET /', () => {
		const resourceUrl = '/api/v1/vehicles';
		let app: Express;
		let bearerToken: string;
		let tx: Transaction;
		let userId: string;

		beforeEach(async () => {
			tx = await beginTransaction(MainDatabase);
			app = await createTestApp({ mainDatabase: tx.transaction });
			userId = crypto.randomUUID();
			bearerToken = `Bearer ${await createJwt({ subject: userId })}`;
		});

		afterEach(async () => {
			tx?.rollback();
		});

		it('should respond with 200 Ok - vehicles found', async () => {
			// arrange
			await tx.transaction
				.insertInto('vehicles')
				.values({
					user_id: userId,
					make: 'Toyota',
					model: 'Camry',
					year: 2002,
					mileage: 100000,
					mileage_distance_unit: 'MI',
					color: 'Red',
					plate: 'ABC123',
					vin: '12345678901234567',
				})
				.execute();

			// act
			const body = await supertest(app)
				.get(resourceUrl)
				.set('Authorization', bearerToken)
				.expect(200)
				.then((res) => res.body as Vehicle[]);

			// assert
			expect(body).toHaveLength(1);
			expect(body).toIncludeSameMembers([
				{
					id: expect.any(Number),
					userId,
					make: 'Toyota',
					model: 'Camry',
					year: 2002,
					mileage: 100000,
					mileageDistanceUnit: 'MI',
					color: 'Red',
					plate: 'ABC123',
					vin: '12345678901234567',
					createdAt: expect.toBeDateString(),
					updatedAt: expect.toBeDateString(),
				},
			]);
		});
	});
});
