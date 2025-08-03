import { useLocalHorseRacingActor } from "./useHorseRacingActor";

export const useLegs = () => {
  const actor = useLocalHorseRacingActor();

  const legs = actor.getSnapshot().context.legs;

  return legs;
};
