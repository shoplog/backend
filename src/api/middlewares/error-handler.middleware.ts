import { ErrorRequestHandler } from 'express';
import { UnauthorizedError } from 'express-oauth2-jwt-bearer';
import { HttpError as OpenApiValidatorHttpError } from 'express-openapi-validator/dist/framework/types';
import { STATUS_CODES } from 'http';
import { Errors } from 'src/api/errors/error-map';
import { Problem } from 'src/api/schemas/problem.schema';
import { CONFIG } from 'src/common/config/env';
import { CodedError } from 'src/common/errors';
import { logger } from 'src/common/initializers/logger';

export function errorHandlerMiddleware(): ErrorRequestHandler {
	return (err, req, res, _next) => {
		logger.error(err);

		const { message, stack } = err;
		let type = 'err.unknown';
		let status = err.status;
		let data: Record<string, unknown> | undefined;

		if (CONFIG.environment !== 'production') {
			data = { stack };
		}

		// Custom errors
		if (err instanceof CodedError) {
			const { code, data: errData } = err;
			type = code;
			status = Errors[code] ?? 500;
			data = { ...data, data: errData };
		}
		// OpenAPI Validator Error
		else if (err instanceof OpenApiValidatorHttpError) {
			const { status: errStatus, errors } = err;
			const mappedErrors = errors.map((error) => ({
				name: error.path,
				reason: error.message,
			}));

			type = 'err.validation';
			data = { ...data, errors: mappedErrors };
			status = errStatus;
		}
		// auth0
		else if (err instanceof UnauthorizedError) {
			const { status: errStatus } = err;
			type = 'err.auth';
			status = errStatus;
		}

		const problem: Problem = {
			type,
			status,
			title: STATUS_CODES[status ?? 500] ?? 'Unknown Error',
			detail: message ?? 'An unknown error occurred.',
			instance: req.protocol + '://' + req.get('host') + req.originalUrl,
			...data,
		};

		res.status(problem.status).contentType('application/json+problem').send(problem);
	};
}
