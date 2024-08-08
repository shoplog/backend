import { StandardError } from 'src/common/errors/standard.error';

export class ResourceNotFoundError extends StandardError {
	constructor(resource: string, data?: Record<string, unknown>, innerError?: unknown) {
		super(`Resource ${resource} not found`, data, innerError);
	}
}
