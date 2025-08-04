import { useSelector } from "@xstate/react";
import { useLocalHorseRacingActor } from "./useHorseRacingActor";
import { selectCurrentLegCard } from "../selectors/selectors";

export const useCurrentLegCard = () => {
  const actor = useLocalHorseRacingActor();
  if (!actor) {
    throw new Error(
      "useCurrentLegCard must be used within a HorseRacingStateProvider"
    );
  }
  return useSelector(actor, selectCurrentLegCard);
};
