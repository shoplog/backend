// import { Static, TSchema, Type } from '@sinclair/typebox';
// import { Request, Response } from 'express';
// import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
// import { ProblemSchema, ValidationProblemSchema } from 'src/api/openapi/schemas/problem.schema';
// import { VehiclesSearchByVinResponseBodySchema } from 'src/api/openapi/schemas/vehicles.schema';

// type SupportedStatusCodes = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 422 | 500;
// type SupportedMediaTypes =
// 	| 'application/json'
// 	| 'application/problem+json'
// 	| 'application/xml'
// 	| 'text/plain'
// 	| 'text/html';

// function createOpenApiSchema<
// 	TPaths extends Record<
// 		string,
// 		{
// 			summary?: string;
// 			description?: string;
// 			get?: TOperationObject;
// 			put?: TOperationObject;
// 			post?: TOperationObject;
// 			delete?: TOperationObject;
// 			options?: TOperationObject;
// 			head?: TOperationObject;
// 			patch?: TOperationObject;
// 			trace?: TOperationObject;
// 			servers?: OpenAPIV3.ServerObject[];
// 			parameters?: Array<TParametersRef | TParameterObject>;
// 		}
// 	>,
// 	TSchemas extends Record<string, TSchema>,
// 	TSchemasRef extends { $ref: `#/components/schemas/${keyof TSchemas & string}` },
// 	TStaticSchema extends TSchemas[keyof TSchemas] extends TSchema ? Static<TSchemas[keyof TSchemas]> : never,
// 	TParameters extends Record<string, TParameterObject>,
// 	TParametersRef extends { $ref: `#/components/parameters/${keyof TParameters & string}` },
// 	TParameterObject extends Omit<OpenAPIV3.ParameterObject, 'schema' | 'example' | 'examples' | 'content'> & {
// 		schema?: TSchemasRef | TSchema;
// 		example?: TStaticSchema;
// 		examples?: Record<string, TStaticSchema>;
// 		content?: TParameterObjectContent;
// 	},
// 	TParameterObjectContent extends {
// 		[key in SupportedMediaTypes]?: TParameterMediaObject;
// 	},
// 	TParameterMediaObjectSchema extends TSchemasRef | TSchema,
// 	TParameterMediaObject extends {
// 		schema?: TParameterMediaObjectSchema;
// 		example?: TParameterMediaObjectSchema extends TSchemasRef ? TStaticSchema : never;
// 		examples?: Record<string, TParameterExampleObject>;
// 	},
// 	TParameterExampleObject extends Omit<OpenAPIV3.ExampleObject, 'value'> & { value: TStaticSchema },
// 	TRequestBodies extends Record<string, OpenAPIV3.RequestBodyObject>,
// 	TRequestBodiesRef extends { $ref: `#/components/requestBodies/${keyof TRequestBodies & string}` },
// 	TRequestBodyObject extends {
// 		description?: string;
// 		content: TRequestBodyObjectContent;
// 		required?: boolean;
// 	},
// 	TRequestBodyObjectContent extends {
// 		[key in SupportedMediaTypes]?: TRequestMediaObject;
// 	},
// 	TRequestExampleObject extends Omit<OpenAPIV3.ExampleObject, 'value'> & { value: TStaticSchema },
// 	TRequestMediaObjectSchema extends TSchemasRef | TSchema,
// 	TRequestMediaObject extends {
// 		schema?: TRequestMediaObjectSchema;
// 		example?: TStaticSchema;
// 		examples?: Record<string, TRequestExampleObject>;
// 	},
// 	TResponsesObject extends Record<string, OpenAPIV3.ResponseObject>,
// 	TResponsesObjectRef extends { $ref: `#/components/responses/${keyof TResponsesObject & string}` },
// 	TSecurityObject extends Record<string, OpenAPIV3.SecuritySchemeObject>,
// 	THeaders extends Record<string, OpenAPIV3.HeaderObject>,
// 	TLinks extends Record<string, OpenAPIV3.LinkObject>,
// 	TOperationObject extends {
// 		tags?: string[];
// 		summary?: string;
// 		description?: string;
// 		externalDocs?: OpenAPIV3.ExternalDocumentationObject;
// 		operationId?: string;
// 		parameters?: Array<TParametersRef | TParameterObject>;
// 		requestBody?: TRequestBodiesRef | TRequestBodyObject;
// 		responses?: {
// 			[key in SupportedStatusCodes]?: TResponsesObjectRef | OpenAPIV3.ResponseObject;
// 		};
// 		callbacks?: Record<string, OpenAPIV3.CallbackObject>;
// 		deprecated?: boolean;
// 		security?: Array<Record<keyof TSecurityObject, string[]> | OpenAPIV3.SecurityRequirementObject>;
// 		servers?: OpenAPIV3.ServerObject[];
// 	},
// >(
// 	document: Omit<OpenAPIV3.Document, 'paths' | 'components'> & {
// 		paths: TPaths;
// 		security?: Array<Record<keyof TSecurityObject, string[]> | OpenAPIV3.SecurityRequirementObject>;
// 		components?: {
// 			schemas?: TSchemas;
// 			parameters?: TParameters;
// 			requestBodies?: TRequestBodies;
// 			responses?: TResponsesObject;
// 			callbacks?: Record<string, OpenAPIV3.CallbackObject>;
// 			headers?: THeaders;
// 			securitySchemes?: TSecurityObject;
// 			links?: TLinks;
// 		};
// 	}
// ) {
// 	return document;
// }

// const doc = createOpenApiSchema({
// 	openapi: '3.0.3',
// 	info: {
// 		title: 'My API',
// 		version: '1.0.0',
// 	},
// 	paths: {
// 		'/': {
// 			parameters: [
// 				{
// 					$ref: '#/components/parameters/userId',
// 				},
// 			],
// 			get: {
// 				requestBody: {
// 					content: {
// 						'application/json': {
// 							schema: {
// 								$ref: '#/components/schemas/VehiclesSearchByVinResponseBodySchema',
// 							},
// 						},
// 					},
// 				},
// 				security: [
// 					{
// 						bearerAuth: [],
// 					},
// 				],
// 				responses: {
// 					200: {
// 						$ref: '#/components/responses/GetHealthcheckResponse',
// 					},
// 				},
// 			},
// 		},
// 	},
// 	security: [
// 		{
// 			bearerAuth: [],
// 		},
// 	],
// 	components: {
// 		schemas: {
// 			ProblemSchema,
// 			ValidationProblemSchema,
// 			VehiclesSearchByVinResponseBodySchema,
// 		},
// 		parameters: {
// 			userId: {
// 				name: 'userId',
// 				in: 'path',
// 				required: true,
// 				schema: Type.String(),
// 			},
// 		},
// 		requestBodies: {
// 			DefaultRequest: {
// 				content: {
// 					'application/json': {
// 						schema: Type.Object({
// 							name: Type.String(),
// 							age: Type.String(),
// 						}),
// 					},
// 				},
// 			},
// 		},
// 		responses: {
// 			GetHealthcheckResponse: {
// 				description: 'Healthcheck response',
// 				content: {
// 					'application/json': {
// 						schema: ProblemSchema,
// 					},
// 				},
// 			},
// 		},
// 		securitySchemes: {
// 			bearerAuth: {
// 				type: 'http',
// 				scheme: 'bearer',
// 			},
// 		},
// 	},
// });

// doc.paths['/'].get.requestBody.content['application/json'].schema.$ref

// class OpenApiDocument<T extends OpenAPIV3.Document> {
// 	constructor(readonly document: T) {}

// 	asRoute<
// 		TPath extends keyof T['paths'],
// 		TOperation extends keyof Omit<
// 			T['paths'][TPath],
// 			'summary' | 'description' | 'trace' | 'header' | 'options' | 'servers' | 'parameters'
// 		>,
// 		TRequest extends Request<T['paths'][TPath]['parameters']>,
// 	>(path: TPath, operation: TOperation, handler: (req: TRequest, res: Response) => Response) {
// 		return this.document.paths[path as string].get;
// 	}

// 	getApiSpec() {
// 		return this.document;
// 	}
// }

// const apiDoc = new OpenApiDocument(doc);

// apiDoc.asRoute('/', 'get', (req, res) => ({
//   req.
// }));

// export { doc as v2 };
