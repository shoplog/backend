import { Router } from 'express';
import { contextWrapMiddleware } from 'src/api/middlewares/contex-wrap.middleware';

export async function createUserRoutes(): Promise<Router> {
	const router = Router();
	// router.use(contextWrapMiddleware);
	router.get(
		'/users',
		contextWrapMiddleware(async (req, res) => {
			const users = await req.db.user.findMany();
			res.json(users);
		})
	);

	return router;
}
