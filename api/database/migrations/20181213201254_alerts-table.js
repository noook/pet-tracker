exports.up = function(knex, Promise) {
  return knex.schema.hasTable('alerts')
    .then(exists => {
      if (!exists) {
        return knex.schema.createTable('alerts', table => {
          table.increments('id');
          table.datetime('date');
          table.datetime('hour_from');
					table.datetime('hour_to');
					table.string('caller');
					table.enu('animal', ['CAT', 'DOG', 'PARROT', 'RABBIT']);
					table.string('color');
					table.string('address');
					table.enu('health', ['VERY_LOW', 'LOW', 'MEDIUM', 'GOOD']);
					table.boolean('collar');
					table.enu('state', ['ALERTED', 'ASSIGNED', 'SAVED', 'FAILED', 'CANCELED']);
          table.timestamp('created_at').defaultTo(knex.fn.now());
        });
      }
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('alerts');
};