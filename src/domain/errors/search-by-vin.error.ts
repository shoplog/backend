import { StandardError } from 'src/common/errors/standard.error';

export class SearchByVinError extends StandardError {
	constructor(message: string, data?: Record<string, unknown>, innerError?: unknown) {
		super(message, data, innerError);
	}
}
