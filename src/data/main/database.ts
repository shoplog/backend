import { PrismaClient } from '@prisma/client';

export const MainDatabase = new PrismaClient();
export type MainDatabase = Omit<
	typeof MainDatabase,
	'$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
