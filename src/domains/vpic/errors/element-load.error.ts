import { StandardError } from 'src/common/errors/standard.error';

export class ElementLoadError extends StandardError {
	constructor(elementCode: string, data?: Record<string, unknown>, innerError?: unknown) {
		super(`Failed to load element ${elementCode}`, data, innerError);
	}
}
