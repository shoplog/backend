import { Express } from 'express';
import { loadOpenApiSpec } from 'src/api/setup';
import supertest from 'supertest';
import { createTestFixture } from 'tests/utils/app';

describe('/docs', () => {
	let app: Express;

	beforeAll(async () => {
		app = await createTestFixture();
	});

	it('GET /docs should return 200 OK', async () => {
		await supertest(app).get('/docs').expect(200);
	});

	it('GET /docs/openapi.json should return 200 OK', async () => {
		const spec = await supertest(app)
			.get('/docs/openapi.json')
			.expect(200)
			.then((res) => res.body);

		const expectedSpec = await loadOpenApiSpec();

		expect(spec).toEqual(expectedSpec);
	});
});
