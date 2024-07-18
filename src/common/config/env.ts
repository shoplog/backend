import dotenv from 'dotenv';
import { Type } from '@sinclair/typebox';
import { StringAsBoolean, StringAsNumber } from 'src/common/types/common';
import { Value } from '@sinclair/typebox/value';

dotenv.config();

const schema = Type.Object({
	NODE_ENV: Type.Union([Type.Literal('development'), Type.Literal('test'), Type.Literal('production')]),
	TZ: Type.String({ minLength: 1, default: 'UTC' }),
	HTTP_PORT: StringAsNumber({ minLength: 1, default: '8080' }),
	LOG_LEVEL: Type.Union([
		Type.Literal('silent'),
		Type.Literal('trace'),
		Type.Literal('debug'),
		Type.Literal('info'),
		Type.Literal('warn'),
		Type.Literal('error'),
		Type.Literal('fatal'),
	]),
	LOG_PRINT_PRETTY: StringAsBoolean({ default: 'true' }),
	AUTH0_ISSUER: Type.String({ minLength: 1 }),
	AUTH0_AUDIENCE: Type.String({ minLength: 1 }),
	DB_HOST: Type.String({ minLength: 1 }),
	DB_NAME: Type.String({ minLength: 1 }),
	DB_PORT: Type.String({ minLength: 1 }),
	DB_USERNAME: Type.String({ minLength: 1 }),
	DB_PASSWORD: Type.String({ minLength: 1 }),
	DB_URL: Type.String({ minLength: 1 }),
});

if (!Value.Check(schema, process.env)) {
	throw new Error('Invalid environment variables');
}

const env = Value.Decode(schema, process.env);

const CONFIG = {
	auth0: {
		issuerBaseURL: env.AUTH0_ISSUER,
		audience: env.AUTH0_AUDIENCE,
	},
	mssql: {
		host: env.DB_HOST,
		database: env.DB_NAME,
		port: env.DB_PORT,
		user: env.DB_USERNAME,
		password: env.DB_PASSWORD,
		url: env.DB_URL,
	},
	environment: env.NODE_ENV,
	logging: {
		level: env.LOG_LEVEL,
		printPretty: env.LOG_PRINT_PRETTY,
	},
	server: {
		timezone: env.TZ,
		port: env.HTTP_PORT,
	},
};

export { CONFIG };
