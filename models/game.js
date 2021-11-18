'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Game.init({
    gameId: DataTypes.UUID,
    nextUserId: DataTypes.INTEGER,
    isWaitingForNextRound: DataTypes.BOOLEAN,
    timeOfNextRound: DataTypes.DATE,
    currentRound: DataTypes.INTEGER,
    currentQuestion: DataTypes.STRING,
    currentIncorrectAnswers: DataTypes.ARRAY(DataTypes.STRING),
    currentCorrectAnswer:DataTypes.STRING,
    status: DataTypes.STRING,
    totalUsers: DataTypes.INTEGER,
    remainingUsers: DataTypes.ARRAY(DataTypes.STRING),
    requiredToStart: DataTypes.INTEGER,
    isSolo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};