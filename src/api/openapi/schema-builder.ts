import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { ProblemSchema, ValidationProblemSchema } from 'src/api/openapi/schemas/problem.schema';
import { VehiclesSearchByVinResponseBodySchema } from 'src/api/openapi/schemas/vehicles.schema';

export const createOpenApiSchema = <
	const TSchemas extends Record<string, OpenAPIV3.SchemaObject>,
	const TPaths extends Record<
		string,
		{
			summary?: string;
			description?: string;
			get?: TOperationObject;
			put?: TOperationObject;
			post?: TOperationObject;
			delete?: TOperationObject;
			patch?: TOperationObject;
		}
	>,
	TResponse extends string,
	TResponses extends Record<TResponse, { schema: keyof TSchemas; description?: string }>,
	TParameters extends Record<string, OpenAPIV3.ParameterObject>,
	TRequestBody extends string,
	TRequestBodies extends Record<TRequestBody, { schema: keyof TSchemas; description?: string }>,
	TOperationObject extends {
		tags?: string[];
		summary?: string;
		description?: string;
		operationId?: string;
		parameters?: Array<keyof TParameters>;
		requestBody?: keyof TRequestBodies;
		successResponse?: keyof TResponses;
		allowAnonymous?: boolean;
	},
>({
	paths,
	components,
}: {
	paths: TPaths;
	components: {
		schemas?: TSchemas;
		parameters?: TParameters;
		responses?: TResponses;
		requestBodies?: TRequestBodies;
	};
}) => {
	return { paths, components };
};

const v2 = createOpenApiSchema({
	paths: {
		'/vehicles/search/by-vin': {
			get: {
				summary: 'Search for vehicles by VIN',
				description: 'Search for vehicles by VIN',
				operationId: 'vehiclesSearchByVin',
				successResponse: 'GetHealthcheckResponse',
				parameters: ['userId'],
			},
		},
	},
	components: {
		schemas: {
			ProblemSchema,
			ValidationProblemSchema,
			VehiclesSearchByVinResponseBodySchema,
		},
		parameters: {
			userId: {
				in: 'path',
				name: 'userId',
				required: true,
			},
		},
		responses: {
			GetHealthcheckResponse: {
				schema: 'ProblemSchema',
				description: 'Health check successful',
			},
			Problem400Response: {
				schema: 'ValidationProblemSchema',
				description: 'Request cannot be processed due to malformed request syntax.',
			},
			Problem401Response: {
				schema: 'ProblemSchema',
				description: 'Request was not processed due to authentication failure.',
			},
			Problem403Response: {
				schema: 'ProblemSchema',
				description: 'Request was not processed due to insufficient permissions.',
			},
			Problem404Response: {
				schema: 'ProblemSchema',
				description: 'Request was not processed due to resource not found.',
			},
			Problem422Response: {
				schema: 'ProblemSchema',
				description: 'Request was formed correctly but errors occurred during processing.',
			},
			Problem500Response: {
				schema: 'ProblemSchema',
				description: 'Request was not processed due to an internal server error.',
			},
		},
	},
});

export { v2 };
