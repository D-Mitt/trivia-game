
export const CREATE_NEW_SOLO_GAME_REQUESTED = "CREATE_NEW_SOLO_GAME_REQUESTED"
export type CREATE_NEW_SOLO_GAME_REQUESTED = typeof CREATE_NEW_SOLO_GAME_REQUESTED

export const CREATE_NEW_SOLO_GAME_SUCCEEDED = "CREATE_NEW_SOLO_GAME_SUCCEEDED"
export type CREATE_NEW_SOLO_GAME_SUCCEEDED = typeof CREATE_NEW_SOLO_GAME_SUCCEEDED

export const CREATE_NEW_SOLO_GAME_FAILED = "CREATE_NEW_SOLO_GAME_FAILED"
export type CREATE_NEW_SOLO_GAME_FAILED = typeof CREATE_NEW_SOLO_GAME_FAILED

export const JOIN_MULTIPLAYER_GAME_REQUESTED = "JOIN_MULTIPLAYER_GAME_REQUESTED"
export type JOIN_MULTIPLAYER_GAME_REQUESTED = typeof JOIN_MULTIPLAYER_GAME_REQUESTED

export const JOIN_MULTIPLAYER_GAME_SUCCEEDED = "JOIN_MULTIPLAYER_GAME_SUCCEEDED"
export type JOIN_MULTIPLAYER_GAME_SUCCEEDED = typeof JOIN_MULTIPLAYER_GAME_SUCCEEDED

export const JOIN_MULTIPLAYER_GAME_FAILED = "JOIN_MULTIPLAYER_GAME_FAILED"
export type JOIN_MULTIPLAYER_GAME_FAILED = typeof JOIN_MULTIPLAYER_GAME_FAILED

export const GET_GAME_REQUESTED = "GET_GAME_REQUESTED"
export type GET_GAME_REQUESTED = typeof GET_GAME_REQUESTED

export const GET_GAME_SUCCEEDED = "GET_GAME_SUCCEEDED"
export type GET_GAME_SUCCEEDED = typeof GET_GAME_SUCCEEDED

export const GET_GAME_FAILED = "GET_GAME_FAILED"
export type GET_GAME_FAILED = typeof GET_GAME_FAILED

export const UPDATE_REMAINING_PLAYERS_REQUESTED = "UPDATE_REMAINING_PLAYERS_REQUESTED"
export type UPDATE_REMAINING_PLAYERS_REQUESTED = typeof UPDATE_REMAINING_PLAYERS_REQUESTED

export const UPDATE_REMAINING_PLAYERS_SUCCEEDED = "UPDATE_REMAINING_PLAYERS_SUCCEEDED"
export type UPDATE_REMAINING_PLAYERS_SUCCEEDED = typeof UPDATE_REMAINING_PLAYERS_SUCCEEDED

export const UPDATE_REMAINING_PLAYERS_FAILED = "UPDATE_REMAINING_PLAYERS_FAILED"
export type UPDATE_REMAINING_PLAYERS_FAILED = typeof UPDATE_REMAINING_PLAYERS_FAILED

export const SELECTED_ANSWER_SET = "SELECTED_ANSWER_SET"
export type SELECTED_ANSWER_SET = typeof SELECTED_ANSWER_SET

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
  currentIncorrectAnswers: string[]
  currentCorrectAnswer: string
  allCurrentAnswersShuffled: string[]
  status: GameStatus
  totalUsers: number
  remainingUsers: number[]
  requiredToStart: number
  isUpdatingRemainingPlayers: boolean
  isSolo: boolean
}

export interface CreateNewSoloGameRequested {
  type: CREATE_NEW_SOLO_GAME_REQUESTED
}

export interface CreateNewSoloGameSucceeded {
  type: CREATE_NEW_SOLO_GAME_SUCCEEDED
  gameData: GameData
}

export interface CreateNewSoloGameFailed {
  type: CREATE_NEW_SOLO_GAME_FAILED
}

export interface JoinMultiplayerGameRequested {
  type: JOIN_MULTIPLAYER_GAME_REQUESTED
}

export interface JoinMultiplayerGameSucceeded {
  type: JOIN_MULTIPLAYER_GAME_SUCCEEDED
  gameData: GameData
}

export interface JoinMultiplayerGameFailed {
  type: JOIN_MULTIPLAYER_GAME_FAILED
}

export interface GetGameRequested {
  type: GET_GAME_REQUESTED
}

export interface GetGameSucceeded {
  type: GET_GAME_SUCCEEDED
  gameData: GameData
}

export interface GetGameFailed {
  type: GET_GAME_FAILED
}

export interface UpdateRemainingPlayersRequested {
  type: UPDATE_REMAINING_PLAYERS_REQUESTED
}

export interface UpdateRemainingPlayersSucceeded {
  type: UPDATE_REMAINING_PLAYERS_SUCCEEDED
}

export interface UpdateRemainingPlayersFailed {
  type: UPDATE_REMAINING_PLAYERS_FAILED
}

export interface SelectedAnswerSet {
  type: SELECTED_ANSWER_SET
  answer: string
}

export type GameAction =
| CreateNewSoloGameRequested
| CreateNewSoloGameSucceeded
| CreateNewSoloGameFailed
| JoinMultiplayerGameRequested
| JoinMultiplayerGameSucceeded
| JoinMultiplayerGameFailed
| GetGameRequested
| GetGameSucceeded
| GetGameFailed
| UpdateRemainingPlayersRequested
| UpdateRemainingPlayersSucceeded
| UpdateRemainingPlayersFailed
| SelectedAnswerSet