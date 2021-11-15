import { combineReducers } from "redux"
import gameReducer from "./game/GameReducer"

export default combineReducers({
  game: gameReducer,
})
