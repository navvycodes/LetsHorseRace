import { Box } from "@mui/material";
import { useState } from "react";
import { DeckButton } from "./DeckButton";

export const CardFlipButton = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box
      sx={{
        perspective: 1000,
        width: 80, // match the race cards' dimensions
        height: 120,
        mx: "auto",
        mt: 2,
        cursor: "pointer",
        position: "relative",
      }}
      onClick={() => setFlipped(!flipped)}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.5s ease-in-out",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Back of card */}
        <Box
          component="img"
          src="/svgcards/spades_ace.svg" // <- replace with dynamic card if needed
          alt="Card Back"
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            borderRadius: 2,
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        />

        {/* Front of card */}
        <Box
          component="img"
          src="/svgcards/spades_ace.svg" // <- replace with dynamic card if needed
          alt="Card Front"
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            borderRadius: 2,
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        />
      </Box>
    </Box>
  );
};
