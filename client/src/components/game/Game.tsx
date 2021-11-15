import React from "react"
import Spinner from "react-bootstrap/Spinner"
import { useSelector } from "react-redux"
import { GameStatus } from "../../store/game/GameConstants"
import { State } from "../../store/store"
import "../../stylesheets/game.css"

const Game = () => {
  // Set up state
  const gameState = useSelector((state: State) => state.game)

  if (gameState.status === GameStatus.Waiting) {
    const required = gameState.requiredToStart - gameState.totalUsers
    return (
      <div className="waiting-container d-flex">
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
        <div className="waiting-message">
          {`Waiting for at least ${required} more...`}
        </div>
      </div>
    )
  }

  return null
}

export default Game