module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('courses', [{
    name: 'Tecnologías y Aplicaciones Web',
    code: 'IIC2513',
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
