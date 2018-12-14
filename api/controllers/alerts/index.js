const
	express = require('express'),
	{ $alerts } = require.main.require('./services'),
	app = express.Router();

app.post('/', (req, res, next) => {
	$alerts.create(req.body)
		.then(({ code, data }) => res.status(code).send(data))
		.catch(({ code }) => res.status(code).send());
});

module.exports = app;
