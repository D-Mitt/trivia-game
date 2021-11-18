const express = require("express")
const uuid = require("uuid")
const cors = require("cors")
const db = require("./models/index.js");
const axios = require("axios")

const app = express()
const port = 5000
const roundLength = 12000

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
      timeOfNextRound: new Date(Date.now() + roundLength)
    },
    { returning: true, where: { gameId: gameObject.gameId }// updated for multiplayer req.params.gameId }
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
      // if no remaining users, or 1 remaining user, end game
      if (data.dataValues.remainingUsers.length <= 0) { //Change to 1
        return db.Game.update(
          { 
            status: "DONE", 
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
          timeOfNextRound: new Date(Date.now() + roundLength)
        },
        { returning: true, where: { gameId: gameId }// updated for multiplayer req.params.gameId }
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

app.post('/games', function (req, res) {
  let newGame = {
    gameId: uuid.v4(),
    nextUserId: 2,
    isWaitingForNextRound: true, //Change this to false for multiplayer
    timeOfNextRound: new Date(Date.now() + roundLength),// change this to new Date(), for multiplayer
    currentRound: 0,
    currentQuestion: "",
    currentIncorrectAnswers: [],
    currentCorrectAnswer: "",
    status: "WAITING",
    totalUsers: 1,
    remainingUsers: [1],
    requiredToStart: 1 // Change this to 2 for multiplayer
  }

  db.Game.create(newGame)
    .then(() => {
      let toReturn = {
        ...newGame,
        userId: 1,
      }
      delete toReturn.nextUserId

      // Change the game data with 2 seconds to spare so that people joining late won't have issues
      setTimeout(setGameStarted, roundLength - 2000, toReturn)

      return res.status(201).json(toReturn).end()
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

app.post('/games/:gameId/remainingPlayers/:userId', function (req, res) {
  db.Game.findOne({ where: { gameId: req.params.gameId } })
    .then((data) => {
      //remove userId from remaining user list
      const isNotUserId = (value) => { 
        return value.toString() !== req.params.userId 
      }

      let newRemainingUser = data.dataValues.remainingUsers.filter(isNotUserId)
      return db.Game.update(
        { 
          remainingUsers: newRemainingUser, 
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