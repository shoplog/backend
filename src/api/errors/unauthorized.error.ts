import { HttpError } from 'src/api/errors';

export class UnauthorizedHttpError extends HttpError {
	constructor(message: string, data?: Record<string, unknown>) {
		super('UNAUTHORIZED', 401, message, data);
	}
}
