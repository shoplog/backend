import express from 'express';
import pinoHttp from 'pino-http';
import { CUSTOM_HEADERS } from 'src/common/constants/headers';
import { logger } from 'src/initializers/logger';

export const setupApp = () => {
	const app = express();

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

	app.get('/', (req, res) => {
		res.status(200).send('Ok!');
	});

	return app;
};
