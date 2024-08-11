import { Express } from 'express';
import supertest from 'supertest';
import { createTestApp } from 'tests/utils/app';
import { createJwt } from 'tests/utils/jwt';

describe('/vpic/years', () => {
	const resourceUrl = '/api/v1/vpic/years';
	let app: Express;
	let bearerToken: string;

	beforeAll(async () => {
		app = await createTestApp();
	});

	beforeEach(async () => {
		bearerToken = `Bearer ${await createJwt()}`;
	});

	describe('GET /', () => {
		it('should respond with 200 Ok - years found', async () => {
			// Arrange
			const minYear = 1980;
			const maxYear = new Date().getFullYear();
			const numYears = maxYear - minYear + 2;
			const expectedYears = [...Array(numYears).keys()].map((i) => i + minYear);

			// Act
			const body = await supertest(app)
				.get(resourceUrl)
				.set('Authorization', bearerToken)
				.expect(200)
				.then((res) => res.body);

			// Assert
			expect(body).toEqual(expectedYears);
		});
	});

	describe('GET /:year/makes', () => {
		it('should respond with 200 Ok - all makes for year', async () => {
			// Arrange
			const year = 2002;

			// Act
			const body = await supertest(app)
				.get(`${resourceUrl}/${year}/makes`)
				.set('Authorization', bearerToken)
				.expect(200)
				.then((res) => res.body);

			// Assert
			expect(body).toMatchSnapshot();
		});

		it('should respond with 400 - year parameter invalid', async () => {
			// Arrange
			// Act
			const body = await supertest(app)
				.get(`${resourceUrl}/abc/makes`)
				.set('Authorization', bearerToken)
				.expect(400)
				.then((res) => res.body);

			// Assert
			expect(body).toMatchObject({
				status: 400,
			});
		});

		it('should respond with 401 - invalid token', async () => {
			// Arrange
			// Act
			const body = await supertest(app)
				.get(`${resourceUrl}/abc/makes`)
				.set('Authorization', 'blah')
				.expect(401)
				.then((res) => res.body);

			// Assert
			expect(body).toMatchObject({
				status: 401,
			});
		});
	});
});
