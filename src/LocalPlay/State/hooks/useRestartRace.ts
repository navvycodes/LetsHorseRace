import { useLocalHorseRacingActor } from "./useHorseRacingActor";

export const useRestartRace = () => {
  const actor = useLocalHorseRacingActor();
  if (!actor) {
    throw new Error(
      "useRestartRace must be used within a HorseRacingStateProvider"
    );
  }

  const restartRace = () => {
    actor.send({ type: "RESTART_RACE" });
  };

  return restartRace;
};
