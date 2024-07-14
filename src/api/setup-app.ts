import compression from 'compression';
import express, { json, Request } from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { CUSTOM_HEADERS } from 'src/api/constants/headers';
import { logger } from 'src/common/initializers/logger';
import { middleware as OpenApiValidatorMiddleware } from 'express-openapi-validator';
import { errorHandlerMiddleware } from 'src/api/middlewares';
import { NotFound } from 'express-openapi-validator/dist/openapi.validator';
import { createUserRoutes } from 'src/api/routes/users.routes';
import { createVehicleSearchRoutes } from 'src/api/routes/vehicle-search.routes';

const OPEN_API_SPEC = 'data/openapi/v1.yml';

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

	// app.get(
	// 	'/api/v1/users',
	// 	contextWrapMiddleware(async (req, res) => {
	// 		const users = await req.db.user.findMany();
	//     res.json(users);
	// 	})
	// );

	app.use('/api/v1', await createUserRoutes());
	app.use('/api/v1/vehicles/search', await createVehicleSearchRoutes());

	app.use(
		OpenApiValidatorMiddleware({
			apiSpec: OPEN_API_SPEC,
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
