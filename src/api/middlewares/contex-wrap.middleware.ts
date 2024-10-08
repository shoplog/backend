/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

export type ExpressMiddlewareFunction<
	P = ParamsDictionary,
	ResBody = any,
	ReqBody = any,
	ReqQuery = Query,
	Locals extends Record<string, any> = Record<string, any>,
> = (req: Request<P, ResBody, ReqBody, ReqQuery, Locals>, res: Response<ResBody, Locals>) => Promise<void>;

export function contextWrapMiddleware<
	P = ParamsDictionary,
	ResBody = any,
	ReqBody = any,
	ReqQuery = Query,
	Locals extends Record<string, any> = Record<string, any>,
>(
	fn: ExpressMiddlewareFunction<P, ResBody, ReqBody, ReqQuery, Locals>
): (
	req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
	res: Response<ResBody, Locals>,
	next: NextFunction
) => Promise<void> {
	return async (req, res, next) => {
		try {
			await fn(req, res);
		} catch (error) {
			next(error);
		}
	};
}
