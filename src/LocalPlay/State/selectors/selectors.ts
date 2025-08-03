import type { HorseRacingGameContext, PlayerRecord } from "../utils/types";

export const selectPlayers = ({
  context,
}: {
  context: HorseRacingGameContext;
}): PlayerRecord[] => {
  return context.players;
};
