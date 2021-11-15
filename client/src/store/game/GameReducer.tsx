import { NIL as NIL_UUID } from "uuid"
import { CREATE_NEW_GAME_FAILED, CREATE_NEW_GAME_REQUESTED, CREATE_NEW_GAME_SUCCEEDED, GameStatus, HomeAction } from "./GameConstants"


const gameReducer = (
  state = {
    isSearchingForGame: false,
    gameId: NIL_UUID,
    userId: 0,
    isWaitingForNextRound: false,
    timeOfNextRound: new Date(),
    currentRound: 0,
    currentQuestion: "",
    currentAnswers: []as number[],
    status: GameStatus.Unknown,
    totalUsers: 0,
    remainingUsers: [0],
    requiredToStart: 2,
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
        gameId: action.gameData.gameId,
        userId: action.gameData.userId,
        isWaitingForNextRound: action.gameData.isWaitingForNextRound,
        timeOfNextRound: action.gameData.timeOfNextRound,
        currentRound: action.gameData.currentRound,
        currentQuestion: action.gameData.currentQuestion,
        currentAnswers: action.gameData.currentAnswers,
        status: action.gameData.status,
        totalUsers: action.gameData.totalUsers,
        remainingUsers: action.gameData.remainingUsers,
        requiredToStart: action.gameData.requiredToStart,

      }
      break
    case CREATE_NEW_GAME_FAILED:
      newState = {
        ...newState,
        isSearchingForGame: false,
        gameId: NIL_UUID,
        userId: 0,
        isWaitingForNextRound: false,
        timeOfNextRound: new Date(),
        currentRound: 0,
        currentQuestion: "",
        currentAnswers: []as number[],
        status: GameStatus.Unknown,
        totalUsers: 0,
        remainingUsers: [0],
        requiredToStart: 2
      }
      break
  }
  return newState
}

export default gameReducer