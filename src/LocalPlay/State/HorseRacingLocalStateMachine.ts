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
    addPlayer: assign({
      players: ({ context, event }) => {
        console.log("Adding player:", event);
        if (event.type !== "ADD_PLAYER") return context.players;
        const newPlayer = event.player;
        return [...context.players, newPlayer];
      },
    }),
  },
  guards: {
    hasPlayersAndEveryoneHasBet: ({ context }) => {
      console.log("Checking if all players have bets:", context.players);
      if (!Array.isArray(context.players) || context.players.length === 0) {
        console.warn("No players found or players array is not an array.");
        return false;
      }
      // console.log(
      //   "jnjs",
      //   context.players.every(
      //     (player) =>
      //       player.playerName?.trim() &&
      //       typeof player.betSize === "number" &&
      //       player.betSize > 0 &&
      //       !!player.betType &&
      //       !!player.betSuit
      //   )
      // );
      return context.players.every(
        (player) =>
          player.playerName?.trim() &&
          typeof player.betSize === "number" &&
          player.betSize > 0 &&
          !!player.betType &&
          !!player.betSuit
      );
    },

    // hasPlayers: ({ context }) => context.players.length > 0,
    // allPlayersBet: ({ context }) =>
    //   context.players.every((p) => p.bet !== null),
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
          target: "results", // placeholder
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
