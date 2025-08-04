import { Box, Button, Typography } from "@mui/material";
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

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAddPlayer = (player: PlayerRecord) => {
    addNewPlayer(player);
    handleClose();
  };
  const handleRemovePlayer = (index: number) => {
    removePlayer(index);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "#F0F0F0",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "80px",
      }}
    >
      {/* Top Title */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
          mt: 4,
          mb: 2,
          textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
        }}
      >
        Let's Horse Race (Local Play)
      </Typography>

      {/* Player List Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Typography variant="h6" sx={{ color: "#CCCCCC", mb: 1 }}>
          Players
        </Typography>
        <Box
          sx={{
            width: "80%",
            mx: "auto",
            bgcolor: "#1e1e1e",
            p: 2,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          <CurrentPlayersList
            players={players}
            handleRemovePlayer={handleRemovePlayer}
          />
        </Box>
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          py: 2,
          backgroundColor: "#1c1c1c",
          borderTop: "1px solid #333",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          zIndex: 100,
        }}
      >
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            backgroundColor: "#444",
            color: "#ddd",
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 2,
            px: 3,
            py: 1.5,
            "&:hover": {
              backgroundColor: "#555",
            },
          }}
        >
          ➕ Add Player
        </Button>

        <Button
          variant="contained"
          color="primary"
          disabled={players.length < 1}
          onClick={startRace}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 2,
            px: 3,
            py: 1.5,
          }}
        >
          🚀 Start Game
        </Button>
      </Box>

      <AddPlayerDialog
        open={open}
        handleClose={handleClose}
        onAddPlayer={handleAddPlayer}
      />
    </Box>
  );
};
