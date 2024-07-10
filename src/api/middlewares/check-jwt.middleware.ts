import { auth } from 'express-oauth2-jwt-bearer';
import { CONFIG } from 'src/common/config/env';

const { audience, issuerBaseURL } = CONFIG.auth0;

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
export const checkJwt = auth({
	audience,
	issuerBaseURL,
});
