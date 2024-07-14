import { UnauthorizedHttpError } from 'src/api/errors';
import { ErrorMap } from 'src/common/errors';
import { getDomainErrorMap } from 'src/domain/errors';

export const Errors: ErrorMap = {
	[UnauthorizedHttpError.code]: 401,
	...getDomainErrorMap(),
};
