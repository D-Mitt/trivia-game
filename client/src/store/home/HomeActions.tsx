import { CreateNewGameFailed, CreateNewGameRequested, CreateNewGameSucceeded, CREATE_NEW_GAME_FAILED, CREATE_NEW_GAME_REQUESTED, CREATE_NEW_GAME_SUCCEEDED } from "./HomeConstants"

export const createNewGameRequested = (): CreateNewGameRequested => {
  return {
    type: CREATE_NEW_GAME_REQUESTED,
  }
}

export const createNewGameSucceeded = (): CreateNewGameSucceeded => {
  return {
    type: CREATE_NEW_GAME_SUCCEEDED,
  }
}

export const createNewGameFailed = (): CreateNewGameFailed => {
  return {
    type: CREATE_NEW_GAME_FAILED,
  }
}