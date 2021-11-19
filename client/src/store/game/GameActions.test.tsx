import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import configureStore from "redux-mock-store"
import thunk from "redux-thunk"
import { BASE_URL } from "../../constants"
import * as actions from "./GameActions"
import * as constants from "./GameConstants"

const mockStore = configureStore([thunk])
const store = mockStore()

describe("Game Actions", () => {
  beforeEach(() => {
    store.clearActions()
  })

  describe("selectedAnswerSet", () => {
    test("Dispatches the correct action and payload for selectedAnswerSet", () => {
      const expectedActions = [
        {
          type: constants.SELECTED_ANSWER_SET,
          answer: "answer"
        }
      ]

      store.dispatch(actions.selectedAnswerSet("answer"))
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe("createNewSoloGame", () => {
    test("Dispatches the correct action and payload for createNewSoloGameRequested", () => {
      const expectedActions = [
        {
          type: constants.CREATE_NEW_SOLO_GAME_REQUESTED
        }
      ]

      store.dispatch(actions.createNewSoloGameRequested())
      expect(store.getActions()).toEqual(expectedActions)
    })

    test("Dispatches the correct action and payload for createNewSoloGameSucceeded", () => {
      const gameData: constants.GameData = {
        gameId: "",
        userId: 1,
        isWaitingForNextRound: false,
        timeOfNextRound: new Date(),
        currentRound: 1,
        currentQuestion: "",
        currentIncorrectAnswers: [],
        currentCorrectAnswer: "",
        allCurrentAnswersShuffled: [],
        status: constants.GameStatus.Waiting,
        totalUsers: 2,
        remainingUsers: [],
        requiredToStart: 2,
        isUpdatingRemainingPlayers: false,
        isSolo: false
      }

      const expectedActions = [
        {
          type: constants.CREATE_NEW_SOLO_GAME_SUCCEEDED,
          gameData: gameData
        }
      ]

      store.dispatch(actions.createNewSoloGameSucceeded(gameData))
      expect(store.getActions()).toEqual(expectedActions)
    })

    test("Dispatches the correct action and payload for createNewSoloGameFailed", () => {
      const expectedActions = [
        {
          type: constants.CREATE_NEW_SOLO_GAME_FAILED
        }
      ]

      store.dispatch(actions.createNewSoloGameFailed())
      expect(store.getActions()).toEqual(expectedActions)
    })

    test("Dispatches the correct action and payload for createNewSoloGame", async () => {
      const gameData: constants.GameData = {
        gameId: "",
        userId: 1,
        isWaitingForNextRound: false,
        timeOfNextRound: new Date(),
        currentRound: 1,
        currentQuestion: "",
        currentIncorrectAnswers: [],
        currentCorrectAnswer: "",
        allCurrentAnswersShuffled: [],
        status: constants.GameStatus.Waiting,
        totalUsers: 2,
        remainingUsers: [],
        requiredToStart: 2,
        isUpdatingRemainingPlayers: false,
        isSolo: false
      }

      const expectedActions = [
        {
          type: constants.CREATE_NEW_SOLO_GAME_REQUESTED
        },
        {
          type: constants.CREATE_NEW_SOLO_GAME_SUCCEEDED,
          gameData: gameData
        }
      ]

      const mock = new MockAdapter(axios)
      mock
        .onPost(`${BASE_URL}/soloGames`, {})
        .reply(200, gameData)

      await store.dispatch(actions.createNewSoloGame() as any)

      // Fix date/string conversion
      expect(store.getActions()[0]).toEqual(expectedActions[0])
    })

    test("Dispatches the correct failed action and payload for createNewSoloGame", async () => {

      const expectedActions = [
        {
          type: constants.CREATE_NEW_SOLO_GAME_REQUESTED
        },
        {
          type: constants.CREATE_NEW_SOLO_GAME_FAILED
        }
      ]

      const mock = new MockAdapter(axios)
      mock
        .onPost(`${BASE_URL}/soloGames`, {})
        .reply(500, {})

      await store.dispatch(actions.createNewSoloGame() as any)

      // Fix date/string conversion
      expect(store.getActions()[0]).toEqual(expectedActions[0])
    })
  })

  describe("joinMultiplayerGame", () => {
    test("Dispatches the correct action and payload for joinMultiplayerGameRequested", () => {
      const expectedActions = [
        {
          type: constants.JOIN_MULTIPLAYER_GAME_REQUESTED
        }
      ]

      store.dispatch(actions.joinMultiplayerGameRequested())
      expect(store.getActions()).toEqual(expectedActions)
    })

    test("Dispatches the correct action and payload for joinMultiplayerGameSucceeded", () => {
      const gameData: constants.GameData = {
        gameId: "",
        userId: 1,
        isWaitingForNextRound: false,
        timeOfNextRound: new Date(),
        currentRound: 1,
        currentQuestion: "",
        currentIncorrectAnswers: [],
        currentCorrectAnswer: "",
        allCurrentAnswersShuffled: [],
        status: constants.GameStatus.Waiting,
        totalUsers: 2,
        remainingUsers: [],
        requiredToStart: 2,
        isUpdatingRemainingPlayers: false,
        isSolo: false
      }

      const expectedActions: {type: string, gameData:constants.GameData }[] = [
        {
          type: constants.JOIN_MULTIPLAYER_GAME_SUCCEEDED,
          gameData: gameData
        }
      ]

      store.dispatch(actions.joinMultiplayerGameSucceeded(gameData))
      expect(store.getActions()).toEqual(expectedActions)
    })

    test("Dispatches the correct action and payload for joinMultiplayerGameFailed", () => {
      const expectedActions = [
        {
          type: constants.JOIN_MULTIPLAYER_GAME_FAILED
        }
      ]

      store.dispatch(actions.joinMultiplayerGameFailed())
      expect(store.getActions()).toEqual(expectedActions)
    })

    test("Dispatches the correct action and payload for joinMultiplayerGame", async () => {
      const gameData: constants.GameData = {
        gameId: "",
        userId: 1,
        isWaitingForNextRound: false,
        timeOfNextRound: new Date(),
        currentRound: 1,
        currentQuestion: "",
        currentIncorrectAnswers: [],
        currentCorrectAnswer: "",
        allCurrentAnswersShuffled: [],
        status: constants.GameStatus.Waiting,
        totalUsers: 2,
        remainingUsers: [],
        requiredToStart: 2,
        isUpdatingRemainingPlayers: false,
        isSolo: false
      }

      const expectedActions = [
        {
          type: constants.JOIN_MULTIPLAYER_GAME_REQUESTED
        },
        {
          type: constants.JOIN_MULTIPLAYER_GAME_SUCCEEDED,
          gameData: gameData
        }
      ]

      const mock = new MockAdapter(axios)
      mock
        .onPost(`${BASE_URL}/games`, {})
        .reply(200, gameData)

      await store.dispatch(actions.joinMultiplayerGame() as any)

      // Fix date/string conversion
      expect(store.getActions()[0]).toEqual(expectedActions[0])
    })

    test("Dispatches the correct failed action and payload for joinMultiplayerGame", async () => {

      const expectedActions = [
        {
          type: constants.JOIN_MULTIPLAYER_GAME_REQUESTED
        },
        {
          type: constants.JOIN_MULTIPLAYER_GAME_FAILED
        }
      ]

      const mock = new MockAdapter(axios)
      mock
        .onPost(`${BASE_URL}/games`, {})
        .reply(500, {})

      await store.dispatch(actions.joinMultiplayerGame() as any)

      // Fix date/string conversion
      expect(store.getActions()[0]).toEqual(expectedActions[0])
    })
  })

  describe("getGame", () => {
    test("Dispatches the correct action and payload for getGameRequested", () => {
      const expectedActions = [
        {
          type: constants.GET_GAME_REQUESTED
        }
      ]

      store.dispatch(actions.getGameRequested())
      expect(store.getActions()).toEqual(expectedActions)
    })

    test("Dispatches the correct action and payload for getGameSucceeded", () => {
      const gameData: constants.GameData = {
        gameId: "",
        userId: 1,
        isWaitingForNextRound: false,
        timeOfNextRound: new Date(),
        currentRound: 1,
        currentQuestion: "",
        currentIncorrectAnswers: [],
        currentCorrectAnswer: "",
        allCurrentAnswersShuffled: [],
        status: constants.GameStatus.Waiting,
        totalUsers: 2,
        remainingUsers: [],
        requiredToStart: 2,
        isUpdatingRemainingPlayers: false,
        isSolo: false
      }

      const expectedActions: {type: string, gameData:constants.GameData }[] = [
        {
          type: constants.GET_GAME_SUCCEEDED,
          gameData: gameData
        }
      ]

      store.dispatch(actions.getGameSucceeded(gameData))
      expect(store.getActions()).toEqual(expectedActions)
    })

    test("Dispatches the correct action and payload for getGameFailed", () => {
      const expectedActions = [
        {
          type: constants.GET_GAME_FAILED
        }
      ]

      store.dispatch(actions.getGameFailed())
      expect(store.getActions()).toEqual(expectedActions)
    })

    test("Dispatches the correct action and payload for getGame", async () => {
      const gameData: constants.GameData = {
        gameId: "gameId",
        userId: 1,
        isWaitingForNextRound: false,
        timeOfNextRound: new Date(),
        currentRound: 1,
        currentQuestion: "",
        currentIncorrectAnswers: [],
        currentCorrectAnswer: "",
        allCurrentAnswersShuffled: [],
        status: constants.GameStatus.Waiting,
        totalUsers: 2,
        remainingUsers: [],
        requiredToStart: 2,
        isUpdatingRemainingPlayers: false,
        isSolo: false
      }

      const expectedActions = [
        {
          type: constants.GET_GAME_REQUESTED
        },
        {
          type: constants.GET_GAME_SUCCEEDED,
          gameData: gameData
        }
      ]

      const mock = new MockAdapter(axios)
      mock
        .onGet(`${BASE_URL}/games/gameId`, {})
        .reply(200, gameData)

      await store.dispatch(actions.getGame("gameId") as any)

      // Fix date/string conversion
      expect(store.getActions()[0]).toEqual(expectedActions[0])
    })

    test("Dispatches the correct failed action and payload for getGame", async () => {

      const expectedActions = [
        {
          type: constants.GET_GAME_REQUESTED
        },
        {
          type: constants.GET_GAME_FAILED
        }
      ]

      const mock = new MockAdapter(axios)
      mock
        .onGet(`${BASE_URL}/games/gameId`, {})
        .reply(500)

      await store.dispatch(actions.getGame("gameId") as any)

      // Fix date/string conversion
      expect(store.getActions()[0]).toEqual(expectedActions[0])
    })
  })

  describe("updateRemainingPlayers", () => {
    test("Dispatches the correct action and payload for updateRemainingPlayersRequested", () => {
      const expectedActions = [
        {
          type: constants.UPDATE_REMAINING_PLAYERS_REQUESTED
        }
      ]

      store.dispatch(actions.updateRemainingPlayersRequested())
      expect(store.getActions()).toEqual(expectedActions)
    })

    test("Dispatches the correct action and payload for updateRemainingPlayersSucceeded", () => {

      const expectedActions: {type: string }[] = [
        {
          type: constants.UPDATE_REMAINING_PLAYERS_SUCCEEDED,
        }
      ]

      store.dispatch(actions.updateRemainingPlayersSucceeded())
      expect(store.getActions()).toEqual(expectedActions)
    })

    test("Dispatches the correct action and payload for updateRemainingPlayersFailed", () => {
      const expectedActions = [
        {
          type: constants.UPDATE_REMAINING_PLAYERS_FAILED
        }
      ]

      store.dispatch(actions.updateRemainingPlayersFailed())
      expect(store.getActions()).toEqual(expectedActions)
    })

    test("Dispatches the correct action and payload for updateRemainingPlayers", async () => {
      const expectedActions = [
        {
          type: constants.UPDATE_REMAINING_PLAYERS_REQUESTED
        },
        {
          type: constants.UPDATE_REMAINING_PLAYERS_SUCCEEDED,
        }
      ]

      const mock = new MockAdapter(axios)
      mock
        .onPost(`${BASE_URL}/games/gameId/remainingPlayers/1`, {})
        .reply(204)

      await store.dispatch(actions.updateRemainingPlayers("gameId", 1, true) as any)

      // Fix date/string conversion
      expect(store.getActions()).toEqual(expectedActions)
    })

    test("Dispatches the correct failed action and payload for updateRemainingPlayers", async () => {

      const expectedActions = [
        {
          type: constants.UPDATE_REMAINING_PLAYERS_REQUESTED
        },
        {
          type: constants.UPDATE_REMAINING_PLAYERS_FAILED
        }
      ]

      const mock = new MockAdapter(axios)
      mock
        .onPost(`${BASE_URL}/games/gameId/remainingPlayers/1`, {})
        .reply(500)

      await store.dispatch(actions.updateRemainingPlayers("gameId", 1, true) as any)

      // Fix date/string conversion
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

