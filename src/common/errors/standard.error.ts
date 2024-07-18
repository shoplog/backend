import { snakeCase } from 'lodash';

/**
 * Standard error class inherited by all custom errors in the application.
 */
export class StandardError extends Error {
	readonly code: string;

	constructor(
		message: string,
		readonly data?: Record<string, unknown>,
		readonly innerError?: unknown
	) {
		super(message);
		this.code = snakeCase(this.constructor.name);
		this.data = data;
		this.innerError = innerError;
	}
}
