/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import { MainDatabase } from 'src/data/main/database';

export type ExpressMiddlewareFunction<
	P = ParamsDictionary,
	ResBody = any,
	ReqBody = any,
	ReqQuery = Query,
	Locals extends Record<string, any> = Record<string, any>,
> = (req: Request<P, ResBody, ReqBody, ReqQuery, Locals>, res: Response<ResBody, Locals>) => Promise<void>;

type ContextWrapMiddlewareOptions = {
	disableTransactions?: boolean;
};

export function contextWrapMiddleware<
	P = ParamsDictionary,
	ResBody = any,
	ReqBody = any,
	ReqQuery = Query,
	Locals extends Record<string, any> = Record<string, any>,
>(
	fn: ExpressMiddlewareFunction<P, ResBody, ReqBody, ReqQuery, Locals>,
	opts?: ContextWrapMiddlewareOptions
): (
	req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
	res: Response<ResBody, Locals>,
	next: NextFunction
) => Promise<void> {
	return async (req, res, next) => {
		try {
			if (!opts?.disableTransactions && !req.db) {
				await MainDatabase.$transaction(async (trx) => {
					req.db = trx;
					await fn(req, res);
				});
			} else {
				if (!req.db) {
					req.db = MainDatabase;
				}

				await fn(req, res);
			}
		} catch (error) {
			next(error);
		}
	};
}
