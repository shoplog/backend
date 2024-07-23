import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { ProblemSchema, ValidationProblemSchema } from 'src/api/openapi/schemas/problem.schema';
import { CONFIG } from 'src/common/config/env';

const createProblemResponse = (description: string, schema: OpenAPIV3.SchemaObject): OpenAPIV3.ResponseObject => ({
	description,
	content: {
		'application/problem+json': schema,
	},
});

const BadRequestResponse = createProblemResponse(
	'Request cannot be processed due to malformed request syntax',
	ValidationProblemSchema
);

const UnauthorizedResponse = createProblemResponse(
	'Request was not processed due to authentication failure',
	ProblemSchema
);

const ForbiddenResponse = createProblemResponse(
	'Request was not processed due to insufficient permissions',
	ProblemSchema
);

const NotFoundResponse = createProblemResponse('Request was not processed due to resource not found', ProblemSchema);

const UnprocessableEntityResponse = createProblemResponse(
	'Request was formed correctly but errors occurred during processing',
	ProblemSchema
);

const InternalServerErrorResponse = createProblemResponse(
	'Request was not processed due to an internal server error',
	ProblemSchema
);

const v1: OpenAPIV3.Document = {
	openapi: '3.0.3',
	info: {
		title: 'Shoplog Backend API',
		description: 'API for the Shoplog Backend',
		version: '1.0.0',
	},
	servers: [
		{
			url: `http://localhost:${CONFIG.server.port}/v1`,
			description: 'Development',
		},
		{
			url: 'https://api.shoplog.com/v1',
			description: 'Production',
		},
	],
	paths: {},
	components: {
		headers: {
			'x-request-id': {
				description: 'Unique request identifier',
				required: true,
				schema: {
					type: 'string',
				},
			},
		},
		schemas: {
			ProblemSchema,
			ValidationProblemSchema,
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

export { v1 };
