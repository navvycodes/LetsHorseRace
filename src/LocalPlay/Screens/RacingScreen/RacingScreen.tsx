import {
  Box,
  Slide,
  Snackbar,
  SnackbarContent,
  Typography,
  type SlideProps,
} from "@mui/material";

import { HorseRacing } from "./HorseRacing";
import { useCurrentLegCard } from "../../State/hooks/useCurrentLegCard";
import React from "react";
import { DeckButton } from "./DeckButton";
import { useMinHorsePosition } from "../../State/hooks/useMinHorsePositon";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export const RacingScreen = () => {
  const currentLegCard = useCurrentLegCard();
  const minHorsePosition = useMinHorsePosition();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (currentLegCard) {
      setOpen(true);
    }
  }, [currentLegCard]);

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
          mt: 3,
        }}
      >
        <DeckButton />
      </Box>

      <Snackbar
        open={open && !!currentLegCard}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        slots={{
          transition: SlideTransition,
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <SnackbarContent
          sx={{
            backgroundColor: "#2C2C2C",
            color: "#F0F0F0",
            px: 2,
            py: 1.5,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "auto",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.6)",
          }}
          message={
            currentLegCard ? (
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                textAlign={"center"}
              >
                <img
                  src={`/svgcards/${currentLegCard.suit.toLowerCase()}_${currentLegCard.rank.toLowerCase()}.svg`}
                  alt={`${currentLegCard.rank} of ${currentLegCard.suit}`}
                  style={{ height: 50, width: 35, objectFit: "contain" }}
                />
                <Typography variant="body2">
                  <strong>
                    {" "}
                    All cards have hit position {minHorsePosition + 1}
                  </strong>
                  <br />
                  <strong>{currentLegCard.rank.toUpperCase()}</strong> of{" "}
                  <strong>{currentLegCard.suit.toUpperCase()}</strong> flipped
                  <br />
                  Suit moves <strong>back 1 step!</strong>
                </Typography>
              </Box>
            ) : null
          }
        />
      </Snackbar>
    </Box>
  );
};
