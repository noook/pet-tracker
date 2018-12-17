
exports.up = function(knex, Promise) {
	return knex.schema.hasTable('alerts')
		.then(exists => {
			if (exists) {
				return knex.schema.table('alerts', table => {
					table.integer('assigned_squad').unsigned();
					table.foreign('assigned_squad').references('squads.id');
				});
			}
		});
};

exports.down = function(knex, Promise) {
	return knex.schema.hasTable('alerts')
		.then(exists => {
			if (exists) {
				return knex.schema.table('alerts', table => {
					table.dropForeign('assigned_squad');
					table.dropColumn('assigned_squad');
				});
			}
		});
};
