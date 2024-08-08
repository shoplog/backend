import { Express } from 'express';
import { createApp } from 'src/api/setup';
import supertest from 'supertest';

describe('GET /docs', () => {
	let app: Express;

	beforeAll(async () => {
		app = await createApp();
	});

	it('should return 200 OK', async () => {
		await supertest(app).get('/docs').expect(200);
	});
});
