import { useLocalHorseRacingActor } from "./useHorseRacingActor";

export const useMaxHorsePosition = () => {
  const actor = useLocalHorseRacingActor();

  const maxHorsePosition = actor.getSnapshot().context.maxHorsePosition;

  return maxHorsePosition;
};
