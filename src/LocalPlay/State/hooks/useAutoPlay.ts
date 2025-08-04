import { useSelector } from "@xstate/react";
import { useLocalHorseRacingActor } from "./useHorseRacingActor";
import { selectAutoPlay } from "../selectors/selectors";

export const useAutoPlay = () => {
  const actor = useLocalHorseRacingActor();

  if (!actor) {
    throw new Error(
      "useAutoPlay must be used within a HorseRacingStateProvider"
    );
  }
  const autoPlay = useSelector(actor, selectAutoPlay);
  const toggleAutoPlay = () => {
    actor.send({ type: "TOGGLE_AUTOPLAY" });
  };

  return { autoPlay, toggleAutoPlay };
};
