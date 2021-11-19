import { mount } from "enzyme"
import * as React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducers from "../../store/index"
import Home from "./Home"

const createHome = () => {
  const store  = createStore(
    rootReducers
  )
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

describe("Home", () => {
  const home = mount(createHome())

  test("matches the snapshot", () => {
    expect(home.html()).toMatchSnapshot()
  })

  test("descriptions/text are displayed", () => {
    const homeTitle = home.find(".title")
    expect(homeTitle).toBeTruthy()
    expect(homeTitle.at(0).text()).toEqual("Welcome to the Trivia Quiz!")

    const descriptions = home.find(".description")
    expect(descriptions.at(0).text()).toEqual("Compete with other players to see who can correctly answer the most questions.")
    expect(descriptions.at(1).text()).toEqual("Find a game below!")
  })

  test("buttons are displayed", () => {
    const findGameButton = home.find("FindGameButton").find("button")
    expect(findGameButton).toBeTruthy()
    expect(findGameButton.at(0).text()).toEqual("Find a Game")

    const soloGameButton = home.find("SoloGameButton").find("button")
    expect(soloGameButton).toBeTruthy()
    expect(soloGameButton.at(0).text()).toEqual("Solo Game")
  })

  test("list of rules displayed", () => {
    const listItems = home.find(".rules").find("li")
    expect(listItems.get(0)).toBeTruthy()
    expect(listItems.at(0).text()).toEqual("When the game begins, you will have 12 seconds to answer a multiple choice question.")

    expect(listItems.get(1)).toBeTruthy()
    expect(listItems.at(1).text()).toEqual("After submitting your answer the correct answer will be displayed in green.")

    expect(listItems.get(2)).toBeTruthy()
    expect(listItems.at(2).text()).toEqual("Ties count as a loss (sorry!)")
  })
})