import nock from 'nock';
import { CONFIG } from 'src/common/config/env';
import { StartedTestContainer } from 'testcontainers';
import { getVpicMssqlContainer } from 'tests/containers';
import { JWKPair } from 'tests/utils/jwt';

let vpicContainer: StartedTestContainer;

beforeAll(async () => {
	const issuer = CONFIG.auth0.issuerBaseURL;
	const jwksUri = '/.well-known/jwks.json';
	const discoveryUri = '/.well-known/openid-configuration';
	vpicContainer = await getVpicMssqlContainer();

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

afterAll(async () => {
	nock.cleanAll();
	nock.restore();

	await vpicContainer?.stop();
});

export { vpicContainer };
