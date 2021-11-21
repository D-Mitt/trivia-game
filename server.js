const express = require("express")
const uuid = require("uuid")
const cors = require("cors")
const db = require("./models/index.js");
const axios = require("axios")

const app = express()
const port = 5000
const roundLength = 12000
const soloGameStartTime = 5000

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  console.log(`Production ready`)
  app.use(express.static("client/build"))
}

app.use(cors())

// simple sleep function
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

// todo: MOVE THIS FOR MULTIPLAYER
// Set a timer so that after 10 seconds, we update the game status to "STARTED"
const setGameStarted = async (gameObject) => {
  // Waiting 2 extra seconds for timers to sync (game closes to newcomers 2 seconds before start)
  await sleep(2000)
  const questionData = await getQuestion()

  return db.Game.update(
    { 
      status: "STARTED", 
      isWaitingForNextRound: false, 
      currentRound: 1, 
      currentQuestion: questionData.question, 
      currentCorrectAnswer: questionData.currentCorrectAnswer,
      currentIncorrectAnswers: questionData.currentIncorrectAnswers,
      timeOfNextRound: new Date(Date.now() + roundLength),
      remainingUsers: [],
      usersWithCorrectAnswer: [],
    },
    { returning: true, where: { gameId: gameObject.gameId }
  }).then(function([ rowsUpdate, [updatedGame] ]) {
    setTimeout(setUpNextRound, roundLength, updatedGame.gameId)
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "An error occurred while fetching the Game."
    })
  })
}

const setUpNextRound = async (gameId) => {
  db.Game.findOne({ where: { gameId: gameId } })
    .then(async (data) => {
      // If no remaining users, or 1 remaining user, end game.
      // For solo games, we want it to continue until they lose
      const remainingUsersGameOver = data.dataValues.isSolo ? 0 : 1

      if (data.dataValues.usersWithCorrectAnswer.length <= remainingUsersGameOver) {
        return db.Game.update(
          { 
            status: "DONE",
            remainingUsers: data.dataValues.isSolo ? [] : [...data.dataValues.usersWithCorrectAnswer]
          },
          { where: { gameId: gameId }
        })
      }

      const questionData = await getQuestion()
      return db.Game.update(
        { 
          currentRound: data.dataValues.currentRound + 1, 
          currentQuestion: questionData.question, 
          currentCorrectAnswer: questionData.currentCorrectAnswer,
          currentIncorrectAnswers: questionData.currentIncorrectAnswers,
          timeOfNextRound: new Date(Date.now() + roundLength),
          remainingUsers: [...data.dataValues.usersWithCorrectAnswer],
          usersWithCorrectAnswer: [], // reset who has submitted answers
        },
        { returning: true, where: { gameId: gameId }
      }).then(function([ rowsUpdate, [updatedGame] ]) {
        setTimeout(setUpNextRound, roundLength, updatedGame.gameId)
      })
    })
}

// Questions pulled from Open Trivia DB (https://opentdb.com/)
const getQuestion = async () => {

  // Categories range from 9 - 32
  const category = Math.floor((Math.random() * 23) + 9)
  let questionData = {}
  const url = `https://opentdb.com/api.php?amount=1&category=${category}`
  const response = await axios.get(url)

  questionData.question = response.data.results[0].question
  questionData.currentCorrectAnswer = response.data.results[0].correct_answer
  questionData.currentIncorrectAnswers = response.data.results[0].incorrect_answers

  return questionData
}

// Allows a user to play solo, until they lose
app.post('/soloGames', function (req, res) {
  let newGame = {
    gameId: uuid.v4(),
    nextUserId: 2,
    isWaitingForNextRound: true, //Change this to false for multiplayer
    timeOfNextRound: new Date(Date.now() + soloGameStartTime),// change this to new Date(), for multiplayer
    currentRound: 0,
    currentQuestion: "",
    currentIncorrectAnswers: [],
    currentCorrectAnswer: "",
    status: "WAITING",
    totalUsers: 1,
    remainingUsers: [1],
    requiredToStart: 1, // Change this to 2 for multiplayer
    isSolo: true
  }

  db.Game.create(newGame)
    .then(() => {
      let toReturn = {
        ...newGame,
        userId: 1,
      }
      delete toReturn.nextUserId

      // Change the game data with 2 seconds to spare so that people joining late won't have issues
      setTimeout(setGameStarted, soloGameStartTime - 2000, toReturn)

      return res.status(201).json(toReturn).end()
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating the Game."
      })
    })
})

// Create a game that requires at least one other use to join
app.post('/games', function (req, res) {
  db.Game.findOne({where: { status: "WAITING" }})
  .then((game) => {
    // If no games are in waiting status, make a new one
    if (game === null) {
      const newGame = {
        gameId: uuid.v4(),
        nextUserId: 2,
        isWaitingForNextRound: false,
        timeOfNextRound: new Date(),
        currentRound: 0,
        currentQuestion: "",
        currentIncorrectAnswers: [],
        currentCorrectAnswer: "",
        status: "WAITING",
        totalUsers: 1,
        remainingUsers: [1],
        requiredToStart: 2,
        isSolo: false,
    }
      return db.Game.create(newGame)
      .then(() => {
        return {...newGame, userId: 1}
      })
    }

    // If existing game update nextUserId, remaining users, isWaitingForNextRound, timeOfNextRound
    // Note: Only update time to next round on the addition of the first user that will start the game
    const userId = game.dataValues.nextUserId
    return db.Game.update(
      { 
        nextUserId: game.dataValues.nextUserId + 1,
        isWaitingForNextRound: true, 
        timeOfNextRound: game.dataValues.totalUsers + 1 === game.dataValues.requiredToStart ? new Date(Date.now() + roundLength) : game.dataValues.timeOfNextRound,
        remainingUsers: [...game.dataValues.remainingUsers, userId],
        totalUsers: game.dataValues.totalUsers + 1
      },
      { returning: true, where: { gameId: game.dataValues.gameId }
    })
    .then(function([ rowsUpdate, [updatedGame] ]) {
      // Change the game data with 2 seconds to spare so that people joining late won't have issues
      // Only set the timer if it is the user reaching the required number for starting
      if (updatedGame.dataValues.totalUsers === updatedGame.dataValues.requiredToStart) {
        setTimeout(setGameStarted, roundLength - 2000, updatedGame)
      }
      return {...updatedGame.dataValues, userId: userId}
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating the Game."
      })
    })
  })
  .then((game) => {
    let toReturn = {
      ...game,
    }
    delete toReturn.nextUserId

    return res.status(200).json(toReturn).end()
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "An error occurred while creating the Game."
    })
  })
})

app.get('/games/:gameId', function (req, res) {
  db.Game.findOne({ where: { gameId: req.params.gameId } })
    .then((data) => {
      return res.status(200).json(data.dataValues).end()
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while fetching the Game."
      })
    })
})

// Keep player in the game by adding them to the list of players who answered correctly.
// This list will be transferred to the remaining players list at the end of the round.
app.post('/games/:gameId/remainingPlayers/:userId', function (req, res) {
  db.Game.findOne({ where: { gameId: req.params.gameId } })
    .then((data) => {
      return db.Game.update(
        { 
          usersWithCorrectAnswer: [...data.dataValues.usersWithCorrectAnswer, req.params.userId], 
        },
        { where: { gameId: req.params.gameId }
      })
    })
    .then(() => {
      return res.status(204).end()
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while updating the remaining players"
      })
    })
})

app.listen(process.env.PORT || port, () => {
  console.log(`Server started!`)
})