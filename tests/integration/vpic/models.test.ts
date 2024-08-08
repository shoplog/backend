import { Express } from 'express';
import { createApp } from 'src/api/setup';
import supertest from 'supertest';

const baseUrl = '/api/v1/vpic';

describe('GET /vpic/models', () => {
	let app: Express;
	const resourceUrl = `${baseUrl}/models`;

	beforeAll(async () => {
		app = await createApp();
	});

	it('should respond with 200 Ok - all models for make and year', async () => {
		// Arrange
		const makeId = 448; // Toyota
		const year = 2002;

		// Act
		const body = await supertest(app)
			.get(`${resourceUrl}?makeId=${makeId}&year=${year}`)
			.expect(200)
			.then((res) => res.body);

		// Assert
		expect(body).toMatchSnapshot();
	});

	it('should respond with 400 - year not in parameter', async () => {
		// Arrange
		const makeId = 448; // Toyota

		// Act
		const body = await supertest(app)
			.get(`${resourceUrl}?makeId=${makeId}&year=`)
			.expect(400)
			.then((res) => res.body);

		// Assert
		expect(body).toMatchObject({
			status: 400,
		});
	});

	it('should respond with 400 - makeId not in parameter', async () => {
		// Arrange
		const year = 2002; // Toyota

		// Act
		const body = await supertest(app)
			.get(`${resourceUrl}?makeId=&year=${year}`)
			.expect(400)
			.then((res) => res.body);

		// Assert
		expect(body).toMatchObject({
			status: 400,
		});
	});
});
