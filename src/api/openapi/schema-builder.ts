// import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
// import { ProblemSchema, ValidationProblemSchema } from 'src/api/schemas/problem.schema';

// export const createOpenApiSchema = <
// 	const TSchemas extends Record<string, OpenAPIV3.SchemaObject>,
// 	TResponse extends string,
// 	TResponses extends Record<TResponse, { schema: keyof TSchemas; description?: string }>,
// 	TParameter extends string,
// 	TParameters extends Record<TParameter, OpenAPIV3.ParameterObject>,
// 	TRequestBody extends string,
// 	TRequestBodies extends Record<TRequestBody, { schema: keyof TSchemas; description?: string }>,
// 	TOperationObject extends {
// 		tags?: string[];
// 		summary?: string;
// 		description?: string;
// 		operationId?: string;
// 		parameters?: Array<keyof TParameters>;
// 		requestBody?: keyof TRequestBodies;
// 		successResponse?: keyof TResponses;
// 		allowAnonymous?: boolean;
// 	},
// >({
// 	paths,
// 	components,
// }: {
// 	paths: Record<
// 		string,
// 		{
// 			summary?: string;
// 			description?: string;
// 			get?: TOperationObject;
// 			put?: TOperationObject;
// 			post?: TOperationObject;
// 			delete?: TOperationObject;
// 			patch?: TOperationObject;
// 		}
// 	>;
// 	components: {
// 		schemas?: TSchemas;
// 		parameters?: TParameters;
// 		responses?: TResponses;
// 		requestBodies?: TRequestBodies;
// 	};
// }) => {};

// createOpenApiSchema({
// 	paths: {
// 		'/': {
// 			get: {
// 				summary: 'Health Check',
// 				description: 'Health check endpoint',
// 				successResponse: 'GetHealthcheckResponse',
// 			},
// 			post: {
// 				parameters: ['userId'],
// 				successResponse: 'GetHealthcheckResponse',
// 				requestBody: 'CreateUserRequestBody',
// 			},
// 		},
// 	},
// 	components: {
// 		schemas: {
// 			ProblemSchema,
// 			ValidationProblemSchema,
// 		},
// 		requestBodies: {
// 			CreateUserRequestBody: {
// 				schema: 'ProblemSchema',
// 				description: 'Create user request body',
// 			},
// 		},
// 		parameters: {
// 			userId: {
// 				in: 'path',
// 				name: 'userId',
// 				required: true,
// 			},
// 		},
// 		responses: {
// 			GetHealthcheckResponse: {
// 				schema: 'ProblemSchema',
// 				description: 'Health check successful',
// 			},
// 			Problem400Response: {
// 				schema: 'ValidationProblemSchema',
// 				description: 'Request cannot be processed due to malformed request syntax.',
// 			},
// 			Problem401Response: {
// 				schema: 'ProblemSchema',
// 				description: 'Request was not processed due to authentication failure.',
// 			},
// 			Problem403Response: {
// 				schema: 'ProblemSchema',
// 				description: 'Request was not processed due to insufficient permissions.',
// 			},
// 			Problem404Response: {
// 				schema: 'ProblemSchema',
// 				description: 'Request was not processed due to resource not found.',
// 			},
// 			Problem422Response: {
// 				schema: 'ProblemSchema',
// 				description: 'Request was formed correctly but errors occurred during processing.',
// 			},
// 			Problem500Response: {
// 				schema: 'ProblemSchema',
// 				description: 'Request was not processed due to an internal server error.',
// 			},
// 		},
// 	},
// });
