const
	express = require('express'),
	{ $squads } = require.main.require('./services'),
	app = express.Router();

app.get('/', async (req, res, next) => {
	const { code, data } = await $squads.getAll();
	res.status(code).send(data);
});

module.exports = app;
