export const CREATE_NEW_GAME_REQUESTED = "CREATE_NEW_GAME_REQUESTED"

export const CREATE_NEW_GAME_SUCCEEDED = "CREATE_NEW_GAME_SUCCEEDED"

export const CREATE_NEW_GAME_FAILED = "CREATE_NEW_GAME_FAILED"

export interface CreateNewGameRequested {
  type: string
}

export interface CreateNewGameSucceeded {
  type: string
}

export interface CreateNewGameFailed {
  type: string
}

export type HomeAction =
| CreateNewGameRequested
| CreateNewGameSucceeded
| CreateNewGameFailed