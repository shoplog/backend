import {
	InsufficientScopeError,
	InvalidRequestError,
	InvalidTokenError,
	UnauthorizedError,
} from 'express-oauth2-jwt-bearer';
import { snakeCase } from 'lodash';
import { SearchByVinError } from 'src/domains/vpic/errors/search-by-vin.error';

type ErrorConfig = {
	code: string;
	statusCode: number;
	additionalProperties?: <T extends { prototype: Error }>(
		error: T extends { prototype: infer LiteralError extends Error } ? LiteralError : T
	) => Record<string, unknown>;
};

type ErrorMap = {
	code: string;
	status: number;
	additionalProperties?: Record<string, unknown>;
};

const errorsMap = new Map<string, ErrorConfig>();

const mapError = <T extends { prototype: Error }, S extends number>(
	error: T,
	statusCode: S,
	additionalProperties?: (
		error: T extends { prototype: infer LiteralError extends Error } ? LiteralError : T
	) => Record<string, unknown>
): void => {
	if (errorsMap.has(error.prototype.constructor.name)) {
		throw new Error(`Error ${error.prototype.constructor.name} already exists in the map`);
	}

	errorsMap.set(error.prototype.constructor.name, {
		code: snakeCase(error.prototype.constructor.name),
		statusCode,
		additionalProperties: additionalProperties
			? (error) =>
					additionalProperties(
						error as unknown as T extends { prototype: infer LiteralError extends Error } ? LiteralError : T
					)
			: undefined,
	});
};

const getErrorMap = (error: unknown): ErrorMap | undefined => {
	if (error instanceof Error) {
		const errorMap = errorsMap.get(error.constructor.name);

		if (errorMap) {
			return {
				code: errorMap.code,
				status: errorMap.statusCode,
				additionalProperties: errorMap.additionalProperties ? errorMap.additionalProperties(error) : undefined,
			};
		}
	}

	return;
};

// Map all errors here

// express-oauth2-jwt-bearer errors
mapError(InvalidRequestError, 400, (error) => ({ headers: error.headers }));
mapError(InvalidTokenError, 401, (error) => ({ headers: error.headers }));
mapError(InsufficientScopeError, 401, (error) => ({ headers: error.headers }));
mapError(UnauthorizedError, 401, (error) => ({ headers: error.headers }));
mapError(SearchByVinError, 422, (error) => ({ data: error.data }));

export { getErrorMap };
