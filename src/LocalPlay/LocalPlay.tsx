import { Box, CircularProgress } from "@mui/material";
import { RacingScreen } from "./Screens/RacingScreen/RacingScreen";
import { SetupScreen } from "./Screens/SetupScreen/SetupScreen";
import { useCurrentState } from "./State/hooks/useCurrentState";
import { HorseRacingStateProvider } from "./State/HorseRacingLocalContextProvider";
import { ResultsScreen } from "./Screens/ResultsScreen/ResultsScreen";

const LocalPlay = () => {
  const currentState = useCurrentState();
  if (currentState === "setup") {
    return <SetupScreen />;
  } else if (typeof currentState === "object" && "racing" in currentState) {
    return <RacingScreen />;
  } else if (currentState === "results") {
    return <ResultsScreen />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress
        color="primary"
        sx={{
          width: 120,
          height: 120,
        }}
      />
    </Box>
  );
};

export const LocalPlayWrapper = () => {
  return (
    <HorseRacingStateProvider>
      <LocalPlay />
    </HorseRacingStateProvider>
  );
};
