import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import type { Suit } from "../../State/utils/types";

const aceCardImages: Record<Suit, string> = {
  Hearts: "/svgcards/hearts_ace.svg",
  Spades: "/svgcards/spades_ace.svg",
  Diamonds: "/svgcards/diamonds_ace.svg",
  Clubs: "/svgcards/clubs_ace.svg",
};

const horseIcon = "/icons/HorseProgress.svg";

export const SuitBox = ({
  suit,
  maxHorsePosition,
  currentPosition,
}: {
  suit: Suit;
  maxHorsePosition: number;
  currentPosition: number;
}) => {
  const progressPercent = (currentPosition / maxHorsePosition) * 100;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        mt: 2,
        mb: 2,
        textAlign: "left",
        borderRadius: 2,
        backgroundColor: "#2F2F2F",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
        border: "1px solid #3A3A3A",
        height: "100%",
      }}
    >
      <Box
        component="img"
        src={aceCardImages[suit]}
        alt={`Ace of ${suit}`}
        sx={{ width: 48, height: 64, objectFit: "contain" }}
      />

      <Stack flex={1} spacing={2}>
        <Typography variant="subtitle2" color="#F0F0F0" fontWeight={600}>
          {suit}
        </Typography>

        <Box sx={{ position: "relative", width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{
              height: 10,
              borderRadius: 4,
              backgroundColor: "#3A3A3A",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                backgroundColor: "#00B0FF",
              },
            }}
          />
          {/* Horse icon over progress */}
          <Box
            component="img"
            src={horseIcon}
            alt="Horse"
            sx={{
              position: "absolute",
              top: -18,
              left: `${progressPercent}%`,
              transform: "translateX(-50%)",
              width: 28,
              height: 28,
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};
