const
	express = require('express'),
	{ $alerts, $mails } = require.main.require('./services'),
	app = express.Router();

app.get('/', async (req, res, next) => {
	const { code, data } = await $alerts.getAll();
	res.status(code).send(data);
});

app.get('/:id', async (req, res, next) => {
	const { code, data } = await $alerts.get(req.params.id);
	res.status(code).send(data);
});

app.put('/:id', async (req, res, next) => {
	const { code, data } = await $alerts.update(req.params.id, req.body);
	res.status(code).send(data);
});

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

app.put('/', async (req, res, next) => {
	const { code } = await $alerts.edit(req.body);
	res.status(code).send({});
});

app.delete('/', async (req, res, next) => {
	const { code } = await $alerts.delete(req.body.id);
	res.status(code).send({});
});

module.exports = app;
