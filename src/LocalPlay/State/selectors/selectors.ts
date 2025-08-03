import type {
  HorseRacingGameContext,
  HorseState,
  PlayerRecord,
  Card,
} from "../utils/types";

export const selectPlayers = ({
  context,
}: {
  context: HorseRacingGameContext;
}): PlayerRecord[] => {
  return context.players;
};

export const selectHorseStates = ({
  context,
}: {
  context: HorseRacingGameContext;
}): HorseState => {
  return context.horseStates;
};

export const selectLegs = ({
  context,
}: {
  context: HorseRacingGameContext;
}): Card[] => {
  return context.legs;
};

export const selectMaxHorsePosition = ({
  context,
}: {
  context: HorseRacingGameContext;
}): number => {
  return context.maxHorsePosition;
};
