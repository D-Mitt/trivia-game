import React, { useCallback, useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { NIL as NIL_UUID } from "uuid"
import { createNewGame } from "../../store/game/GameActions"
import { State } from "../../store/store"
import "../../stylesheets/home.css"

const End = () => {
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
    const [requestCreateNewGame, setRequestCreateNewGame] = useState(false)
    const handleClick = useCallback(() => {
      setRequestCreateNewGame(true)
    }, [requestCreateNewGame])

    useEffect(() => {
      if (requestCreateNewGame) {
        dispatch(createNewGame())
      }
    }, [requestCreateNewGame])

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
      <div className="mt-5 alerting">
        Oh no, you lost!
      </div>
      <div className="description mt-3">
        Compete with other players to see who can correctly answer the most questions.
      </div>
      <div className="description mt-3">
       Play again?
      </div>
      <FindGameButton />
    </div>
  )
}

export default End