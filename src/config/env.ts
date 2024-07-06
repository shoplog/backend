import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const schema = z.object({
	NODE_ENV: z.string().min(1).default('development'),
	TZ: z.string().min(1).default('UTC'),
	HTTP_PORT: z.string().min(1).transform(Number).default('8080'),
});

const { success, error, data } = schema.safeParse(process.env);

if (!success) {
	throw error;
}

const CONFIG = {
	environment: data.NODE_ENV,
	server: {
		timezone: data.TZ,
		port: data.HTTP_PORT,
	},
};

export { CONFIG };
