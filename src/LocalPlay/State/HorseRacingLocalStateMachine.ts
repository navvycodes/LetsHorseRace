import { setup, assign } from "xstate";
import type { GameEvent, HorseRacingGameContext } from "./utils/types";
import { generateDeck } from "./utils/generateDeck";

export const HorseRacingLocalStateMachine = setup({
  types: {
    context: {} as HorseRacingGameContext,
    events: {} as GameEvent,
  },
  actions: {
    flipALeg: assign(({ context }) => {
      const { legs, minHorsePosition } = context;
      if (legs.length === 0) {
        console.warn("No more legs to flip.");
        return context;
      }
      const nextLeg = legs[0];
      const horseStates = { ...context.horseStates };
      if (nextLeg.suit in horseStates) {
        horseStates[nextLeg.suit] += -1;
      }
      return {
        minHorsePosition: minHorsePosition + 1,
        legs: legs.slice(1),
        horseStates: horseStates,
        currentLegCard: nextLeg,
      };
    }),
    flipACard: assign(({ context }) => {
      const { deck } = context;
      console.log("Flipping a card from the deck:", deck);
      if (deck.length === 0) {
        console.warn("No cards left in the deck to flip.");
        return context;
      }
      const currentCard = deck.shift();
      if (!currentCard) {
        console.warn("No card was flipped, deck might be empty.");
        return context;
      }
      const horseStates = { ...context.horseStates };
      if (currentCard.suit in horseStates) {
        horseStates[currentCard.suit] += 1;
      } else {
        console.warn(`Unknown suit: ${currentCard.suit}`);
      }
      return {
        currentCard: currentCard,
        horseStates: horseStates,
      };
    }),
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
    updatePlayer: assign({
      players: ({ context, event }) => {
        if (event.type !== "UPDATE_PLAYER") return context.players;
        const { player, index } = event;
        if (
          !player ||
          !player.playerName ||
          !player.betSize ||
          !player.betType ||
          !player.betSuit
        ) {
          console.warn("Invalid player data:", player);
          return context.players;
        }
        if (index < 0 || index >= context.players.length) {
          console.warn("Invalid player index:", index);
          return context.players;
        }
        const updatedPlayers = [...context.players];
        updatedPlayers[index] = player;
        return updatedPlayers;
      },
    }),
    resetRace: assign({
      currentCard: null,
      currentLegCard: null,
      horseStates: {
        Hearts: 0,
        Spades: 0,
        Clubs: 0,
        Diamonds: 0,
      },
      currentLeg: 0,
      maxHorsePosition: 8,
      minHorsePosition: 1,
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
    shuffleDeckAndDeal: assign(({ context }) => {
      const deck = generateDeck(1);
      const legs = deck.slice(0, context.maxHorsePosition);
      deck.splice(0, context.maxHorsePosition);
      return {
        deck,
        legs,
      };
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
    allHorsesReachedMinPosition: ({ context }) => {
      return Object.values(context.horseStates).every(
        (position) => position >= context.minHorsePosition
      );
    },
    hasWinner: ({ context }) => {
      // Example: check if any horse has reached max position
      return Object.values(context.horseStates).some(
        (pos) => pos >= context.maxHorsePosition
      );
    },
  },
}).createMachine({
  id: "HorseRacingLocal",
  initial: "setup",
  context: {
    players: [],
    currentCard: null,
    currentLegCard: null,
    horseStates: {
      Hearts: 0,
      Spades: 0,
      Clubs: 0,
      Diamonds: 0,
    },
    deck: [],
    legs: [],
    currentLeg: 0,
    maxHorsePosition: 8,
    minHorsePosition: 1,
  },
  states: {
    setup: {
      on: {
        UPDATE_PLAYER: {
          actions: "updatePlayer",
        },
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
      entry: ["resetRace", "shuffleDeckAndDeal"],
      initial: "racing",
      states: {
        racing: {
          on: {
            FLIP_CARD: {
              actions: "flipACard",
              target: "checkLeg",
            },
          },
        },

        checkLeg: {
          always: [
            {
              guard: "allHorsesReachedMinPosition",
              target: "flipLeg",
            },
            { target: "checkWinner" },
          ],
        },

        flipLeg: {
          entry: "flipALeg",
          always: "checkWinner",
        },

        checkWinner: {
          always: [
            {
              guard: "hasWinner",
              target: "#HorseRacingLocal.results",
            },
            { target: "racing" },
          ],
        },
      },
    },
    results: {
      on: {
        RESTART_RACE: {
          target: "racing",
        },
        BACK_TO_SETUP: {
          target: "setup",
        },
      },
    },
  },
});
