const
	express = require('express'),
	{ $alerts, $mails } = require.main.require('./services'),
	app = express.Router();

app.post('/', (req, res, next) => {
	$alerts.create(req.body)
		.then(({ code, data }) => {
			res.status(code).send(data);
			if (process.env.MODE === 'production') {
				$mails.notifyNewAlert(data);
			}
		})
		.catch(({ code }) => res.status(code).send());
});

app.get('/', async (req, res, next) => {
	const { code, data } = await $alerts.getAll();
	res.status(code).send(data);
});

module.exports = app;
