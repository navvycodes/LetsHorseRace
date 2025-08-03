import { AddPlayersScreen } from "./Screens/AddPlayersAndBets/AddPlayersScreen";
import { useCurrentState } from "./State/hooks/useCurrentState";
import { HorseRacingStateProvider } from "./State/HorseRacingLocalContextProvider";

const LocalPlay = () => {
  const currentState = useCurrentState();

  if (currentState === "setup") {
    return <AddPlayersScreen />;
  }
  return null;
};

export const LocalPlayWrapper = () => {
  return (
    <HorseRacingStateProvider>
      <LocalPlay />
    </HorseRacingStateProvider>
  );
};
