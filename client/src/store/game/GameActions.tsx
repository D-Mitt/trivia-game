import axios from "axios"
import { Dispatch } from "redux"
import { BASE_URL } from "../../constants"
import { CreateNewGameFailed, CreateNewGameRequested, CreateNewGameSucceeded, CREATE_NEW_GAME_FAILED, CREATE_NEW_GAME_REQUESTED, CREATE_NEW_GAME_SUCCEEDED, GameData, HomeAction } from "./GameConstants"

export const createNewGameRequested = (): CreateNewGameRequested => {
  return {
    type: CREATE_NEW_GAME_REQUESTED,
  }
}

export const createNewGameSucceeded = (gameData: GameData): CreateNewGameSucceeded => {
  return {
    type: CREATE_NEW_GAME_SUCCEEDED,
    gameData: gameData,
  }
}

export const createNewGameFailed = (): CreateNewGameFailed => {
  return {
    type: CREATE_NEW_GAME_FAILED,
  }
}

export const createNewGame = () => {
  return async (dispatch: Dispatch<HomeAction>) => {
    dispatch(createNewGameRequested())
    try {
      // Could be filled with game config in future updates
      const body = {}
      const response = await axios.post(`${BASE_URL}/games`, body)
      console.log(response)
      dispatch(createNewGameSucceeded(response.data))
    } catch (error) {
      dispatch(createNewGameFailed())
    }
  }
}