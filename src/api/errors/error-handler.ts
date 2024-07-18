// import { Request } from 'express';
// import { UnauthorizedError } from 'express-oauth2-jwt-bearer';
// import { HttpError } from 'express-openapi-validator/dist/framework/types';
// import { STATUS_CODES } from 'http';
// import { snakeCase } from 'lodash';
// import { Problem, ValidationProblem } from 'src/api/schemas/problem.schema';
// import { CONFIG } from 'src/common/config/env';
// import { StandardError } from 'src/common/errors/standard.error';

// // function registerErrors<const Errors extends Record<string, { prototype: Error }>>(
// // 	errors: Errors,
// // 	str: {
// // 		[K in keyof Errors]: <TStatus extends number>(
// // 			status: TStatus,
// // 			handler: (
// // 				status: TStatus,
// // error: Errors[K] extends {
// // 	prototype: infer LiteralError extends Error;
// // }
// // 	? LiteralError
// // 	: Errors[K]
// // 			) => unknown
// // 		) => void;
// // 	}
// // ) {}

// function mapErrors<
// 	const Errors extends Record<string, { prototype: Error }>,
// 	TProblem extends Problem | ValidationProblem,
// >(
// 	errors: Errors,
// 	map: {
// 		[K in keyof Errors]: {
// 			statusCode: number;
// 			responseFunc?: (
// 				statusCode: number,
// 				request: Express.Request,
// 				problem: TProblem,
// 				error: Errors[K] extends {
// 					prototype: infer LiteralError extends Error;
// 				}
// 					? LiteralError
// 					: Errors[K]
// 			) => TProblem;
// 		};
// 	}
// ) {
// 	return {
// 		getErrorMap: (err: unknown) => {
// 			const defaultResponseFunc = (statusCode: number, request: Request, error: unknown) => {
// 				if (error instanceof Error) {
// 					const { message, stack, cause } = error;
// 					const type = snakeCase(error.constructor.name);
// 					let data: Record<string, unknown> | undefined;

// 					if (CONFIG.environment !== 'production') {
// 						data = { cause, stack };
// 					}

// 					if (error instanceof StandardError) {
// 						data = { ...data, data: error.data };
// 					}

// 					return {
// 						type,
// 						status: statusCode,
// 						title: STATUS_CODES[statusCode ?? 500] ?? 'Unknown Error',
// 						detail: message ?? 'An unknown error occurred.',
// 						instance: request.protocol + '://' + request.get('host') + request.originalUrl,
// 						...data,
// 					};
// 				} else {
// 					return {
// 						type: 'unknown',
// 						status: statusCode,
// 						title: STATUS_CODES[statusCode ?? 500] ?? 'Unknown Error',
// 						detail: 'An unknown error occurred.',
// 						instance: request.protocol + '://' + request.get('host') + request.originalUrl,
// 					};
// 				}
// 			};

// 			if (err instanceof Error) {
// 				const error = err as Error;
// 				const existingMap = map[error.constructor.name as keyof Errors];

// 				if (existingMap) {
// 					return {
// 						statusCode: () => existingMap.statusCode,
// 						toProblem: (request: Request) => {
// 							const defaultProblem = defaultResponseFunc(existingMap.statusCode, request, err);

// 							if (existingMap.responseFunc) {
// 								return existingMap.responseFunc(
// 									existingMap.statusCode,
// 									request,
// 									defaultProblem as TProblem,
// 									error as Errors[keyof Errors] extends { prototype: infer LiteralError extends Error }
// 										? LiteralError
// 										: Errors[keyof Errors]
// 								);
// 							}

// 							return defaultProblem;
// 						},
// 					};
// 				}
// 			}
// 			return {
// 				statusCode: () => 500,
// 				toProblem: (request: Request) => defaultResponseFunc(500, request, err),
// 			};
// 		},
// 	};
// }

// export const errorMap = mapErrors(
// 	{
// 		UnauthorizedError,
// 		HttpError,
// 	},
// 	{
// 		UnauthorizedError: {
// 			statusCode: 401,
// 			responseFunc: (status, request, problem, error) => ({ ...problem, status: error.status }),
// 		},
// 		HttpError: {
// 			statusCode: 400,
// 			responseFunc: (status, request, problem, error) => {
// 				if (error instanceof UnauthorizedHttpError) {
// 					return {
// 						...problem,
// 						status: error.status,
// 						errors: error.errors,
// 					};
// 				}
// 				return problem;
// 			},
// 		},
// 	}
// );
