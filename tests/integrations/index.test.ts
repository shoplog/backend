import supertest from 'supertest';
import { setupApp } from '~/routes';

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
