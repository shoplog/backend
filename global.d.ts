import 'jest-extended';
import { PrismaClient } from '@prisma/client';

declare global {
	namespace Express {
		interface Request {
			db: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;
		}
	}
}
