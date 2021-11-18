'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Games',
      'usersWithCorrectAnswer',
      Sequelize.ARRAY(Sequelize.STRING),
    )
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'Games',
      'usersWithCorrectAnswer'
    )
  }
}