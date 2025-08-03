import { AddPlayersScreen } from "./Screens/AddPlayersAndBets/AddPlayersScreen";
import { useLocalHorseRacingActor } from "./State/hooks/useHorseRacingActor";
import { HorseRacingStateProvider } from "./State/HorseRacingLocalContextProvider";

const LocalPlay = () => {
  const actor = useLocalHorseRacingActor();
  const currentState = actor.getSnapshot().value;
  console.log("Current State:", currentState);

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
