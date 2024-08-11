import { Express } from 'express';
import { createApp } from 'src/api/setup';
import supertest from 'supertest';
import { createJwt } from 'tests/utils/jwt';

describe('/vpic/models', () => {
	const resourceUrl = '/api/v1/vpic/models';
	let app: Express;
	let bearerToken: string;

	beforeAll(async () => {
		app = await createApp();
	});

	beforeEach(async () => {
		bearerToken = `Bearer ${await createJwt()}`;
	});

	describe('GET /vpic/models/:modelId/year/:year/attributes', () => {
		it('should respond with 200 Ok - attributes for model and year', async () => {
			// Arrange
			const modelId = 2223; // Tacoma
			const year = 2002;

			// Act
			const body = await supertest(app)
				.get(`${resourceUrl}/${modelId}/year/${year}/attributes`)
				.set('Authorization', bearerToken)
				.expect(200)
				.then((res) => res.body);

			// Assert
			expect(body).toMatchSnapshot();
		});

		it('should respond with 404 Not found - model not found', async () => {
			// Arrange
			const modelId = 9999999; // unknown
			const year = 2002;

			// Act
			await supertest(app)
				.get(`${resourceUrl}/${modelId}/year/${year}/attributes`)
				.set('Authorization', bearerToken)
				.expect(404);
		});
	});
});
