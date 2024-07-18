import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { ProblemSchema, ValidationProblemSchema } from 'src/api/schemas/problem.schema';
import { CONFIG } from 'src/common/config/env';

export const apiSpec: OpenAPIV3.Document = {
	openapi: '3.0.3',
	info: {
		title: 'Shoplog Backend API',
		description: 'API for the Shoplog Backend',
		version: '1.0.0',
	},
	servers: [
		{
			url: `http://localhost:${CONFIG.server.port}`,
			description: 'Development',
		},
		{
			url: 'https://api.shoplog.com',
			description: 'Production',
		},
	],
	paths: {
		'/': {
			get: {
				summary: 'Health Check',
				description: 'Health check endpoint',
				responses: {
					200: {
						description: 'Health check succeeded',
					},
					400: {
						$ref: '#/components/responses/400',
					},
				},
			},
		},
	},
	components: {
		responses: {
			400: {
				description: 'Request cannot be processed due to malformed request syntax',
				content: {
					'application/problem+json': {
						schema: ValidationProblemSchema,
					},
				},
			},
			401: {
				description: 'Request was not processed due to authentication failure',
				content: {
					'application/problem+json': {
						schema: ProblemSchema,
					},
				},
			},
			403: {
				description: 'Request was not processed due to insufficient permissions',
				content: {
					'application/problem+json': {
						schema: ProblemSchema,
					},
				},
			},
			404: {
				description: 'Request was not processed due to resource not found',
				content: {
					'application/problem+json': {
						schema: ProblemSchema,
					},
				},
			},
			422: {
				description: 'Request was formed correctly but errors ocurred during processing',
				content: {
					'application/problem+json': {
						schema: ProblemSchema,
					},
				},
			},
			500: {
				description: 'Request was not processed due to an internal server error',
				content: {
					'application/problem+json': {
						schema: ProblemSchema,
					},
				},
			},
		},
	},
};
