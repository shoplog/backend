import { setupApp } from 'src/routes';
import supertest from 'supertest';

describe('Main app start', () => {
	it('should start the app', async () => {
		// Arrange
		const app = setupApp();
		const request = supertest(app);

		// Act
		const response = await request
			.get('/')
			.expect(200)
			.then((res) => res.text);

		// Assert
		expect(response).toEqual('Ok!');
	});
});
