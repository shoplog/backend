import { Express } from 'express';
import supertest from 'supertest';
import { createTestApp } from 'tests/utils/app';

describe('GET /docs', () => {
	let app: Express;

	beforeAll(async () => {
		app = await createTestApp();
	});

	it('should return 200 OK', async () => {
		await supertest(app).get('/docs').expect(200);
	});
});
