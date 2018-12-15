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
			address: `${data.where.address}\n${data.where.zipcode}, ${data.where.city}`,
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

	getAll() {
		return $db
			.select('*')
			.from('alerts')
			.then(rows => {
				const alerts = [];
				rows.forEach(item => {
					const alert = {
						...item,
					}

					delete alert.hour_from;
					delete alert.hour_to;
					delete alert.created_at;

					alerts.push({
						...alert,
						interval: {
							from: item.hour_from,
							to: item.hour_to,
						},
					});
				});
				return {
					code: 200,
					data: alerts,
				};
			})
			.catch(err => ({
				code: 500,
				data: null,
			}));
	}
}

module.exports = new Alerts();