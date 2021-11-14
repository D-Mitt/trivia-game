import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import combineReducers from "./index"

export default function configureStore(initialState: any) {
  return createStore(combineReducers, initialState, applyMiddleware(thunk))
}