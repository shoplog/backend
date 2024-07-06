import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const schema = z.object({
	NODE_ENV: z.string().min(1).default('development'),
	TZ: z.string().min(1).default('UTC'),
	HTTP_PORT: z.string().min(1).default('8080').transform(Number),
	LOG_LEVEL: z.string().min(1).default('debug'),
	LOG_PRINT_PRETTY: z.string().min(1).default('true').transform(Boolean),
});

const { success, error, data } = schema.safeParse(process.env);

if (!success) {
	throw error;
}

const CONFIG = {
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
