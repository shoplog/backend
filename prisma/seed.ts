import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const email = 'test@shoplog.com';
	const id = 'auth0|6670f1c394d1babea1593c36';

	await prisma.user.upsert({
		where: { email },
		update: {},
		create: {
			id,
			email,
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
