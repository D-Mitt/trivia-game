import { NIL as NIL_UUID } from "uuid"
import configureStore from "./configureStore"
import { GameStatus } from "./game/GameConstants"

export interface State {
  game: {
    isSearchingForGame: boolean
    isCreatingSoloGame: boolean
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
    hasSubmittedAnswer: boolean
    selectedAnswer: string
    hasPlayerLost: boolean
    hasPlayerWon: boolean
    isSolo: boolean
  }
}

const initialState: State = {
  game: {
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
    isSolo: false
  }
}

export const store = configureStore(initialState)