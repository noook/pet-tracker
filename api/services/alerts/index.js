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
			city: data.where.city,
			zipcode: data.where.zipcode,
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

	edit(data) {
		const date = moment(data.date);
		const id = data.id;
		delete data.id;
		const values = {
			hour_from: date.hours(data.interval.from).toDate(),
			hour_to: date.hours(data.interval.to).toDate(),
			date: date.toDate(),
			caller: data.email,
			animal: data.animal,
			address: data.where.address,
			city: data.where.city,
			zipcode: data.where.zipcode,
			health: data.health,
			state: 'ALERTED',
			collar: data.collar,
			color: data.color,
		};

		return $db
			.from('alerts')
			.where({ id })
			.update(values)
			.then(row => ({
				code: 200
			}))
			.catch(err => ({
				code: 500
			}));
	}

	delete(id) {
		return $db
			.from('alerts')
			.where({ id })
			.del()
			.then(row => ({
				code: 205
			}))
			.catch(err => ({
				code: 500
			}));
	}

	getAll() {
		return $db
			.select('*')
			.from('alerts')
			.orderBy('id', 'desc')
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

	get(id) {
		return $db
			.select('alerts.*', 'squads.name as squad_name')
			.from('alerts')
			.where('alerts.id', id)
			.joinRaw('left join squads on (alerts.assigned_squad IS NOT null AND alerts.assigned_squad = squads.id)')
			.first()
			.then(data => ({
				code: 200,
				data
			}))
			.catch(err => ({
				code: 500,
				data: null,
			}));
	}
}

module.exports = new Alerts();