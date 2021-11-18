'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Games',
      'isSolo',
      Sequelize.BOOLEAN
    )
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'Games',
      'isSolo'
    )
  }
}