import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import combineReducers from "./index"
import { State } from "./store"

export default function configureStore(initialState: State) {
  return createStore(combineReducers, initialState, composeWithDevTools(applyMiddleware(thunk)))
}