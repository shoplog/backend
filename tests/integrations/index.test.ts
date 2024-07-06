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
			.then((res) => res.headers[CUSTOM_HEADERS.RequestId.toLowerCase()]);

		// assert
		expect(response).not.toBeNil();
	});

	it('should have security headers', async () => {
		const headers = await supertest(app)
			.get('/')
			.expect(200)
			.then((res) => res.headers);

		expect(headers).not.toBeNil();
		expect(headers['cross-origin-opener-policy']).toBe('same-origin');
		expect(headers['cross-origin-resource-policy']).toBe('same-origin');
		expect(headers['referrer-policy']).toBe('no-referrer');
		expect(headers['x-content-type-options']).toBe('nosniff');
		expect(headers['x-dns-prefetch-control']).toBe('off');
		expect(headers['x-frame-options']).toBe('SAMEORIGIN');
		expect(headers['x-xss-protection']).toBe('0');
		expect(headers['x-download-options']).toBe('noopen');
		expect(headers['x-permitted-cross-domain-policies']).toBe('none');
		expect(headers['x-powered-by']).toBeUndefined();
	});
});
