import configureStore from "./configureStore"

export interface State {
  home: {
    isSearchingForGame: boolean
  }
}

const initialState: State = {
  home: {
    isSearchingForGame: false,
  }
}

export const store = configureStore(initialState)