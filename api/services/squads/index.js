/**
 * @service squads
 * @description Squads management
 */

const
	moment = require('moment'),
	$db = require.main.require('./database');

class Squads {
	getAll() {
		return $db
			.select('*')
			.from('squads')
			.then(rows => {
				const squads = [];
				rows.forEach(item => squads.push(item.name));;
				return {
					code: 200,
					data: squads
				};
			})
			.catch(err => ({
				code: 500,
				data: null,
			}));
	}
}

module.exports = new Squads();