import { setupApp } from 'src/api';
import { CONFIG } from 'src/common/config/env';

const port = CONFIG.server.port;
const app = setupApp();

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
