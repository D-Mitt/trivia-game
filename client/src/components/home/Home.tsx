import React, { useCallback, useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { NIL as NIL_UUID } from "uuid"
import { createNewSoloGame, joinMultiplayerGame } from "../../store/game/GameActions"
import { State } from "../../store/store"
import "../../stylesheets/home.css"

// The landing page of the app
const Home = () => {
  // Set up state
  const dispatch = useDispatch()
  const isSearchingForGame = useSelector((state: State) => state.game.isSearchingForGame)
  const isCreatingSoloGame = useSelector((state: State) => state.game.isCreatingSoloGame)
  const gameId = useSelector((state: State) => state.game.gameId)

  // We found a game
  if (gameId !== NIL_UUID) {
    return <Navigate to={`/games/${gameId}`} />
  }
  
  // Component that finds or starts a new multiplayer game
  const FindGameButton = ({classes}: any) => {
    const [requestJoinMultiplayerGame, setRequestJoinMultiplayerGame] = useState(false)
    const handleClick = useCallback(() => {
      setRequestJoinMultiplayerGame(true)
    }, [requestJoinMultiplayerGame])

    useEffect(() => {
      if (requestJoinMultiplayerGame) {
        dispatch(joinMultiplayerGame())
      }
    }, [requestJoinMultiplayerGame])

    return (
      <Button
        className={`${classes} mt-5`}
        variant="success"
        size="lg"
        onClick={!isSearchingForGame ? () => {handleClick()} : undefined}
        disabled={isSearchingForGame || isCreatingSoloGame}
      >
        {isSearchingForGame ? "Searching..." : "Find a Game"}
      </Button>
    )
  }

  // Component that starts a solo game
  const SoloGameButton = ({classes}: any) => {
    const [requestCreateNewSoloGame, setRequestCreateNewSoloGame] = useState(false)
    const handleClick = useCallback(() => {
      setRequestCreateNewSoloGame(true)
    }, [requestCreateNewSoloGame])

    useEffect(() => {
      if (requestCreateNewSoloGame) {
        dispatch(createNewSoloGame())
      }
    }, [requestCreateNewSoloGame])

    return (
      <Button
        className={`${classes} mt-5`}
        variant="success"
        size="lg"
        onClick={!isCreatingSoloGame ? () => {handleClick()} : undefined}
        disabled={isSearchingForGame || isCreatingSoloGame}
      >
        {isCreatingSoloGame ? "Creating..." : "Solo Game"}
      </Button>
    )
  }

  return (
    <div>
      <div className="title mt-5">
        Welcome to the Trivia Quiz!
      </div>
      <div className="description mt-3">
        Compete with other players to see who can correctly answer the most questions.
      </div>
      <div className="description mt-3">
        Find a game below!
      </div>
      <div>
        <FindGameButton classes={"first-button"} />
        <SoloGameButton classes={""} />
      </div>
      <ul className="rules mt-5 mx-3 d-flex">
        <li>When the game begins, you will have 12 seconds to answer a multiple choice question.</li>
        <li>After submitting your answer the correct answer will be displayed in <span className="green">green</span>.</li>
        <li>Ties count as a loss (sorry!)</li>
      </ul>
    </div>
  )
}

export default Home