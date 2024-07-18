import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { ProblemSchema, ValidationProblemSchema } from 'src/api/schemas/problem.schema';

const createProblemResponse = (description: string, schema: OpenAPIV3.SchemaObject): OpenAPIV3.ResponseObject => ({
	description,
	content: {
		'application/problem+json': schema,
	},
});

const createSuccessJsonResponse = (description: string, schema?: OpenAPIV3.SchemaObject): OpenAPIV3.ResponseObject => ({
	description,
	content: {
		'application/json': schema ?? {},
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

export {
	BadRequestResponse,
	UnauthorizedResponse,
	ForbiddenResponse,
	NotFoundResponse,
	UnprocessableEntityResponse,
	InternalServerErrorResponse,
	createProblemResponse,
	createSuccessJsonResponse,
};
