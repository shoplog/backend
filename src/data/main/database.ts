import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { CONFIG } from 'src/common/config/env';
import { logger } from 'src/common/initializers/logger';
import { DB } from 'src/data/main/main-db';

const dialect = new PostgresDialect({
	pool: new Pool({
		host: CONFIG.postgres.host,
		port: CONFIG.postgres.port,
		database: CONFIG.postgres.database,
		user: CONFIG.postgres.user,
		password: CONFIG.postgres.password,
		min: CONFIG.postgres.pool.min,
		max: CONFIG.postgres.pool.max,
	}),
});

export const MainDatabase = new Kysely<DB>({
	dialect,
	log: (event) => {
		if (event.level === 'error') {
			logger.error(event.error, event.query.sql, event.query, event.queryDurationMillis);
		}

		if (event.level === 'query') {
			logger.debug(event.query.sql, event.query, event.queryDurationMillis);
		}
	},
});

export type MainDatabase = typeof MainDatabase;
export type MainTables = keyof DB;
