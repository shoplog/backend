// import { Request, Response } from 'express';
// import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
// import { ProblemSchema, ValidationProblemSchema } from 'src/api/openapi/schemas/problem.schema';
// import { VehiclesSearchByVinResponseBodySchema, VinSchema } from 'src/api/openapi/schemas/vehicles.schema';
// import { paths } from 'src/api/types/openapi';
// import { CONFIG } from 'src/common/config/env';

// const createProblemResponse = (description: string, schema: OpenAPIV3.SchemaObject): OpenAPIV3.ResponseObject => ({
// 	description,
// 	content: {
// 		'application/problem+json': schema,
// 	},
// });

// const BadRequestResponse = createProblemResponse(
// 	'Request cannot be processed due to malformed request syntax',
// 	ValidationProblemSchema
// );

// const UnauthorizedResponse = createProblemResponse(
// 	'Request was not processed due to authentication failure',
// 	ProblemSchema
// );

// const ForbiddenResponse = createProblemResponse(
// 	'Request was not processed due to insufficient permissions',
// 	ProblemSchema
// );

// const NotFoundResponse = createProblemResponse('Request was not processed due to resource not found', ProblemSchema);

// const UnprocessableEntityResponse = createProblemResponse(
// 	'Request was formed correctly but errors occurred during processing',
// 	ProblemSchema
// );

// const InternalServerErrorResponse = createProblemResponse(
// 	'Request was not processed due to an internal server error',
// 	ProblemSchema
// );

// const defaultProblemResponses: OpenAPIV3.ResponsesObject = {
// 	400: BadRequestResponse,
// 	401: UnauthorizedResponse,
// 	403: ForbiddenResponse,
// 	404: NotFoundResponse,
// 	422: UnprocessableEntityResponse,
// 	500: InternalServerErrorResponse,
// };

// const v1: OpenAPIV3.Document = {
// 	openapi: '3.0.3',
// 	info: {
// 		title: 'Shoplog Backend API',
// 		description: 'API for the Shoplog Backend',
// 		version: '1.0.0',
// 	},
// 	servers: [
// 		{
// 			url: `http://localhost:${CONFIG.server.port}/v1`,
// 			description: 'Development',
// 		},
// 		{
// 			url: 'https://api.shoplog.com/v1',
// 			description: 'Production',
// 		},
// 	],
// 	paths: {
// 		'/vehicles/search/by-vin': {
// 			get: {
// 				summary: 'Search for a vehicle by VIN',
// 				description: 'Search for a vehicle by VIN',
// 				operationId: 'vehiclesSearchByVin',
// 				parameters: [
// 					{
// 						name: 'vin',
// 						in: 'query',
// 						description: 'Vehicle Identification Number',
// 						required: true,
// 						schema: VinSchema,
// 					},
// 				],
// 				responses: {
// 					200: {
// 						description: 'Vehicle found',
// 						content: {
// 							'application/json': {
// 								schema: VehiclesSearchByVinResponseBodySchema,
// 							},
// 						},
// 						...defaultProblemResponses,
// 					},
// 				},
// 			},
// 		},
// 	},
// 	components: {
// 		headers: {
// 			'x-request-id': {
// 				description: 'Unique request identifier',
// 				required: true,
// 				schema: {
// 					type: 'string',
// 				},
// 			},
// 		},
// 		schemas: {
// 			ProblemSchema,
// 			ValidationProblemSchema,
// 		},
// 		responses: {
// 			400: BadRequestResponse,
// 			401: UnauthorizedResponse,
// 			403: ForbiddenResponse,
// 			404: NotFoundResponse,
// 			422: UnprocessableEntityResponse,
// 			500: InternalServerErrorResponse,
// 		},
// 	},
// };

// export { v1 };
