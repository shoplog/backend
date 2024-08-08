import { Express } from 'express';
import { createApp } from 'src/api/setup';
import supertest from 'supertest';

const baseUrl = '/api/v1/vpic';

describe('GET /vpic/makes', () => {
	let app: Express;
	const resourceUrl = `${baseUrl}/makes`;

	beforeAll(async () => {
		app = await createApp();
	});

	it('should respond with 200 Ok - all makes for year', async () => {
		// Arrange
		const year = 2002;

		// Act
		const body = await supertest(app)
			.get(`${resourceUrl}?year=${year}`)
			.expect(200)
			.then((res) => res.body);

		// Assert
		expect(body).toMatchSnapshot();
	});

	it('should respond with 400 - year not in parameter', async () => {
		// Arrange
		// Act
		const body = await supertest(app)
			.get(`${resourceUrl}?year=`)
			.expect(400)
			.then((res) => res.body);

		// Assert
		expect(body).toMatchObject({
			status: 400,
		});
	});
});
