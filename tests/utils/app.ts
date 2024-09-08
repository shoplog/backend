import { Express } from 'express';
import { loadDependencies } from 'src/api/global';
import { createApp } from 'src/api/setup';
import { MainDatabase } from 'src/data/main/database';
import { VPICDatabase, createVPICDatabase } from 'src/data/vpic/database';
import supertest from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { vpicContainer } from 'tests/setup';

export type TestFixture = {
	app: Express;
	request: TestAgent;
	vpicDatabase: VPICDatabase;
	destroy: () => Promise<void>;
};

export const createTestFixture = async (): Promise<TestFixture> => {
	const vpicDatabase = createVPICDatabase(vpicContainer.getMappedPort(1433));

	const deps = loadDependencies(vpicDatabase, MainDatabase);
	const app = await createApp(deps);

	return {
		app,
		request: supertest(app),
		vpicDatabase,
		destroy: async () => {
			await vpicDatabase.destroy();
		},
	};
};
