import { Router } from 'express';
import { UnauthorizedHttpError } from 'src/api/errors';
import { checkJwt } from 'src/api/middlewares';
import { contextWrapMiddleware } from 'src/api/middlewares/contex-wrap.middleware';

export async function createUserRoutes(): Promise<Router> {
	const router = Router();
	router.use(checkJwt);
	router.get(
		'/users',
		contextWrapMiddleware(async (req, res) => {
			const users = await req.db.user.findMany();
			res.json(users);
		})
	);

	router.get(
		'/me',
		contextWrapMiddleware(async (req, res) => {
			if (!req.auth) {
				throw new UnauthorizedHttpError('Unauthorized');
			}

			res.json(req.auth);
		})
	);

	return router;
}
