import { NIL as NIL_UUID } from "uuid"
import {
  CREATE_NEW_SOLO_GAME_FAILED,
  CREATE_NEW_SOLO_GAME_REQUESTED,
  CREATE_NEW_SOLO_GAME_SUCCEEDED, GameAction, GameStatus,
  GET_GAME_SUCCEEDED, JOIN_MULTIPLAYER_GAME_FAILED, JOIN_MULTIPLAYER_GAME_REQUESTED, JOIN_MULTIPLAYER_GAME_SUCCEEDED, SELECTED_ANSWER_SET,
  UPDATE_REMAINING_PLAYERS_FAILED,
  UPDATE_REMAINING_PLAYERS_REQUESTED,
  UPDATE_REMAINING_PLAYERS_SUCCEEDED
} from "./GameConstants"

// Fisher-Yates shuffle algorithm found here: http://sedition.com/perl/javascript-fy.html
const shuffle = (array: string[]) => {
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

// Checking if player lost
// It is a loss if userId can not be found in the remaining Users
const checkIfPlayerLost = (remainingPlayers: number[], userId: number): boolean => {
  return remainingPlayers.findIndex((playerId: number) => {
    return playerId === userId
  }) === -1
}

// Checking if player won
// It is a win if userId is the only id left in the array
const checkIfPlayerWon = (remainingPlayers: number[], userId: number): boolean => {
  return remainingPlayers.length === 1 && remainingPlayers[0] === userId
}

const gameReducer = (
  state = {
    isSearchingForGame: false,
    isCreatingSoloGame: false,
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
    isUpdatingRemainingPlayers: false,
    hasSubmittedAnswer: false,
    selectedAnswer: "",
    hasPlayerLost: false,
    hasPlayerWon: false,
    isSolo: true,
  },
  action: GameAction
) => {
  let newState = state

  switch (action.type) {
    case CREATE_NEW_SOLO_GAME_REQUESTED:
      newState = {
        ...newState,
        isCreatingSoloGame: true,
      }
      break
    case CREATE_NEW_SOLO_GAME_SUCCEEDED:
      newState = {
        ...newState,
        isCreatingSoloGame: false,
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
        isUpdatingRemainingPlayers: false,
        hasSubmittedAnswer: false,
        selectedAnswer: "",
        hasPlayerLost: false,
        hasPlayerWon: false,
        isSolo: action.gameData.isSolo
      }
      break
    case CREATE_NEW_SOLO_GAME_FAILED:
      newState = {
        ...newState,
        isCreatingSoloGame: false,
        gameId: NIL_UUID,
        userId: 0,
        isWaitingForNextRound: false,
        currentRound: 0,
        currentQuestion: "",
        currentIncorrectAnswers: [] as string[],
        allCurrentAnswersShuffled: [] as string[],
        currentCorrectAnswer: "",
        status: GameStatus.Unknown,
        totalUsers: 0,
        remainingUsers: [0],
        requiredToStart: 2,
        isUpdatingRemainingPlayers: false,
        hasSubmittedAnswer: false,
        hasPlayerLost: false,
        hasPlayerWon: false,
        isSolo: false
      }
      break
    case JOIN_MULTIPLAYER_GAME_REQUESTED:
      newState = {
        ...newState,
        isSearchingForGame: true,
      }
      break
    case JOIN_MULTIPLAYER_GAME_SUCCEEDED:
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
        isUpdatingRemainingPlayers: false,
        hasSubmittedAnswer: false,
        selectedAnswer: "",
        hasPlayerLost: false,
        hasPlayerWon: false,
        isSolo: action.gameData.isSolo
      }
      break
    case JOIN_MULTIPLAYER_GAME_FAILED:
      newState = {
        ...newState,
        isSearchingForGame: false,
        gameId: NIL_UUID,
        userId: 0,
        isWaitingForNextRound: false,
        currentRound: 0,
        currentQuestion: "",
        currentIncorrectAnswers: [] as string[],
        allCurrentAnswersShuffled: [] as string[],
        currentCorrectAnswer: "",
        status: GameStatus.Unknown,
        totalUsers: 0,
        remainingUsers: [0],
        requiredToStart: 2,
        isUpdatingRemainingPlayers: false,
        hasSubmittedAnswer: false,
        hasPlayerLost: false,
        hasPlayerWon: false,
        isSolo: false
      }
      break
    case GET_GAME_SUCCEEDED:
      newState = {
        ...newState,
        isCreatingSoloGame: false,
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
        hasPlayerLost: checkIfPlayerLost(action.gameData.remainingUsers, state.userId),
        hasPlayerWon: checkIfPlayerWon(action.gameData.remainingUsers, state.userId),
        hasSubmittedAnswer: false,
        selectedAnswer: "",
      }
      break
    case UPDATE_REMAINING_PLAYERS_REQUESTED:
      newState = {
        ...newState,
        isUpdatingRemainingPlayers: true,
        hasSubmittedAnswer: true
      }
      break
    case UPDATE_REMAINING_PLAYERS_SUCCEEDED:
      newState = {
        ...newState,
        isUpdatingRemainingPlayers: false
      }
      break
    case UPDATE_REMAINING_PLAYERS_FAILED:
      newState = {
        ...newState,
        isUpdatingRemainingPlayers: false
      }
      break
    case SELECTED_ANSWER_SET:
      newState = {
        ...newState,
        selectedAnswer: action.answer
      }
      break
  }
  return newState
}

export default gameReducer