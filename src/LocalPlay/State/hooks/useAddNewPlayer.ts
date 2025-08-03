import type { PlayerRecord } from "../utils/types";
import { useLocalHorseRacingActor } from "./useHorseRacingActor";

export const useAddNewPlayer = () => {
  const actor = useLocalHorseRacingActor();
  if (!actor) {
    throw new Error(
      "useAddNewPlayer must be used within a HorseRacingStateProvider"
    );
  }

  const addNewPlayer = (player: PlayerRecord) => {
    actor.send({ type: "ADD_PLAYER", player });
  };

  return addNewPlayer;
};
