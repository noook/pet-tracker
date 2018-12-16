
exports.up = function(knex, Promise) {
	return knex.schema.hasTable('alerts')
		.then(exists => {
			console.log(exists);
			if (exists) {
				return knex.schema.table('alerts', function(table) {
					table.string('zipcode', 5);
					table.string('city');
				});
			}
		});
};

exports.down = function(knex, Promise) {
	return knex.schema.hasTable('alerts')
		.then(exists => {
			if (exists) {
				return knex.schema.table('alerts', function(table) {
					table.dropColumns('zipcode', 'city');
				});
			}
		});
};
