import { Kysely, MssqlDialect } from 'kysely';
import { CONFIG } from 'src/common/config/env';
import { logger } from 'src/common/initializers/logger';
import { vPICList_Lite1 } from 'src/data/vpic/vpic-db';
import * as tarn from 'tarn';
import * as tedious from 'tedious';

const dialect = new MssqlDialect({
	tarn: {
		...tarn,
		options: {
			min: 0,
			max: 10,
			log: (message) => {
				logger.debug(message);
			},
		},
	},
	tedious: {
		...tedious,
		connectionFactory: () =>
			new tedious.Connection({
				authentication: {
					options: {
						userName: CONFIG.mssql.user,
						password: CONFIG.mssql.password,
					},
					type: 'default',
				},
				options: {
					database: CONFIG.mssql.database,
					port: 1433,
					trustServerCertificate: true,
				},
				server: CONFIG.mssql.host,
			}),
	},
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const VPICDatabase = new Kysely<vPICList_Lite1>({
	dialect,
});
