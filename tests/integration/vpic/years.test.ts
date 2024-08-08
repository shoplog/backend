import { Express } from 'express';
import { createApp } from 'src/api/setup';
import supertest from 'supertest';

const baseUrl = '/api/v1/vpic';

describe('GET /vpic/years', () => {
	let app: Express;
	const resourceUrl = `${baseUrl}/years`;

	beforeAll(async () => {
		app = await createApp();
	});

	it('should respond with 200 Ok - years found', async () => {
		// Arrange
		const minYear = 1980;
		const maxYear = new Date().getFullYear();
		const numYears = maxYear - minYear + 2;
		const expectedYears = [...Array(numYears).keys()].map((i) => i + minYear);

		// Act
		const body = await supertest(app)
			.get(resourceUrl)
			.expect(200)
			.then((res) => res.body);

		// Assert
		expect(body).toEqual(expectedYears);
	});
});
