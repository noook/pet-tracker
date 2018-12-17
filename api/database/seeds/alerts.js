
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('alerts').del()
    .then(function () {
      // Inserts seed entries
      return knex('alerts').insert([
        {
          date: '2016-12-27 14:00:00+01',
          hour_from: '2016-12-27 10:00:00+01',
          hour_to: '2016-12-27 11:00:00+01',
          caller: 'garfield@lovesyou.com',
          animal: 'CAT',
          color: 'Noir',
          address: '21 rue de Rivoli',
          city: 'Paris',
          zipcode: '75004',
          health: 'VERY_LOW',
          state: 'CANCELED',
          collar: false,
        },
        {
          date: '2016-12-27 14:00:00+01',
          hour_from: '2016-12-27 14:00:00+01',
          hour_to: '2016-12-27 15:00:00+01',
          caller: 'scooby@doo.com',
          animal: 'DOG',
          color: 'Boxer',
          address: '24 Rue de Chazelles',
          city: 'Paris',
          zipcode: '75017',
          health: 'GOOD',
          state: 'ALERTED',
          collar: true,
        },
        {
          date: '2016-12-23 14:00:00+01',
          hour_from: '2016-12-23 18:00:00+01',
          hour_to: '2016-12-23 19:00:00+01',
          caller: 'felix@lechat.com',
          animal: 'CAT',
          color: 'Roux',
          address: '5 rue Charles Marie Widor',
          city: 'Paris',
          zipcode: '75016',
          health: 'LOW',
          state: 'SAVED',
          collar: false,
        },
        {
          date: '2016-12-25 14:00:00+01',
          hour_from: '2016-12-23 20:00:00+01',
          hour_to: '2016-12-23 21:00:00+01',
          caller: 'philou@leperroquet.fr',
          animal: 'PARROT',
          color: 'Mixte',
          address: '6 rue Gutenberg',
          city: 'Boulogne-Billancourt',
          zipcode: '92100',
          health: 'GOOD',
          state: 'ALERTED',
          collar: false,
        },
      ]);
    });
};
