import { Express } from 'express';
import { createApp } from 'src/api/setup';
import supertest from 'supertest';

describe('/vpic/makes', () => {
	const resourceUrl = '/api/v1/vpic/makes';
	let app: Express;

	beforeAll(async () => {
		app = await createApp();
	});

	describe('GET /:makeId/year/:year/models', () => {
		it('should respond with 200 Ok - all models for make and year', async () => {
			// Arrange
			const makeId = 448; // Toyota
			const year = 2002;

			// Act
			const body = await supertest(app)
				.get(`${resourceUrl}/${makeId}/year/${year}/models`)
				.expect(200)
				.then((res) => res.body);

			// Assert
			expect(body).toMatchSnapshot();
		});
	});
});
