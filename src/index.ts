import { CONFIG } from 'src/config/env';
import { setupApp } from 'src/routes';

const port = CONFIG.server.port;
const app = setupApp();

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
