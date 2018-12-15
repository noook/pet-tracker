/**
 * @service alerts
 * @description Alerts management
 */

const
	moment = require('moment'),
	$db = require.main.require('./database');

class Alerts {
	create(data) {
		const date = moment(data.date);
		const values = {
			hour_from: date.hours(data.interval.from).toDate(),
			hour_to: date.hours(data.interval.to).toDate(),
			date: date.toDate(),
			caller: data.email,
			animal: data.animal,
			address: data.where.address,
			health: data.health,
			state: 'ALERTED',
			collar: data.collar,
			color: data.color,
		};
		return $db
			.insert(values)
			.into('alerts')
			.then(rows => ({
				code: 201,
				data: values,
			}))
			.catch(err => ({
				code: 500,
			}));
	}
}

module.exports = new Alerts();