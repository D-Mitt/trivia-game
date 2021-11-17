import { NIL as NIL_UUID } from "uuid"
import {
  CREATE_NEW_GAME_FAILED,
  CREATE_NEW_GAME_REQUESTED,
  CREATE_NEW_GAME_SUCCEEDED,
  GameStatus,
  GET_GAME_SUCCEEDED,
  HomeAction
} from "./GameConstants"

// Fisher-Yates shuffle algorithm found here: http://sedition.com/perl/javascript-fy.html
const shuffle = (array: any[]) => {
  let currentIndex = array.length,  randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}

const gameReducer = (
  state = {
    isSearchingForGame: false,
    gameId: NIL_UUID,
    userId: 0,
    isWaitingForNextRound: false,
    timeOfNextRound: new Date(),
    currentRound: 0,
    currentQuestion: "",
    currentIncorrectAnswers: [] as string[],
    currentCorrectAnswer: "",
    allCurrentAnswersShuffled: [] as string[],
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
        currentIncorrectAnswers: action.gameData.currentIncorrectAnswers,
        currentCorrectAnswer: action.gameData.currentCorrectAnswer,
        status: action.gameData.status,
        totalUsers: action.gameData.totalUsers,
        remainingUsers: action.gameData.remainingUsers,
        requiredToStart: action.gameData.requiredToStart,

      }
      break
    case GET_GAME_SUCCEEDED:
      newState = {
        ...newState,
        isSearchingForGame: false,
        gameId: action.gameData.gameId,
        isWaitingForNextRound: action.gameData.isWaitingForNextRound,
        timeOfNextRound: action.gameData.timeOfNextRound,
        currentRound: action.gameData.currentRound,
        currentQuestion: action.gameData.currentQuestion,
        currentIncorrectAnswers: action.gameData.currentIncorrectAnswers,
        currentCorrectAnswer: action.gameData.currentCorrectAnswer,
        allCurrentAnswersShuffled: shuffle([...action.gameData.currentIncorrectAnswers, action.gameData.currentCorrectAnswer]),
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
        currentIncorrectAnswers: [] as string[],
        allCurrentAnswersShuffled: [] as string[],
        currentCorrectAnswer: "",
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