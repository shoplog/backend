import { setupApp } from '~/routes';

const port = 3000;
const app = setupApp();

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
