import nock from 'nock';
import { CONFIG } from 'src/common/config/env';
import { JWKPair } from 'tests/utils/jwt';

beforeAll(() => {
	const issuer = CONFIG.auth0.issuerBaseURL;
	const jwksUri = '/.well-known/jwks.json';
	const discoveryUri = '/.well-known/openid-configuration';

	nock(issuer)
		.persist()
		.get(jwksUri)
		.times(Infinity)
		.reply(200, { keys: [{ kid: JWKPair.kid, ...JWKPair.public }] })
		.get(discoveryUri)
		.times(Infinity)
		.reply(200, {
			issuer,
			jwks_uri: (issuer + jwksUri).replace('//.well-known', '/.well-known'),
		});
});

beforeEach(() => {});

afterEach(() => {});

afterAll(() => {
	nock.cleanAll();
	nock.restore();
});
