import {
  Box,
  Slide,
  Slider,
  Snackbar,
  SnackbarContent,
  Switch,
  Typography,
  IconButton,
  ClickAwayListener,
  Tooltip,
  type SlideProps,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";

import { HorseRacing } from "./HorseRacing";
import { DeckButton } from "./DeckButton";

import { useCurrentLegCard } from "../../State/hooks/useCurrentLegCard";
import { useMinHorsePosition } from "../../State/hooks/useMinHorsePositon";
import { useFlipCard } from "../../State/hooks/useFlipCard";
import { useAutoPlay } from "../../State/hooks/useAutoPlay";
import { useAutoPlaySpeed } from "../../State/hooks/useAutoPlaySpeed";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export const RacingScreen = () => {
  const currentLegCard = useCurrentLegCard();
  const minHorsePosition = useMinHorsePosition();
  const flipCard = useFlipCard();
  const [open, setOpen] = React.useState(false);
  const { autoPlay, toggleAutoPlay } = useAutoPlay();
  const { autoPlayInterval, setAutoPlayInterval } = useAutoPlaySpeed();
  const [showSettings, setShowSettings] = React.useState(false);

  const handleCardClick = () => {
    if (!autoPlay) {
      flipCard();
    }
  };

  React.useEffect(() => {
    if (currentLegCard) {
      setOpen(true);
    }
  }, [currentLegCard]);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (autoPlay) {
      interval = setInterval(() => {
        flipCard();
      }, autoPlayInterval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, autoPlayInterval]);

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
          mt: 2,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <DeckButton handleCardClick={handleCardClick} />
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#B0B0B0",
            mt: 2,
            textAlign: "center",
            textSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            maxWidth: 400,
          }}
        >
          Click the deck to draw a card, or set Autoplay in the settings (top
          right). Autoplay is currently{" "}
          <strong>{autoPlay ? "ON" : "OFF"}</strong>. The speed is set to{" "}
          <strong>
            {((autoPlayInterval as number) / 1000).toFixed(1)} seconds
          </strong>
          .
        </Typography>
      </Box>

      <Tooltip title="Settings">
        <IconButton
          onClick={() => setShowSettings((prev) => !prev)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "#ffffffcc",
            zIndex: 10,
            "&:hover": { backgroundColor: "#ffffffee" },
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>

      {showSettings && (
        <ClickAwayListener onClickAway={() => setShowSettings(false)}>
          <Box
            sx={{
              position: "absolute",
              top: 60,
              right: 16,
              backgroundColor: "#f4f4f4",
              borderRadius: 2,
              p: 2,
              boxShadow: 3,
              minWidth: 220,
              zIndex: 9,
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Autoplay Settings
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={1}
            >
              <Typography variant="body2">Autoplay</Typography>
              <Switch
                checked={autoPlay}
                onChange={() => toggleAutoPlay()}
                size="small"
              />
            </Box>

            <Typography variant="body2" gutterBottom>
              Speed: {((autoPlayInterval as number) / 1000).toFixed(1)}s
            </Typography>

            <Slider
              size="small"
              value={autoPlayInterval}
              onChange={(_e, newValue) =>
                setAutoPlayInterval(newValue as number)
              }
              min={500}
              max={20000}
              step={100}
              valueLabelDisplay="auto"
            />
          </Box>
        </ClickAwayListener>
      )}

      <Snackbar
        open={open && !!currentLegCard}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        slots={{ transition: SlideTransition }}
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
              <Box display="flex" alignItems="center" gap={2}>
                <img
                  src={`/svgcards/${currentLegCard.suit.toLowerCase()}_${currentLegCard.rank.toLowerCase()}.svg`}
                  alt={`${currentLegCard.rank} of ${currentLegCard.suit}`}
                  style={{ height: 50, width: 35, objectFit: "contain" }}
                />
                <Typography variant="body2">
                  <strong>
                    All cards have hit position {minHorsePosition + 1}
                  </strong>
                  <br />
                  <strong>{currentLegCard.rank.toUpperCase()}</strong> of{" "}
                  <strong>{currentLegCard.suit.toUpperCase()}</strong> flipped
                  <br />
                  {currentLegCard.suit.toUpperCase()} moves{" "}
                  <strong>back 1 step!</strong>
                </Typography>
              </Box>
            ) : null
          }
        />
      </Snackbar>
    </Box>
  );
};
