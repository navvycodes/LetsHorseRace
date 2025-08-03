import { useLocalHorseRacingActor } from "./useHorseRacingActor";

export const useFlipCard = () => {
  const actor = useLocalHorseRacingActor();

  if (!actor) {
    throw new Error(
      "useFlipCard must be used within a HorseRacingStateProvider"
    );
  }

  const flipCard = () => {
    actor.send({ type: "FLIP_CARD" });
  };

  return flipCard;
};
