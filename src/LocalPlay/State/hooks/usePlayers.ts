import { useSelector } from "@xstate/react";
import { selectPlayers } from "../selectors/selectors";
import type { PlayerRecord } from "../utils/types";
import { useLocalHorseRacingActor } from "./useHorseRacingActor";

export function usePlayers(): PlayerRecord[] {
  const actor = useLocalHorseRacingActor();
  if (!actor) {
    throw new Error(
      "usePlayers must be used within a HorseRacingStateProvider"
    );
  }
  return useSelector(actor, selectPlayers);
}
