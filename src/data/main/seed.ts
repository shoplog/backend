import { PrismaClient } from '@prisma/client';
import { logger } from 'src/common/initializers/logger';

const prisma = new PrismaClient();

const main = async () => {
	logger.info('Seeding started');

	const refId = 'auth0|6670f1c394d1babea1593c36';
	const email = 'test@shoplog.com';

	await prisma.user.upsert({
		where: { refId },
		update: {},
		create: {
			refId,
			email,
			emailVerified: true,
		},
	});

	logger.info(`User ${email} seeded`);
};

main()
	.then(async () => {
		await prisma.$disconnect();
		logger.info('Seeding completed');
	})
	.catch(async (e) => {
		logger.error(e, 'Seeding failed');
		await prisma.$disconnect();
		process.exit(1);
	});
