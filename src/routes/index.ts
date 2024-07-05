import express from 'express';

export const setupApp = () => {
	const app = express();

	app.get('/', (req, res) => {
		res.status(200).send('Ok!');
	});

	return app;
};
