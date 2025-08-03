import { useLocalHorseRacingActor } from "./useHorseRacingActor";

export const useRemovePlayer = () => {
  const actor = useLocalHorseRacingActor();

  const removePlayer = (index: number) => {
    actor.send({ type: "REMOVE_PLAYER", index });
  };

  return removePlayer;
};
