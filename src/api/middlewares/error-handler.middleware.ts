import { ErrorRequestHandler } from 'express';
import { HttpError } from 'express-openapi-validator/dist/framework/types';
import { STATUS_CODES } from 'http';
import { snakeCase } from 'lodash';
import { getErrorMap } from 'src/api/errors/error-map';
import { Problem } from 'src/api/types/common';
import { CONFIG } from 'src/common/config/env';
import { StandardError } from 'src/common/errors/standard.error';
import { logger } from 'src/common/initializers/logger';

const UNKNOWN_ERROR = 'unknown_error';

type ErrorData = {
	name: string;
	message: string;
	stack?: string;
	innerError?: ErrorData;
};

const getInnerErrorData = (error?: unknown): ErrorData | undefined => {
	if (!error) {
		return;
	}

	if (error instanceof Error) {
		const { name, message, stack } = error;
		let innerError: ErrorData | undefined;

		if (error instanceof StandardError) {
			innerError = getInnerErrorData(error.innerError);
		}

		return { name, message, stack, innerError };
	}

	return;
};

export function errorHandlerMiddleware(): ErrorRequestHandler {
	return (err, req, res, _next) => {
		logger.error(err);

		const typeBaseUrl = `${req.protocol}://${req.get('host')}/errors`;
		const instance = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
		let type = 'about:blank';
		let code = UNKNOWN_ERROR;
		let status = 500;
		let additionalProperties: Record<string, unknown> = {};
		let message = 'An unknown error occurred.';
		let stack: string | undefined;

		if (err instanceof Error) {
			const { message: errMessage, name, cause, stack: errStack, ...rest } = err;
			message = errMessage;
			stack = errStack;

			const errorMap = getErrorMap(err);

			if (errorMap) {
				code = errorMap.code;
				status = errorMap.status;
				type = `${typeBaseUrl}/${code}`;
				additionalProperties = { ...errorMap.additionalProperties };
			} else {
				if (err instanceof HttpError) {
					status = err.status;
					code = snakeCase(err.name);
				} else if (err instanceof StandardError) {
					additionalProperties = {
						...additionalProperties,
						...err.data,
						innerError: getInnerErrorData(err.innerError),
					};
				}
				additionalProperties = rest;
			}

			if (CONFIG.environment !== 'production') {
				additionalProperties = { ...additionalProperties, errorName: name, cause, stack };
			}
		}

		const problem: Problem = {
			type,
			code,
			title: STATUS_CODES[status] ?? 'Unknown Error',
			status,
			detail: message,
			instance,
			...additionalProperties,
		};

		res.status(problem.status).contentType('application/json+problem').send(problem);
	};
}
