import { loadDependencies } from 'src/api/global';
import { createApp } from 'src/api/setup';
import { CONFIG } from 'src/common/config/env';
import { logger } from 'src/common/initializers/logger';
import { MainDatabase } from 'src/data/main/database';
import { createVPICDatabase } from 'src/data/vpic/database';

async function main() {
	const port = CONFIG.server.port;
	const vpicDatabase = createVPICDatabase(CONFIG.mssql.port);
	const dependencies = loadDependencies(vpicDatabase, MainDatabase);
	const app = await createApp(dependencies);

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
