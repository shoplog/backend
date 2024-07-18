import { Router } from 'express';
import { checkJwt } from 'src/api/middlewares';
import { contextWrapMiddleware } from 'src/api/middlewares/contex-wrap.middleware';

export async function createUserRoutes(): Promise<Router> {
	const router = Router();
	router.get(
		'/me',
		checkJwt,
		contextWrapMiddleware(async (req, res) => {
			res.json(req.auth);
		})
	);

	return router;
}
