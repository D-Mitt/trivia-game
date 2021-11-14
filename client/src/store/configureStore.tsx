import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import combineReducers from "./index"
import { State } from "./store"

export default function configureStore(initialState: State) {
  return createStore(combineReducers, initialState, applyMiddleware(thunk))
}