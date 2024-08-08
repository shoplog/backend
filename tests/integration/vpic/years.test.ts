import { Express } from 'express';
import { createApp } from 'src/api/setup';
import supertest from 'supertest';

describe('/vpic/years', () => {
	let app: Express;
	const resourceUrl = '/api/v1/vpic/years';

	beforeAll(async () => {
		app = await createApp();
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
				.expect(400)
				.then((res) => res.body);

			// Assert
			expect(body).toMatchObject({
				status: 400,
			});
		});
	});
});
