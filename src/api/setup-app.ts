import compression from 'compression';
import express, { Request, json } from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { CUSTOM_HEADERS } from 'src/api/constants/headers';
import { logger } from 'src/common/initializers/logger';
import { errorHandlerMiddleware } from 'src/api/middlewares';
import { NotFound } from 'express-openapi-validator/dist/openapi.validator';
import { createUserRoutes } from 'src/api/routes/users.routes';
import { apiSpec } from 'src/api/schemas/openapi.schema';
import { middleware as OpenApiValidatorMiddleware } from 'express-openapi-validator';
import { apiReference } from '@scalar/express-api-reference';

export const setupApp = async () => {
	const app = express();

	app.use(
		helmet({
			// Disable CSP because it's not needed for this API only project.
			contentSecurityPolicy: false,
		})
	);

	// For when the app is behind a proxy, like in a docker container or in a kubernetes cluster.
	app.set('trust proxy', 1);

	app.use(compression());

	// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec, {}));

	app.use(
		'/api-docs',
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

	app.get('/', (req, res) => {
		res.status(200).end();
	});

	app.use('/api/v1', await createUserRoutes());

	app.use(
		OpenApiValidatorMiddleware({
			apiSpec,
			validateApiSpec: false,
			validateRequests: true,
			validateResponses: true,
		})
	);

	app.use((req: Request) => {
		throw new NotFound({ path: req.url, message: 'Not Found' });
	});

	app.use(errorHandlerMiddleware());

	return app;
};
