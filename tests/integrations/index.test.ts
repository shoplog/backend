import { setupApp } from 'src/routes';
import { Express } from 'express';
import supertest from 'supertest';
import { CUSTOM_HEADERS } from 'src/common/constants/headers';

describe('GET /', () => {
	let app: Express;

	beforeAll(() => {
		app = setupApp();
	});

	it('should return 200 OK', async () => {
		const response = await supertest(app).get('/');

		// Assert
		expect(response.status).toBe(200);
	});

	it('should have request id', async () => {
		// act
		const response = await supertest(app)
			.get('/')
			.expect(200)
			.then((res) => res.headers[CUSTOM_HEADERS.RequestId]);

		// assert
		expect(response).not.toBeNil();
	});
});
