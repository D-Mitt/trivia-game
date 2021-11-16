import axios from "axios"
import { Dispatch } from "redux"
import { BASE_URL } from "../../constants"
import {
  CreateNewGameFailed,
  CreateNewGameRequested,
  CreateNewGameSucceeded,
  CREATE_NEW_GAME_FAILED,
  CREATE_NEW_GAME_REQUESTED,
  CREATE_NEW_GAME_SUCCEEDED,
  GameData,
  GetGameFailed,
  GetGameRequested,
  GetGameSucceeded,
  GET_GAME_FAILED,
  GET_GAME_REQUESTED,
  GET_GAME_SUCCEEDED,
  HomeAction
} from "./GameConstants"

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

export const getGameRequested = (): GetGameRequested => {
  return {
    type: GET_GAME_REQUESTED,
  }
}

export const getGameSucceeded = (gameData: GameData): GetGameSucceeded => {
  return {
    type: GET_GAME_SUCCEEDED,
    gameData: gameData,
  }
}

export const getGameFailed = (): GetGameFailed => {
  return {
    type: GET_GAME_FAILED,
  }
}

export const createNewGame = () => {
  return async (dispatch: Dispatch<HomeAction>) => {
    dispatch(createNewGameRequested())
    try {
      // Could be filled with game config in future updates
      const body = {}
      const response = await axios.post(`${BASE_URL}/games`, body)
      dispatch(createNewGameSucceeded(response.data))
    } catch (error) {
      dispatch(createNewGameFailed())
    }
  }
}

export const getGame = (gameId: string) => {
  return async (dispatch: Dispatch<HomeAction>) => {
    dispatch(getGameRequested())
    try {
      const response = await axios.get(`${BASE_URL}/games/${gameId}`)
      dispatch(getGameSucceeded(response.data))
    } catch (error) {
      dispatch(getGameFailed())
    }
  }
}