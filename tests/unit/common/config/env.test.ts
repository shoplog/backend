import { CONFIG } from 'src/common/config/env';

describe('config/env', () => {
	it('should load environment variables', () => {
		expect(CONFIG).not.toBeNil();
	});
});
