import { setup, assign } from "xstate";
import type { GameEvent, HorseRacingGameContext } from "./utils/types";

export const HorseRacingLocalStateMachine = setup({
  types: {
    context: {} as HorseRacingGameContext,
    events: {} as GameEvent,
  },
  actions: {
    logSetup: ({ context }) => {
      console.log("Entering setup with players:", context.players);
    },
    removePlayer: assign({
      players: ({ context, event }) => {
        if (event.type !== "REMOVE_PLAYER") return context.players;
        const index = event.index;
        if (index < 0 || index >= context.players.length) {
          console.warn("Invalid player index:", index);
          return context.players;
        }
        return context.players.filter((_, i) => i !== index);
      },
    }),
    addPlayer: assign({
      players: ({ context, event }) => {
        if (event.type !== "ADD_PLAYER") return context.players;
        const newPlayer = event.player;
        if (
          !newPlayer ||
          !newPlayer.playerName ||
          !newPlayer.betSize ||
          !newPlayer.betType ||
          !newPlayer.betSuit
        ) {
          console.warn("Invalid player data:", newPlayer);
          return context.players;
        }
        return [...context.players, newPlayer];
      },
    }),
  },
  guards: {
    hasPlayersAndEveryoneHasBet: ({ context }) => {
      if (!Array.isArray(context.players) || context.players.length === 0) {
        console.warn("No players found or players array is not an array.");
        return false;
      }
      return context.players.every(
        (player) =>
          player.playerName?.trim() &&
          typeof player.betSize === "number" &&
          player.betSize > 0 &&
          !!player.betType &&
          !!player.betSuit
      );
    },
  },
}).createMachine({
  id: "HorseRacingLocal",
  initial: "setup",
  context: {
    players: [],
    currentCard: null,
    horseStates: {
      Hearts: 0,
      Spades: 0,
      Clubs: 0,
      Diamonds: 0,
    },
    deck: [],
    legs: [],
    currentLeg: 0,
    maxHorsePosition: 6,
  },
  states: {
    setup: {
      entry: "logSetup",
      on: {
        REMOVE_PLAYER: {
          actions: "removePlayer",
        },
        ADD_PLAYER: {
          actions: "addPlayer",
        },
        START_RACE: {
          guard: "hasPlayersAndEveryoneHasBet",
          target: "racing",
        },
      },
    },
    racing: {
      entry: [
        () => {
          console.log("Starting race...");
          console.log("IM IN RACING STATE");
        },
      ],
      on: {
        FLIP_CARD: {
          target: "results",
        },
      },
    },
    results: {
      on: {
        RESTART: {
          target: "setup",
        },
      },
    },
  },
});
