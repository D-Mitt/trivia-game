import React from "react"
import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { NIL as NIL_UUID } from "uuid"
import { createNewGame } from "../../store/game/GameActions"
import { State } from "../../store/store"
import "../../stylesheets/home.css"

const Home = () => {
  // Set up state
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSearchingForGame = useSelector((state: State) => state.game.isSearchingForGame)
  const gameId = useSelector((state: State) => state.game.gameId)

  const handleClick = () => {
    dispatch(createNewGame())
  }

  // We found a game
  if (gameId !== NIL_UUID) {
    navigate(`/games/${gameId}`)
  }

  return (
    <div>
      <div className="title mt-5">
        Welcome to the Math Quiz!
      </div>
      <div className="description mt-3">
        Compete with other players to see who can correctly answer the most consecutive math questions.
      </div>
      <div className="description mt-3">
        Find a game below!
      </div>
      <Button
        className="mt-5"
        variant="primary"
        size="lg"
        onClick={!isSearchingForGame ? handleClick : undefined}
        disabled={isSearchingForGame}
      >
        {isSearchingForGame ? "Searching..." : "Find a Game"}
      </Button>
    </div>
  )
}

export default Home