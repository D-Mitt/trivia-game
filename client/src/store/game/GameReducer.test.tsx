
import { NIL as NIL_UUID } from "uuid"
import * as constants from "./GameConstants"
import GameReducer from "./GameReducer"

const defaultState = {
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
  status: constants.GameStatus.Unknown,
  totalUsers: 0,
  remainingUsers: [0],
  requiredToStart: 2,
  isUpdatingRemainingPlayers: false,
  hasSubmittedAnswer: false,
  selectedAnswer: "",
  hasPlayerLost: false,
  hasPlayerWon: false,
  isSolo: false,
}

describe("Game Reducer", () => {
  test("initial state is correct", () => {
    const action = { type: "dummy action" }

    const expectedState = defaultState

    expect(GameReducer(defaultState, action as any)).toEqual(expectedState)
  })

  test("CREATE_NEW_SOLO_GAME_REQUESTED", () => {
    const action = { type: constants.CREATE_NEW_SOLO_GAME_REQUESTED }

    const expectedState = {
      ...defaultState,
      isCreatingSoloGame: true
    }

    expect(GameReducer(defaultState, action as any)).toEqual(expectedState)
  })

  test("CREATE_NEW_SOLO_GAME_SUCCEEDED", () => {
    const gameData = {
      gameId: "gameId",
      userId: 1,
      isWaitingForNextRound: true,
      timeOfNextRound: new Date(),
      currentRound: 1,
      currentQuestion: "question",
      currentIncorrectAnswers: ["test1, test2, test3"],
      currentCorrectAnswer: "answer",
      status: constants.GameStatus.Unknown,
      totalUsers: 1,
      remainingUsers: [1, 2],
      requiredToStart: 1,
      isSolo: true
    }
    const action = { 
      type: constants.CREATE_NEW_SOLO_GAME_SUCCEEDED,
      gameData: gameData
    }

    const initialState = {
      ...defaultState,
      isCreatingSoloGame: true,
      hasPlayerLost: true,
      hasPlayerWon: true,
      hasSubmittedAnswer: true,
      selectedAnswer: "answer",
      isUpdatingRemainingPlayers: true,
    }
    const expectedState = {
      ...defaultState,
      ...gameData,
      isCreatingSoloGame: false
    }

    expect(GameReducer(initialState, action as any)).toEqual(expectedState)
  })

  test("CREATE_NEW_SOLO_GAME_FAILED", () => {
    const action = { 
      type: constants.CREATE_NEW_SOLO_GAME_FAILED,
    }

    const initialState = {
      ...defaultState,
      isCreatingSoloGame: true,
      gameId: "gameId",
      userId: 1,
      isWaitingForNextRound: true,
      currentRound: 1,
      currentQuestion: "question",
      currentIncorrectAnswers: ["wrong1"] as string[],
      currentCorrectAnswer: "answer",
      allCurrentAnswersShuffled: ["wrong1", "question"] as string[],
      status: constants.GameStatus.Done,
      totalUsers: 2,
      remainingUsers: [1, 2],
      requiredToStart: 3,
      isUpdatingRemainingPlayers: true,
      hasSubmittedAnswer: true,
      hasPlayerLost: true,
      hasPlayerWon: true,
    }
    const expectedState = {
      ...defaultState,
    }

    expect(GameReducer(initialState, action as any)).toEqual(expectedState)
  })

  test("JOIN_MULTIPLAYER_GAME_REQUESTED", () => {
    const action = { type: constants.JOIN_MULTIPLAYER_GAME_REQUESTED }

    const expectedState = {
      ...defaultState,
      isSearchingForGame: true
    }

    expect(GameReducer(defaultState, action as any)).toEqual(expectedState)
  })

  test("JOIN_MULTIPLAYER_GAME_SUCCEEDED", () => {
    const gameData = {
      gameId: "gameId",
      userId: 1,
      isWaitingForNextRound: true,
      timeOfNextRound: new Date(),
      currentRound: 1,
      currentQuestion: "question",
      currentIncorrectAnswers: ["test1, test2, test3"],
      currentCorrectAnswer: "answer",
      status: constants.GameStatus.Unknown,
      totalUsers: 1,
      remainingUsers: [1, 2],
      requiredToStart: 1,
      isSolo: true
    }
    const action = { 
      type: constants.JOIN_MULTIPLAYER_GAME_SUCCEEDED,
      gameData: gameData
    }

    const initialState = {
      ...defaultState,
      isCreatingSoloGame: false,
      hasPlayerLost: true,
      hasPlayerWon: true,
      hasSubmittedAnswer: true,
      selectedAnswer: "answer",
      isUpdatingRemainingPlayers: true,
    }
    const expectedState = {
      ...defaultState,
      ...gameData,
      isCreatingSoloGame: false
    }

    expect(GameReducer(initialState, action as any)).toEqual(expectedState)
  })

  test("JOIN_MULTIPLAYER_GAME_FAILED", () => {
    const action = { 
      type: constants.JOIN_MULTIPLAYER_GAME_FAILED,
    }

    const initialState = {
      ...defaultState,
      isSearchingForGame: true,
      gameId: "gameId",
      userId: 1,
      isWaitingForNextRound: true,
      currentRound: 1,
      currentQuestion: "question",
      currentIncorrectAnswers: ["wrong1"] as string[],
      currentCorrectAnswer: "answer",
      allCurrentAnswersShuffled: ["wrong1", "question"] as string[],
      status: constants.GameStatus.Done,
      totalUsers: 2,
      remainingUsers: [1, 2],
      requiredToStart: 3,
      isUpdatingRemainingPlayers: true,
      hasSubmittedAnswer: true,
      hasPlayerLost: true,
      hasPlayerWon: true,
    }
    const expectedState = {
      ...defaultState,
    }

    expect(GameReducer(initialState, action as any)).toEqual(expectedState)
  })

  test("GET_GAME_SUCCEEDED", () => {
    const gameData = {
      gameId: "gameId",
      userId: 1,
      isWaitingForNextRound: true,
      timeOfNextRound: new Date(),
      currentRound: 1,
      currentQuestion: "question",
      currentIncorrectAnswers: ["test1, test2, test3"],
      currentCorrectAnswer: "answer",
      status: constants.GameStatus.Unknown,
      totalUsers: 1,
      remainingUsers: [1, 2],
      requiredToStart: 1,
      isSolo: true
    }
    const action = { 
      type: constants.GET_GAME_SUCCEEDED,
      gameData: gameData
    }

    const initialState = {
      ...defaultState,
      isCreatingSoloGame: false,
      hasPlayerLost: false,
      hasPlayerWon: true,
      hasSubmittedAnswer: true,
      selectedAnswer: "answer",
      isUpdatingRemainingPlayers: false,
      userId: 1,
    }
    const expectedState = {
      ...defaultState,
      ...gameData,
      isCreatingSoloGame: false,
      isSolo: false,
    }

    // Have to do this because of the shuffle function in the reducer
    const results = GameReducer(initialState, action as any)
    expect(results).toEqual({...expectedState, allCurrentAnswersShuffled: results.allCurrentAnswersShuffled})
  })

  test("UPDATE_REMAINING_PLAYERS_REQUESTED", () => {
    const action = { type: constants.UPDATE_REMAINING_PLAYERS_REQUESTED }

    const initialState = {
      ...defaultState,
      isUpdatingRemainingPlayers: false,
      hasSubmittedAnswer: false
    }

    const expectedState = {
      ...defaultState,
      isUpdatingRemainingPlayers: true,
      hasSubmittedAnswer: true
    }

    expect(GameReducer(initialState, action as any)).toEqual(expectedState)
  })

  test("UPDATE_REMAINING_PLAYERS_SUCCEEDED", () => {
    const action = { type: constants.UPDATE_REMAINING_PLAYERS_SUCCEEDED }

    const initialState = {
      ...defaultState,
      isUpdatingRemainingPlayers: true
    }

    const expectedState = {
      ...defaultState,
      isUpdatingRemainingPlayers: false
    }

    expect(GameReducer(initialState, action as any)).toEqual(expectedState)
  })

  test("UPDATE_REMAINING_PLAYERS_FAILED", () => {
    const action = { type: constants.UPDATE_REMAINING_PLAYERS_FAILED }

    const initialState = {
      ...defaultState,
      isUpdatingRemainingPlayers: true
    }

    const expectedState = {
      ...defaultState,
      isUpdatingRemainingPlayers: false
    }

    expect(GameReducer(initialState, action as any)).toEqual(expectedState)
  })

  test("SELECTED_ANSWER_SET", () => {
    const action = { type: constants.SELECTED_ANSWER_SET, answer: "answer" }

    const initialState = {
      ...defaultState,
      selectedAnswer: ""
    }

    const expectedState = {
      ...defaultState,
      selectedAnswer: "answer"
    }

    expect(GameReducer(initialState, action as any)).toEqual(expectedState)
  })
})