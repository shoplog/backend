import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const email = 'test@shoplog.com';
	const auth0Id = 'auth0|6670f1c394d1babea1593c36';
	const refId = 'clyc8uuv10000k422c64lpzfh';

	await prisma.user.upsert({
		where: { email },
		update: {},
		create: {
			auth0Id,
			email,
			refId,
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
