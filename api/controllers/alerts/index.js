const
	express = require('express'),
	{ $alerts, $mails } = require.main.require('./services'),
	app = express.Router();

app.post('/', (req, res, next) => {
	$alerts.create(req.body)
		.then(({ code, data }) => {
			res.status(code).send(data);
			console.log(process.env.MODE);
			if (process.env.MODE === 'production') {
				$mails.notifyNewAlert(data);
			}
		})
		.catch(({ code }) => res.status(code).send());
});

module.exports = app;
