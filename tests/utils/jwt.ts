import { randEmail, randUuid } from '@ngneat/falso';
import { JWK, SignJWT, importJWK } from 'jose';
import { SCOPES } from 'src/api/constants/scopes';
import { CONFIG } from 'src/common/config/env';

type JWKPair = {
	kid: string;
	public: JWK;
	private: JWK;
};

export const JWKPair: JWKPair = {
	kid: 'kid',
	public: {
		kty: 'RSA',
		n: 'yXMF6fiNNNnftIXU-a3nlUdGQNDU6EDYl99cTQisTTG-HGl2Zuy9n09qgQ05VvyvaEaJIpHTx0SlwA1cKFt82L29CXyK0NmVAYIGWX3OId0TkkEWWwRYZx5SxBaiBmhRmMuzdCebx64ao3uIJE1aEuJ9u_lv-wnMP1Q_cBtStDoo-M7NfGpn1SPzCB1-xxwW69EztVVprJc34J48qB4-jT9NbPw7qAOdcbVeLqw-T9umUO1IG0tEKkFRrdz2HqOo3tEN00-qXhMgaxIDTkiCA_FFoyfM6E242ASccwCL3phjpwyjtjuEUWQBEExPwDEcH50UaW2bwaR8ZkDPJ_demQ',
		e: 'AQAB',
	},
	private: {
		kty: 'RSA',
		n: 'yXMF6fiNNNnftIXU-a3nlUdGQNDU6EDYl99cTQisTTG-HGl2Zuy9n09qgQ05VvyvaEaJIpHTx0SlwA1cKFt82L29CXyK0NmVAYIGWX3OId0TkkEWWwRYZx5SxBaiBmhRmMuzdCebx64ao3uIJE1aEuJ9u_lv-wnMP1Q_cBtStDoo-M7NfGpn1SPzCB1-xxwW69EztVVprJc34J48qB4-jT9NbPw7qAOdcbVeLqw-T9umUO1IG0tEKkFRrdz2HqOo3tEN00-qXhMgaxIDTkiCA_FFoyfM6E242ASccwCL3phjpwyjtjuEUWQBEExPwDEcH50UaW2bwaR8ZkDPJ_demQ',
		e: 'AQAB',
		d: 'CYCzCTfv1UvnyRi9FLAW6gxMLJeNS41vii5_qKSdmCCeErII408MnNy-rerFRyyxS450Ppy5bD95QCeBLugt6f19Utq8o6B37nPHP-Z22FMY7r_CQbXhQ7ADAHv-1aWLH9WQGA0cRJ2aZRbZM7kwZA6qFrlsBmAOcfhT68JmMtksBuS1CDOKLWUGJROHd1GijbtDvuyBwoADJtD8O2civO6yGianDRkyxRXonYJNRIrgvO_g3-rRVeT8d-9zC7Aaoe9ZsQZfkF33aJN-DqvPK0WYap2uOYXGMXIhURXVhdB3AlF7id7XuuK4QMn_r0Ro5w917CFWpMFRlLYsnAuRnw',
		p: '8zY0nu13-0LPOwj9QftrgvNZTrAB8zkLwPJXhbPNCAFHlQdexWDgvDARhWm4qz36zv-Z84oR5tXe91vFqISk-bHkHPwTfa30qoMnbVF-W_MJ7HMiGXyoqYqbC794JvNihV3HEvOYoBwkeAHSaQwI3CZhrT7WguJRNEgdiOnmvLM',
		q: '1Aqqv-S61CtiYPUXf21Sb6ujSahvr1b0HvY25Paa-6oyrTBuc7CnbK5aDGghgoVso37RlhXIhKVNVLzWQl6ml31AHFM79c7Wj4gIgoOck4f1k2JHTDmroAgzI4r8ZhtyalT9Xnd_hjPNnzT1_Z6T9_mIf5ZNKypE-DSuh8Q9dYM',
		dp: 'Z4y5pLzYa6sLTkhKg9BG-w8fBAieG-862OCVcQCXmAPrdUEZEZJovNb-br4PeSE_auiapH0xmAWRE-IH6vLmxsT9qXWN2uG4nOyQWdPrp7x3iiuO5ikUKnMwBjV0M6lGViASRThf0DOLN2kXK9CK6SiSR8_MRxeSmV7m7EciDU8',
		dq: 'kUc1sgAe2VtYLiH-lXnrb0NjvwW-b53d6JC9D6a-jQsRaYOzSWSRcW8Ll1CJFQohYuty4afPGMLA9vviuNpsvYI9OKr2e_XZH8IOQo2164bNhMtjGiCxLBYyI3oIcFUB0USly-GH6AT6Lsh0ee36Z336PaBXAuoVExHVOoQDr80',
		qi: 'WeflqthEXoeqvDBX64at65kNuRqguPM5r-ihg5CkgzlbO0kl8ubG-Q7RvEm38Ne_2sNKeNQF2PbZg11Mf7rzAacpGZc2eXr3NNeeNGB5Y1m-MDaoAsoHE484PXUhysOUaAJA74XZ97f9JFTHrJUGNqT5spXzi-iQsl-Wsx7iWT0',
	},
};

interface CreateJWTOptions {
	subject?: string;
	email?: string;
	iat?: number;
	exp?: number;
}

export const createJwt = async (params: CreateJWTOptions = {}): Promise<string> => {
	const issuer = CONFIG.auth0.issuerBaseURL;
	const audience = CONFIG.auth0.audience;
	const payload = { email: params.email ?? randEmail(), email_verified: true, scope: `${SCOPES.VPIC_READ}` };
	const privateKey = await importJWK(JWKPair.private);
	const now = (Date.now() / 1000) | 0;
	const day = 60 * 60 * 24;

	return new SignJWT(payload)
		.setProtectedHeader({
			alg: 'RS256',
			typ: 'JWT',
			kid: JWKPair.kid,
		})
		.setIssuer(issuer)
		.setSubject(params.subject ?? randUuid())
		.setAudience(audience)
		.setIssuedAt(params.iat ?? now)
		.setExpirationTime(params.exp ?? now + day)
		.sign(privateKey);
};
