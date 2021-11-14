import { CREATE_NEW_GAME_FAILED, CREATE_NEW_GAME_REQUESTED, CREATE_NEW_GAME_SUCCEEDED, HomeAction } from "./HomeConstants"

const homeReducer = (
  state = {
    isSearchingForGame: false,
  },
  action: HomeAction
) => {
  let newState = state

  switch (action.type) {
    case CREATE_NEW_GAME_REQUESTED:
      newState = {
        ...newState,
        isSearchingForGame: true,
      }
      break
    case CREATE_NEW_GAME_SUCCEEDED:
      newState = {
        ...newState,
        isSearchingForGame: false,
      }
      break
    case CREATE_NEW_GAME_FAILED:
      newState = {
        ...newState,
        isSearchingForGame: false,
      }
      break
  }
  return newState
}

export default homeReducer