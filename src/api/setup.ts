import { apiReference } from '@scalar/express-api-reference';
import compression from 'compression';
import cors from 'cors';
import express, { json } from 'express';
import { middleware as OpenApiValidatorMiddleware } from 'express-openapi-validator';
import { OpenApiSpecLoader } from 'express-openapi-validator/dist/framework/openapi.spec.loader';
import { NotFound, OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import 'express-openapi-validator/dist/middlewares/parsers/schema.parse';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { OPEN_API_SPEC_FILE_PATH } from 'src/api/constants/files';
import { CUSTOM_HEADERS } from 'src/api/constants/headers';
import { Dependencies } from 'src/api/global';
import { errorHandlerMiddleware } from 'src/api/middlewares';
import { createVPICRoutes } from 'src/api/routes/vpic.routes';
import { logger } from 'src/common/initializers/logger';

export const loadOpenApiSpec = async (): Promise<OpenAPIV3.Document> => {
	const loader = new OpenApiSpecLoader({
		apiDoc: OPEN_API_SPEC_FILE_PATH,
		validateApiSpec: true,
	});

	const { apiDoc: apiSpec } = await loader.load();

	return apiSpec;
};

export const createApp = async (dependencies: Dependencies) => {
	const app = express();
	const apiSpec = await loadOpenApiSpec();

	app.use(
		helmet({
			// Disable CSP because it's not needed for this API only project.
			contentSecurityPolicy: false,
		})
	);

	// For when the app is behind a proxy, like in a docker container or in a kubernetes cluster.
	app.set('trust proxy', 1);

	app.use(compression());

	app.use(cors());

	app.get('/docs/openapi.json', (_req, res) => {
		res.json(apiSpec);
	});

	app.use(
		'/docs',
		apiReference({
			spec: {
				content: apiSpec,
			},
		})
	);

	// Generate request id that will correlate all logs for a single request.
	app.use((req, res, next) => {
		req.id = crypto.randomUUID();
		res.set(CUSTOM_HEADERS.RequestId, req.id);
		next();
	});

	app.use(
		pinoHttp({
			logger,
			quietReqLogger: true,
			genReqId: (req) => req.id,
		})
	);

	app.use(json());

	app.use(
		OpenApiValidatorMiddleware({
			apiSpec,
			validateApiSpec: true,
			validateRequests: true,
			validateResponses: true,
		})
	);

	app['get']('/', (req, res) => {
		res.status(200).end();
	});

	app.use('/api/v1', await createVPICRoutes(dependencies.controllers.vpicController));

	app.use((req, _res, _next) => {
		throw new NotFound({ path: req.originalUrl });
	});

	app.use(errorHandlerMiddleware());

	return app;
};
