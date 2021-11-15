'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gameId: {
        type: Sequelize.UUID
      },
      nextUserId: {
        type: Sequelize.INTEGER
      },
      isWaitingForNextRound: {
        type: Sequelize.BOOLEAN
      },
      timeOfNextRound: {
        type: Sequelize.DATE
      },
      currentRound: {
        type: Sequelize.INTEGER
      },
      currentQuestion: {
        type: Sequelize.STRING
      },
      currentCorrectAnswer: {
        type: Sequelize.STRING
      },
      currentIncorrectAnswers: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      status: {
        type: Sequelize.STRING
      },
      totalUsers: {
        type: Sequelize.INTEGER
      },
      remainingUsers: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      requiredToStart: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Games');
  }
};