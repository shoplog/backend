/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { UnauthorizedError } from 'express-oauth2-jwt-bearer';
import { ParamsDictionary, Query } from 'express-serve-static-core';

export function getRequiredUserId<
	P = ParamsDictionary,
	ResBody = any,
	ReqBody = any,
	ReqQuery = Query,
	Locals extends Record<string, any> = Record<string, any>,
>(req: Request<P, ResBody, ReqBody, ReqQuery, Locals>): string {
	const userId = req.auth?.payload.sub;

	if (!userId) {
		throw new UnauthorizedError('User ID is required');
	}

	return userId;
}
