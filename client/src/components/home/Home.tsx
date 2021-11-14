import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from "react-redux"
import { createNewGameRequested } from "../../store/home/HomeActions"
import { State } from "../../store/store"
import "../../stylesheets/home.css"

const Home = () => {
  // Set up state
  const dispatch = useDispatch()
  const isSearchingForGame = useSelector((state: State) => state.home.isSearchingForGame)

  const handleClick = () => {
    dispatch(createNewGameRequested())
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