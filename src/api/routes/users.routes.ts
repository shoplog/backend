import { Router } from 'express';
import { sql } from 'kysely';
import { UnauthorizedHttpError } from 'src/api/errors';
import { checkJwt } from 'src/api/middlewares';
import { contextWrapMiddleware } from 'src/api/middlewares/contex-wrap.middleware';
import { VehicleDb } from 'src/common/initializers/db';

export async function createUserRoutes(): Promise<Router> {
	const router = Router();
	router.get(
		'/me',
		checkJwt,
		contextWrapMiddleware(async (req, res) => {
			if (!req.auth) {
				throw new UnauthorizedHttpError('Unauthorized');
			}

			res.json(req.auth);
		})
	);

	router.get(
		'/vin',
		checkJwt,
		contextWrapMiddleware(
			async (req, res) => {
				if (!req.auth) {
					throw new UnauthorizedHttpError('Unauthorized');
				}
				// 5TEWN72N82Z891171 2002 toyota tacoma
				const { rows } = await sql`EXEC spVinDecode '2HKRW2H55JH103484'`.execute(VehicleDb);
				const data = rows as VinDecodeItem[];
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const obj = data.reduce(function (acc: any, cur) {
					acc[cur.Code] = cur.Value;
					return acc;
				}, {});

				res.json(obj);
			},
			{ disableTransaction: true }
		)
	);

	return router;
}

interface VinDecodeItem {
	GroupName: string | null;
	Variable: string;
	Value: string | null;
	PatternId: number | null;
	VinSchemaId: number | null;
	Keys: string | null;
	ElementId: number;
	AttributeId: string | null;
	CreatedOn: Date | null;
	WmiId: number | null;
	Code: string;
	DataType: string;
	Decode: string;
	Source: string;
	ToBeQCd: string | null;
}
