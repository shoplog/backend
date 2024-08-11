import { loadDependencies } from 'src/api/global';
import { createApp } from 'src/api/setup';
import { MainDatabase } from 'src/data/main/database';
import { VPICDatabase } from 'src/data/vpic/database';

export const createTestApp = async (opts?: { vpicDatabase?: VPICDatabase; mainDatabase?: MainDatabase }) => {
	const deps = loadDependencies(opts?.vpicDatabase ?? VPICDatabase, opts?.mainDatabase ?? MainDatabase);
	const app = await createApp(deps);

	return app;
};
