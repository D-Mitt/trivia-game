const express = require('express')
const uuid = require('uuid')
const cors = require("cors")
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
    userId: 0,
    isWaitingForNextRound: false,
    timeOfNextRound: new Date(),
    currentRound: 0,
    currentQuestion: "",
    currentAnswers: [],
    status: "WAITING",
    totalUsers: 1,
    remainingUsers: [1],
    requiredToStart: 2
  }
  res.status(201).json(newGame).end()
})

app.listen(process.env.PORT || port, () => {
  console.log(`Server started!`)
})