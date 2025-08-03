import { useContext } from "react";
import { LocalHorseRacingContext } from "../HorseRacingLocalContextProvider";

export const useLocalHorseRacingActor = () => {
  const actor = useContext(LocalHorseRacingContext);
  return actor;
};
