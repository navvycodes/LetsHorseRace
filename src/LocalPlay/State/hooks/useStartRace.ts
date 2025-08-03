import { useLocalHorseRacingActor } from "./useHorseRacingActor";

export const useStartRace = () => {
  const actor = useLocalHorseRacingActor();
  if (!actor) {
    throw new Error(
      "useStartRace must be used within a HorseRacingStateProvider"
    );
  }
  const startRace = () => {
    console.log("Starting race...");
    actor.send({ type: "START_RACE" });
  };
  return startRace;
};
