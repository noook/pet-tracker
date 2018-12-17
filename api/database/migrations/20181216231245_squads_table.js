exports.up = function(knex, Promise) {
  return knex.schema.hasTable('squads')
    .then(exists => {
      if (!exists) {
        return knex.schema.createTable('squads', table => {
          table.increments('id');
					table.string('name');
        });
      }
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('squads');
};