import { mount } from "enzyme"
import * as React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducers from "../../store/index"
import Game from "./Game"

const createGame = () => {
  const store  = createStore(
    rootReducers
  )
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  )
}

describe("Game", () => {
  const game = mount(createGame())

  test("matches the snapshot", () => {
    expect(game.html()).toMatchSnapshot()
  })
})