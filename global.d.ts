import 'jest-extended';

declare global {
	namespace Express {
		interface Request {
			db: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;
		}
	}
}
