import { useSelector } from "@xstate/react";
import { useLocalHorseRacingActor } from "./useHorseRacingActor";
import { selectCurrentCard } from "../selectors/selectors";

export const useCurrentCard = () => {
  const actor = useLocalHorseRacingActor();
  if (!actor) {
    throw new Error(
      "useCurrentCard must be used within a HorseRacingStateProvider"
    );
  }
  return useSelector(actor, selectCurrentCard);
};
