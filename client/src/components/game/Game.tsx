import parse from "html-react-parser"
import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Spinner from "react-bootstrap/Spinner"
import { useDispatch, useSelector } from "react-redux"
import { getGame, updateRemainingPlayers } from "../../store/game/GameActions"
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
    const check: any = setInterval(()=>{fetchGame()}, 2000)
    setGameStartCheckId(check)
    return (() => {
      clearInterval(gameStartCheckId)
    })
  }, [])
  
  // Start polling to see if game is going to start
  const fetchGame = () => {
    dispatch(getGame(gameState.gameId))
  }

  // Helper function that takes a JSON date and compares it to the current date to calculate the number of seconds before a new round starts
  const calculateSecondsUntilDate = (date: Date): number => {
    // Calculate time until next round starts
    const currentTime = Date.now()
    // Get the the string of the JSONified date, create a date object with tat string and then get the value
    const roundStartTime = new Date(JSON.parse(JSON.stringify(date))).valueOf()
    // convert to seconds, rounded up to whole number
    return Math.ceil((Math.max(0, roundStartTime - currentTime)) / 1000)
  }

  // Component that shows the remaining time before a game starts
  const GameStartCountdown = ({startTime, countdownTimer}: any) => {
    const [shouldCountdownTimerBeCancelled, setShouldCountdownTimerBeCancelled] = useState(false)
    useEffect(() => {
      if (shouldCountdownTimerBeCancelled) {
        clearInterval(countdownTimer)
        fetchGame()
      }
    }, [shouldCountdownTimerBeCancelled])

    // If the game is starting, then stop the interval timer and get the new game state
    if (startTime <= 0 && !shouldCountdownTimerBeCancelled) {
      setShouldCountdownTimerBeCancelled(true)
    }
    let plural = "seconds"
    if (startTime === 1) {
      plural = "second"
    }
    return (
      <div className="round-start mb-5">
        {gameState.isWaitingForNextRound ? `Game starting in ${startTime} ${plural}` : ""}
      </div>
    )
  }

  // The waiting area component
  const WaitingArea = ({gameStartCheckId, gameState}: any) => {
    const [shouldGameStartCheckIdBeCancelled, setShouldGameStartCheckIdBeCancelled] = useState(false)
    const [countdownTimer, setCountdownTimer] = useState(0)
    const [startTime, setStartTime] = useState<number>(12)

    useEffect(() => {
      if (shouldGameStartCheckIdBeCancelled) {
        clearInterval(gameStartCheckId)
        const countdownTimer: any = setInterval(()=>{setStartTime(calculateSecondsUntilDate(gameState.timeOfNextRound))}, 1000)
        setCountdownTimer(countdownTimer)
      }
      return () => {
        clearInterval(countdownTimer)
      }
    }, [shouldGameStartCheckIdBeCancelled])
  
    // If game is waiting for players, but going to start shortly, stop interval that was looking for game state
    if (gameState.isWaitingForNextRound && !shouldGameStartCheckIdBeCancelled) {
      setShouldGameStartCheckIdBeCancelled(true)
    }
  
    const required = (gameState.requiredToStart !== undefined && gameState.totalUsers !== undefined) ? Math.min(0, gameState.requiredToStart - gameState.totalUsers) : 0
    return (
      <div className="waiting-container">
        <div className="mb-3">
          {`You are Player #${gameState.userId}`}
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

  // Component that shows the remaining time before a game starts
  const TimeToAnswerCountdown = ({startTime, countdownTimer}: any) => {
    const [shouldCountdownTimerBeCancelled, setShouldCountdownTimerBeCancelled] = useState(false)
    useEffect(() => {
      if (shouldCountdownTimerBeCancelled) {
        clearInterval(countdownTimer)
        fetchGame()
      }
    }, [shouldCountdownTimerBeCancelled])

    // If the game is starting, then stop the interval timer and get the new game state
    if (startTime <= 0 && !shouldCountdownTimerBeCancelled) {
      setShouldCountdownTimerBeCancelled(true)
    }
    let plural = "seconds"
    if (startTime === 1) {
      plural = "second"
    }

    // TODO: change color based on how much time is left
    return (
      <div className="round-start mb-5">
        {`${startTime} ${plural} left to answer!`}
      </div>
    )
  }

  const Answers = ({gameState}: any) => {
    // default to none of the choices selected
    const [selectedAnswer, setSelectedAnswer] = useState("")
    const handleChange = (event: any) => {
      setSelectedAnswer((event.target.id as string).substr(7))
    }

    const toDisplay: any[] = []
    gameState.allCurrentAnswersShuffled.forEach((answer: string, index: number) => {

      // determine whether to show correct/incorrect answers
      let answerBorder = ""
      if (gameState.hasSubmittedAnswer) {
        answerBorder = "answer-border-wrong"
        if (answer === gameState.currentCorrectAnswer) {
          answerBorder = "answer-border-correct"
        }
      }

      toDisplay.push(
        <div key={`answer-${index}`} className={`${answerBorder} mb-3 px-3`}>
          <Form.Check 
            type="radio"
            id={`answer-${index}`}
            label={`${parse(answer)}`}
            className="answer"
            disabled={gameState.hasSubmittedAnswer}
            onChange={handleChange}
            checked={selectedAnswer === `${index}`}
          />
        </div>
      )
    })
    return (
      <>
        <Form>
          <div key={"answer-form"}>
            {toDisplay}
          </div>
        </Form>
        <UpdateRemainingPlayersButton gameState={gameState} selectedAnswer={selectedAnswer} />
      </>
    )
  }

  const UpdateRemainingPlayersButton = ({gameState, selectedAnswer}: any) => {
    const [requestUpdateRemainingPlayers, setRequestUpdateRemainingPlayers] = useState(false)
    const handleClick = () => {
      setRequestUpdateRemainingPlayers(true)
    }

    useEffect(() => {
      // Only make a call to remove the player if it is the wrong answer
      const isWrong = gameState.allCurrentAnswersShuffled[selectedAnswer] !== gameState.currentCorrectAnswer

      if (requestUpdateRemainingPlayers) {
        dispatch(updateRemainingPlayers(gameState.gameId, gameState.userId, isWrong))
      }
    }, [requestUpdateRemainingPlayers])

    return (
      <Button
        className="mt-5"
        variant="primary"
        size="lg"
        onClick={!gameState.hasSubmittedAnswer ? () => {handleClick()} : undefined}
        disabled={gameState.hasSubmittedAnswer}
      >
        {gameState.isUpdatingRemainingPlayers ? "Submitting..." : "Submit Answer"}
      </Button>
    )
  }

  // The question area component
  const QuestionArea = ({gameState}: any) => {
    const [countdownTimer, setCountdownTimer] = useState(0)
    const [startTime, setStartTime] = useState<number>(12)

    useEffect(() => {
        const countdownTimer: any = setInterval(()=>{setStartTime(calculateSecondsUntilDate(gameState.timeOfNextRound))}, 1000)
        setCountdownTimer(countdownTimer)
        return () => {
          clearInterval(countdownTimer)
        }
    }, [])

    return (
      <div className="waiting-container">
        <div>
          {`Round ${gameState.currentRound}`}
        </div>
        <div className="mb-3">
          {`${parse(gameState.currentQuestion)}`}
        </div>
        <TimeToAnswerCountdown startTime={startTime} countdownTimer={countdownTimer}/>
        <Answers gameState={gameState}/>
      </div>
    )
  }
  
  if (gameState.status === GameStatus.Waiting) {
    return <WaitingArea gameStartCheckId={gameStartCheckId} gameState={gameState} />
  } else if (gameState.status === GameStatus.Started) {
    return <QuestionArea gameState={gameState} />
  }
  return null
}

export default Game