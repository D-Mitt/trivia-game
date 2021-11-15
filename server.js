const express = require('express')
const uuid = require('uuid')
const cors = require("cors")
const db = require('./models/index.js');

const app = express()
const port = 5000

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  console.log(`Production ready`)
  app.use(express.static("client/build"))
}

app.use(cors())

app.post('/games', function (req, res) {
  let newGame = {
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
    requiredToStart: 2
  }

  db.Game.create(newGame)
    .then(data => {
      console.log("data: ", data)
      let toReturn = {
        ...newGame,
        userId: 1,
      }
      console.log("hihihi: ", toReturn)
      delete toReturn.nextUserId
      console.log("toReturn: ", toReturn)
      return res.status(201).json(toReturn).end()
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating the Game."
      })
    })
})

app.listen(process.env.PORT || port, () => {
  console.log(`Server started!`)
})