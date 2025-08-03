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
    // setBet: assign({
    //   players: ({ context, event }) => {
    //     if (event.type !== "SET_BET") return context.players;
    //     return context.players.map((p) =>
    //       p.name === event.name ? { ...p, bet: event.bet } : p
    //     );
    //   },
    // }),
  },
  guards: {
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
        // START_BETTING: {
        //   guard: "hasPlayers",
        //   target: "betting",
        // },
      },
    },
    betting: {
      on: {
        // SET_BET: {
        //   actions: "setBet",
        // },
        // START_RACE: {
        //   guard: "allPlayersBet",
        //   target: "racing",
        // },
      },
    },
    racing: {
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
