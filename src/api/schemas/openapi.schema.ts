import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { ProblemSchema, ValidationErrorSchema, ValidationProblemSchema } from 'src/api/schemas/problem.schema';
import {
	BadRequestResponse,
	ForbiddenResponse,
	InternalServerErrorResponse,
	NotFoundResponse,
	UnauthorizedResponse,
	UnprocessableEntityResponse,
	createSuccessJsonResponse,
} from 'src/api/schemas/response.schema';
import { CONFIG } from 'src/common/config/env';

const defaultResponses: OpenAPIV3.ResponsesObject = {
	400: BadRequestResponse,
	401: UnauthorizedResponse,
	403: ForbiddenResponse,
	404: NotFoundResponse,
	422: UnprocessableEntityResponse,
	500: InternalServerErrorResponse,
};

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
					200: createSuccessJsonResponse('Health check successful'),
					...defaultResponses,
				},
			},
		},
	},
	components: {
		schemas: {
			Problem: ProblemSchema,
			ValidationError: ValidationErrorSchema,
			ValidationProblem: ValidationProblemSchema,
		},
		responses: {
			400: BadRequestResponse,
			401: UnauthorizedResponse,
			403: ForbiddenResponse,
			404: NotFoundResponse,
			422: UnprocessableEntityResponse,
			500: InternalServerErrorResponse,
		},
	},
};
