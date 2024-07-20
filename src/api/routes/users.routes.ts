import { Router } from 'express';
import { HttpError } from 'express-openapi-validator/dist/framework/types';
import { checkJwt } from 'src/api/middlewares';
import { contextWrapMiddleware } from 'src/api/middlewares/contex-wrap.middleware';
import { StandardError } from 'src/common/errors/standard.error';

export async function createUserRoutes(): Promise<Router> {
	const router = Router();
	router.get(
		'/me',
		checkJwt,
		contextWrapMiddleware(async (req, res) => {
			res.json(req.auth);
		})
	);

	router.get(
		'/me2',
		contextWrapMiddleware(async (req, res) => {
			try {
				throw new HttpError({
					status: 404,
					message: 'Not found',
					name: 'NotFound',
					path: '/m2',
					errors: [{ message: 'blah', path: 'blah', errorCode: 'blah' }],
				});
			} catch (err) {
				throw new StandardError('Um testing', { data: 'data' }, err);
			}

			res.json(req.auth);
		})
	);

	return router;
}
