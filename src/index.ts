import { createApp } from 'src/api/setup';
import { CONFIG } from 'src/common/config/env';
import { logger } from 'src/common/initializers/logger';

async function main() {
	const port = CONFIG.server.port;
	const app = await createApp();

	app.listen(port, () => {
		logger.info(`Server is listening on http://localhost:${port}`);
	});
}

main()
	.then(async () => {
		logger.info('Server started');
	})
	.catch(async (e) => {
		console.error(e);
		logger.error(e, 'Server failed to start');
		process.exit(1);
	});
