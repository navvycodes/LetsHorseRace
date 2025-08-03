import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useAddNewPlayer } from "../../State/hooks/useAddNewPlayer";
import { usePlayers } from "../../State/hooks/usePlayers";
import type { PlayerRecord } from "../../State/utils/types";
import { AddPlayerDialog } from "./AddPlayerDialog";
import { CurrentPlayersList } from "./CurrentPlayersList";
import { useStartRace } from "../../State/hooks/useStartRace";
import { useRemovePlayer } from "../../State/hooks/useRemovePlayer";

export const SetupScreen = () => {
  const players = usePlayers();
  const startRace = useStartRace();
  const addNewPlayer = useAddNewPlayer();
  const removePlayer = useRemovePlayer();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddPlayer = (player: PlayerRecord) => {
    addNewPlayer(player);
    handleClose();
  };
  const handleRemovePlayer = (index: number) => {
    removePlayer(index);
  };

  return (
    <>
      <Stack
        sx={{
          justifyContent: "center",
          display: "flex",
          alignSelf: "center",
          padding: 6,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#F0F0F0",
            mb: 1,
          }}
        >
          Players
        </Typography>
        <CurrentPlayersList
          players={players}
          handleRemovePlayer={handleRemovePlayer}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mb: 2,
            mt: 2,
            py: 1.5,
            fontWeight: "medium",
            fontSize: "1rem",
            backgroundColor: "#3A3A3A", // dark gray button
            color: "#7b7b7bff", // light text
            textTransform: "none",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
            "&:hover": {
              backgroundColor: "#4A4A4A", // subtle hover
            },
            "&:disabled": {
              backgroundColor: "#2A2A2A",
              color: "#777",
            },
          }}
          onClick={handleClickOpen}
        >
          ➕ Add Player
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => {
            startRace();
          }}
        >
          Start Game
        </Button>
      </Stack>
      <AddPlayerDialog
        open={open}
        handleClose={handleClose}
        onAddPlayer={handleAddPlayer}
      />
    </>
  );
};
