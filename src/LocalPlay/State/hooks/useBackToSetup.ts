import { useLocalHorseRacingActor } from "./useHorseRacingActor";

export const useBackToSetup = () => {
  const actor = useLocalHorseRacingActor();
  if (!actor) {
    throw new Error(
      "useBackToSetup must be used within a HorseRacingStateProvider"
    );
  }

  const backToSetup = () => {
    actor.send({ type: "BACK_TO_SETUP" });
  };

  return backToSetup;
};
