// import { Request } from 'express';
// import { UnauthorizedError } from 'express-oauth2-jwt-bearer';
// import { STATUS_CODES } from 'http';
// import { Problem } from 'src/api/schemas/problem.schema';

// export class ErrorManager<const Errors extends Record<string, { prototype: Error }>> {
// 	readonly errorsMap: Map<
// 		keyof Errors,
// 		{
// 			statusCode: number;
// 			responseFunc?: (statusCode: number, request: Request, error: Error) => Problem;
// 		}
// 	>;

// 	constructor(readonly errors: Errors) {
// 		this.errors = errors;
// 		this.errorsMap = new Map();
// 	}

// 	mapError<K extends keyof Errors, TStatus extends number = 500>(
// 		error: K,
// 		params: {
// 			statusCode: TStatus;
// 			responseFunc: (
// 				statusCode: TStatus,
// 				request: Request,
// 				error: Errors[K] extends {
// 					prototype: infer LiteralError extends Error;
// 				}
// 					? LiteralError
// 					: Errors[K]
// 			) => Problem;
// 		}
// 	) {
// 		this.errorsMap.set(error, {
// 			statusCode: params.statusCode,
// 			responseFunc: (statusCode: number, request: Request, error: Error) =>
// 				params.responseFunc(statusCode as TStatus, request, error),
// 		});
// 	}

// 	getErrorMap(err: unknown): { status: () => number; toProblem: (req: Request) => Problem } {
// 		if (err instanceof Error) {
// 			const errorMap = this.errorsMap.get(err.constructor.name);

// 			if (errorMap) {
// 				return {
// 					status: () => errorMap,
// 					toProblem: (req: Request) => errorMap.responseFunc(errorMap.statusCode, err),
// 				};
// 			}
// 		}

// 		return {
// 			status: () => 500,
// 			toProblem: (req: Request) => this.#createDefaultProblem(500, req, err),
// 		};
// 	}

// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	#createDefaultProblem(statusCode: number, req: Request, error: any): Problem {
// 		return {
// 			type: 'err.unknown',
// 			status: statusCode,
// 			title: STATUS_CODES[statusCode] ?? 'Unknown Error',
// 			detail: error?.message ?? 'An unknown error occurred.',
// 			instance: req.protocol + '://' + req.get('host') + req.originalUrl,
// 		};
// 	}
// }

// const errorManager = new ErrorManager({
// 	UnauthorizedError,
// });

// errorManager.mapError('UnauthorizedError', {
// 	statusCode: 401,
// });
