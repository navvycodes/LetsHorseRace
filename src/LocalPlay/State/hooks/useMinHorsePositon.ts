import { useSelector } from "@xstate/react";
import { useLocalHorseRacingActor } from "./useHorseRacingActor";
import { selectMinHorsePosition } from "../selectors/selectors";

export const useMinHorsePosition = () => {
  const actor = useLocalHorseRacingActor();

  if (!actor) {
    throw new Error(
      "useMinHorsePosition must be used within a HorseRacingStateProvider"
    );
  }

  return useSelector(actor, selectMinHorsePosition);
};
