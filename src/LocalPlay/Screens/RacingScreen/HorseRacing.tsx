import { Stack } from "@mui/material";
import { useHorseStates } from "../../State/hooks/useHorseStates";
import { useMaxHorsePosition } from "../../State/hooks/useMaxHorsePosition";
import { allSuitsArray } from "../../State/utils/types";
import { SuitBox } from "./SuitBox";

export const HorseRacing = () => {
  const horseStates = useHorseStates();
  const maxHorsePosition = useMaxHorsePosition();
  return (
    <Stack>
      {allSuitsArray.map((suit) => (
        <SuitBox
          key={suit}
          suit={suit}
          maxHorsePosition={maxHorsePosition}
          currentPosition={horseStates[suit]}
        />
      ))}
    </Stack>
  );
};
