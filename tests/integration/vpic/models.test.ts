import { Express } from 'express';
import { createApp } from 'src/api/setup';
import supertest from 'supertest';

const baseUrl = '/api/v1/vpic';

describe('/vpic/models', () => {
	let app: Express;
	const resourceUrl = '/api/v1/vpic/models';

	beforeAll(async () => {
		app = await createApp();
	});

	describe('GET /vpic/models/:modelId/year/:year/attributes', () => {
		it('should respond with 200 Ok - attributes for model and year', async () => {
			// Arrange
			const modelId = 2223; // Tacoma
			const year = 2002;

			// Act
			const body = await supertest(app)
				.get(`${resourceUrl}/${modelId}/year/${year}/attributes`)
				.expect(200)
				.then((res) => res.body);

			// Assert
			expect(body).toMatchSnapshot();
		});
	});
});
