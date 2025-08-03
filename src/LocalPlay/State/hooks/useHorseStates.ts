import { useSelector } from "@xstate/react";
import { useLocalHorseRacingActor } from "./useHorseRacingActor";
import { selectHorseStates } from "../selectors/selectors";

export const useHorseStates = () => {
  const actor = useLocalHorseRacingActor();
  if (!actor) {
    throw new Error(
      "useHorseStates must be used within a HorseRacingStateProvider"
    );
  }
  return useSelector(actor, selectHorseStates);
};
