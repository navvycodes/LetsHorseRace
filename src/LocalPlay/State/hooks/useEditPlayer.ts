import type { PlayerRecord } from "../utils/types";
import { useLocalHorseRacingActor } from "./useHorseRacingActor";

export const useUpdateExistingPlayer = () => {
  const actor = useLocalHorseRacingActor();
  if (!actor) {
    throw new Error(
      "useEditPlayer must be used within a HorseRacingStateProvider"
    );
  }

  const updateExistingPlayer = (player: PlayerRecord, index: number) => {
    actor.send({ type: "UPDATE_PLAYER", player, index });
  };

  return updateExistingPlayer;
};
