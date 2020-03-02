'use strict';
const faker = require('faker');

const seedMe = (numbers) => {
  const m = [];
  for ( let i=0; i < numbers; i++) {
    m.push({
      firstname: faker.name.firstName(),
      lastname:  faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber('#############'),
      appointmentDate: faker.date.between('2020-02-28', '2020-12-30'),
      hairDoHours: 10,
      service: 'faker',
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
  return m;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Appointments', seedMe(60));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Appointments', null, {});
  }
};
