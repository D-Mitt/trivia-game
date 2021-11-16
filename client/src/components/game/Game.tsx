import React, { useEffect, useState } from "react"
import Spinner from "react-bootstrap/Spinner"
import { useDispatch, useSelector } from "react-redux"
import { getGame } from "../../store/game/GameActions"
import { GameStatus } from "../../store/game/GameConstants"
import { State } from "../../store/store"
import "../../stylesheets/game.css"

const Game = () => {
  // Set up state
  const gameState = useSelector((state: State) => state.game)
  const dispatch = useDispatch()

  // TODO: consider custom hook
  const [gameStartCheckId, setGameStartCheckId] = useState(0)
  const [shouldGameStartCheckIdBeCancelled, setShouldGameStartCheckIdBeCancelled] = useState(false)
  
  // Start polling to see if game is going to start
  const checkForStart = () => {
    dispatch(getGame(gameState.gameId))
  }  

  useEffect(() => {
    // Anything in here is fired on component mount.
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    const check: any = setInterval(()=>{checkForStart()}, 2000)
    setGameStartCheckId(check)
  }, [])

  useEffect(() => {
    if (shouldGameStartCheckIdBeCancelled) {
      clearInterval(gameStartCheckId)     
    }
  }, [shouldGameStartCheckIdBeCancelled])


  
  // Calculate time until next round starts
  let startTime = 10
  if (gameState.isWaitingForNextRound) {
    if (gameState.status === GameStatus.Waiting) {
      console.log("hihihihihihi: ", gameStartCheckId)
      setShouldGameStartCheckIdBeCancelled(true)
    }
    
    const currentTime = Date.now()
    // Get the the string of the JSONified date, create a date object with tat string and then get the value
    const roundStartTime = new Date(JSON.parse(JSON.stringify(gameState.timeOfNextRound))).valueOf()
    // convert to seconds, rounded up to whole number
    startTime = Math.ceil((Math.min(0, roundStartTime - currentTime)) / 1000)
  }

  if (gameState.status === GameStatus.Waiting) {
    const required = Math.min(0, gameState.requiredToStart - gameState.totalUsers)
    return (
      <div className="waiting-container">
        <div className="mb-3">
          {`You are Contestant #${gameState.userId}`}
        </div>
        <div className="round-start mb-5">
          {gameState.isWaitingForNextRound ? `Game starting in ${startTime} seconds` : ""}
        </div>
        <div className="d-flex">
          <div>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
          <div className="waiting-message">
            {`Waiting for at least ${required} more...`}
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default Game