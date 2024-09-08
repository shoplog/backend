import { CONFIG } from 'src/common/config/env';
import { GenericContainer, PullPolicy, StartedTestContainer, Wait } from 'testcontainers';

export const getVpicMssqlContainer = async (): Promise<StartedTestContainer> => {
	return await new GenericContainer('helloworld65/vpic-mssql:latest')
		.withExposedPorts(1433)
		.withPullPolicy(PullPolicy.alwaysPull())
		.withReuse()
		.withWaitStrategy(
			Wait.forAll([
				Wait.forLogMessage(
					'Recovery is complete. This is an informational message only. No user action is required.',
					1
				),
			])
		)
		.withEnvironment({
			ACCEPT_EULA: 'Y',
			MSSQL_SA_PASSWORD: CONFIG.mssql.password,
		})
		.start();
};
