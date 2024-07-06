import compression from 'compression';
import express, { json } from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { CUSTOM_HEADERS } from 'src/common/constants/headers';
import { logger } from 'src/initializers/logger';

export const setupApp = () => {
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
		res.status(200).send('Ok!');
	});

	return app;
};
