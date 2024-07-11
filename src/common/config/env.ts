import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const schema = z.object({
	NODE_ENV: z.string().min(1).default('development'),
	TZ: z.string().min(1).default('UTC'),
	HTTP_PORT: z.string().min(1).default('8080').transform(Number),
	LOG_LEVEL: z.string().min(1).default('debug'),
	LOG_PRINT_PRETTY: z.string().min(1).default('true').transform(Boolean),
	AUTH0_ISSUER: z.string().min(1),
	AUTH0_AUDIENCE: z.string().min(1),
	SQL_SERVER_HOST: z.string().min(1),
	SQL_SERVER_NAME: z.string().min(1),
	SQL_SERVER_PORT: z.string().min(1),
	SQL_SERVER_USER: z.string().min(1),
	SQL_SERVER_PASSWORD: z.string().min(1),
});

const { success, error, data } = schema.safeParse(process.env);

if (!success) {
	throw error;
}

const CONFIG = {
	auth0: {
		issuerBaseURL: data.AUTH0_ISSUER,
		audience: data.AUTH0_AUDIENCE,
	},
	mssql: {
		host: data.SQL_SERVER_HOST,
		database: data.SQL_SERVER_NAME,
		port: data.SQL_SERVER_PORT,
		user: data.SQL_SERVER_USER,
		password: data.SQL_SERVER_PASSWORD,
	},
	environment: data.NODE_ENV,
	logging: {
		level: data.LOG_LEVEL,
		printPretty: data.LOG_PRINT_PRETTY,
	},
	server: {
		timezone: data.TZ,
		port: data.HTTP_PORT,
	},
};

export { CONFIG };
