import { useSelector } from "@xstate/react";
import { selectAutoPlayInterval } from "../selectors/selectors";
import { useLocalHorseRacingActor } from "./useHorseRacingActor";

export const useAutoPlaySpeed = () => {
  const actor = useLocalHorseRacingActor();

  if (!actor) {
    throw new Error(
      "useAutoPlaySpeed must be used within a HorseRacingStateProvider"
    );
  }

  const autoPlayInterval = useSelector(actor, selectAutoPlayInterval);
  const setAutoPlayInterval = (interval: number) => {
    actor.send({ type: "SET_AUTOPLAY_INTERVAL", value: interval });
  };

  return { autoPlayInterval, setAutoPlayInterval };
};
