import React, { useEffect, useState } from "react"
import Spinner from "react-bootstrap/Spinner"
import { useDispatch, useSelector } from "react-redux"
import { getGame } from "../../store/game/GameActions"
import { GameStatus } from "../../store/game/GameConstants"
import { State } from "../../store/store"
import "../../stylesheets/game.css"

// Main game view
const Game = () => {
  // Set up game state
  const gameState = useSelector((state: State) => state.game)
  const dispatch = useDispatch()
  const [gameStartCheckId, setGameStartCheckId] = useState(0)

  // On component mount, start interval that checks for game state/status
  useEffect(() => {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    const check: any = setInterval(()=>{checkForStart()}, 2000)
    setGameStartCheckId(check)
    return (() => {
      clearInterval(gameStartCheckId)
    })
  }, [])
  
  // Start polling to see if game is going to start
  const checkForStart = () => {
    dispatch(getGame(gameState.gameId))
  }

  // Helper function that takes a JSON date and compares it to the current date to calculate the number of seconds before a new round starts
  const calculateSecondsUntilRoundStarts = (): number => {
    // Calculate time until next round starts
    const currentTime = Date.now()
    // Get the the string of the JSONified date, create a date object with tat string and then get the value
    const roundStartTime = new Date(JSON.parse(JSON.stringify(gameState.timeOfNextRound))).valueOf()
    // convert to seconds, rounded up to whole number
    return Math.ceil((Math.max(0, roundStartTime - currentTime)) / 1000)
  }

  // Component that shows the remaining time before a game starts
  const GameStartCountdown = ({startTime, countdownTimer}: any) => {
    const [shouldCountdownTimerBeCancelled, setShouldCountdownTimerBeCancelled] = useState(false)
    useEffect(() => {
      if (shouldCountdownTimerBeCancelled) {
        clearInterval(countdownTimer)
      }
    }, [shouldCountdownTimerBeCancelled])

    // If the game is starting, then stop the interval timer and get the new game state
    if (startTime <= 0 && !shouldCountdownTimerBeCancelled) {
      setShouldCountdownTimerBeCancelled(true)
    }
    return (
      <div className="round-start mb-5">
        {gameState.isWaitingForNextRound ? `Game starting in ${startTime} seconds` : ""}
      </div>
    )
  }

  // The waiting area component
  const WaitingArea = ({gameStartCheckId, gameState}: any) => {
    const [shouldGameStartCheckIdBeCancelled, setShouldGameStartCheckIdBeCancelled] = useState(false)
    // const [displayGameStartCountdown, setDisplayGameCountdown] = useState(false)
    const [countdownTimer, setCountdownTimer] = useState(0)
    const [startTime, setStartTime] = useState<number>(10)

    useEffect(() => {
      if (shouldGameStartCheckIdBeCancelled) {
        clearInterval(gameStartCheckId)
        const countdownTimer: any = setInterval(()=>{setStartTime(calculateSecondsUntilRoundStarts())}, 1000)
        setCountdownTimer(countdownTimer)
      }
    }, [shouldGameStartCheckIdBeCancelled])
  
    // If game is waiting for players, but going to start shortly, stop interval that was looking for game state
    if (gameState.isWaitingForNextRound && !shouldGameStartCheckIdBeCancelled && gameState.status === GameStatus.Waiting) {
      setShouldGameStartCheckIdBeCancelled(true)
    }
  
    if (gameState.status === GameStatus.Waiting) {
      const required = (gameState.requiredToStart !== undefined && gameState.totalUsers !== undefined) ? Math.min(0, gameState.requiredToStart - gameState.totalUsers) : 0
      return (
        <div className="waiting-container">
          <div className="mb-3">
            {`You are Contestant #${gameState.userId}`}
          </div>
          <GameStartCountdown startTime={startTime} countdownTimer={countdownTimer}/>
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
  
  return <WaitingArea gameStartCheckId={gameStartCheckId} gameState={gameState} />
}

export default Game