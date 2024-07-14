import { HttpError } from 'src/api/errors';

export class UnauthorizedHttpError extends HttpError {
	static readonly code = 'err.http.unauthorized';
	constructor(message?: string, data?: Record<string, unknown>, innerError?: unknown) {
		super(UnauthorizedHttpError.code, message ?? 'Unauthorized', data, innerError);
	}
}
