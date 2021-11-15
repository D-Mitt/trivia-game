
export const CREATE_NEW_GAME_REQUESTED = "CREATE_NEW_GAME_REQUESTED"
export type CREATE_NEW_GAME_REQUESTED = typeof CREATE_NEW_GAME_REQUESTED

export const CREATE_NEW_GAME_SUCCEEDED = "CREATE_NEW_GAME_SUCCEEDED"
export type CREATE_NEW_GAME_SUCCEEDED = typeof CREATE_NEW_GAME_SUCCEEDED
export const CREATE_NEW_GAME_FAILED = "CREATE_NEW_GAME_FAILED"
export type CREATE_NEW_GAME_FAILED = typeof CREATE_NEW_GAME_FAILED

export enum GameStatus {
  Done = "DONE",
  Unknown = "UNKNOWN",
  Started = "STARTED",
  Waiting = "WAITING",
}

export interface GameData {
  gameId: string
  userId: number
  isWaitingForNextRound: boolean
  timeOfNextRound: Date
  currentRound: number
  currentQuestion: string
  currentAnswers: number[]
  status: GameStatus
  totalUsers: number
  remainingUsers: number[]
  requiredToStart: number
}

export interface CreateNewGameRequested {
  type: CREATE_NEW_GAME_REQUESTED
}

export interface CreateNewGameSucceeded {
  type: CREATE_NEW_GAME_SUCCEEDED
  gameData: GameData
}

export interface CreateNewGameFailed {
  type: CREATE_NEW_GAME_FAILED
}

export type HomeAction =
| CreateNewGameRequested
| CreateNewGameSucceeded
| CreateNewGameFailed