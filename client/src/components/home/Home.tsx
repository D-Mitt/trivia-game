import React, { useCallback, useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { NIL as NIL_UUID } from "uuid"
import { createNewSoloGame } from "../../store/game/GameActions"
import { State } from "../../store/store"
import "../../stylesheets/home.css"

const Home = () => {
  // Set up state
  const dispatch = useDispatch()
  const isSearchingForGame = useSelector((state: State) => state.game.isSearchingForGame)
  const gameId = useSelector((state: State) => state.game.gameId)

  // We found a game
  if (gameId !== NIL_UUID) {
    return <Navigate to={`/games/${gameId}`} />
  }
  
  // Component that starts a game
  const FindGameButton = () => {
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
        className="mt-5"
        variant="success"
        size="lg"
        onClick={!isSearchingForGame ? () => {handleClick()} : undefined}
        disabled={isSearchingForGame}
      >
        {isSearchingForGame ? "Searching..." : "Find a Game"}
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
      <FindGameButton />
    </div>
  )
}

export default Home