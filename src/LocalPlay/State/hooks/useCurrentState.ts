import { useSelector } from "@xstate/react";
import { useLocalHorseRacingActor } from "./useHorseRacingActor";

export const useCurrentState = () => {
  const actor = useLocalHorseRacingActor();
  if (!actor) {
    throw new Error(
      "useCurrentState must be used within a HorseRacingStateProvider"
    );
  }
  const currentState = useSelector(actor, (state) => state.value);
  return currentState;
};
