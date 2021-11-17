import { NIL as NIL_UUID } from "uuid"
import configureStore from "./configureStore"
import { GameStatus } from "./game/GameConstants"

export interface State {
  game: {
    isSearchingForGame: boolean
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
  }
}

const initialState: State = {
  game: {
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
    requiredToStart: 2
  }
}

export const store = configureStore(initialState)