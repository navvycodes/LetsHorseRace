export type BetType = "SHOTS" | "SIPS" | "BEERS" | "WATER";
export type Suit = "Hearts" | "Diamonds" | "Clubs" | "Spades";
export const betTypeArray: BetType[] = ["SHOTS", "SIPS", "BEERS", "WATER"];
export const allSuitsArray: Suit[] = ["Hearts", "Diamonds", "Clubs", "Spades"];
export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "Jack"
  | "Queen"
  | "King";
export type PlayerRecord = {
  playerName: string;
  betSize: number;
  betType: BetType;
  betSuit: Suit;
};

export const suitIcons: Record<string, string> = {
  Hearts: "♥️",
  Spades: "♠️",
  Diamonds: "♦️",
  Clubs: "♣️",
};
export const betTypeIcons: Record<BetType, string> = {
  SHOTS: "🥃",
  SIPS: "🍷",
  BEERS: "🍺",
  WATER: "💧",
};

export type Card = {
  suit: Suit;
  rank: Rank;
};

export interface HorseState {
  Hearts: number;
  Diamonds: number;
  Clubs: number;
  Spades: number;
}

export type HorseRacingGameContext = {
  players: PlayerRecord[];
  currentCard: Card | null;
  horseStates: HorseState;
  deck: Card[];
  legs: Card[];
  currentLeg: number;
  maxHorsePosition: number;
};

export type GameEvent =
  | { type: "ADD_PLAYER"; player: PlayerRecord }
  | { type: "REMOVE_PLAYER"; index: number }
  | { type: "UPDATE_PLAYER"; index: number; player: PlayerRecord }
  | { type: "START_RACE" }
  | { type: "FLIP_CARD" }
  | { type: "RESTART" };
