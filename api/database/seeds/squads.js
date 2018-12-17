
exports.seed = function(knex, Promise) {
  return knex('squads').del()
    .then(function () {
      return knex('squads').insert([
        {name: '75015-A'},
        {name: '75015-B'},
        {name: '75002'},
        {name: '75001'},
        {name: '75006-C'},
      ]);
    });
};
