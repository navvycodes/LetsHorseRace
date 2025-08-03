import { Box, Button } from "@mui/material";

import { HorseRacing } from "./HorseRacing";

import { useFlipCard } from "../../State/hooks/useFlipCard";

export const RacingScreen = () => {
  const flipCard = useFlipCard();
  return (
    <Box
      sx={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        margin: "auto",
        padding: 6,
      }}
    >
      <HorseRacing />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: 3, // optional margin top
        }}
      >
        <Button onClick={flipCard}> Flip Card </Button>
      </Box>
    </Box>
  );
};
