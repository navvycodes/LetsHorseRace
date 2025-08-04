import { Stack, Typography } from "@mui/material";

import type { PlayerRecord } from "../../State/utils/types";
import { PlayerBox } from "./PlayerBox";

export const CurrentPlayersList = ({
  players,
  handleRemovePlayer,
  handleEditPlayer,
}: {
  players: PlayerRecord[];
  handleRemovePlayer: (index: number) => void;
  handleEditPlayer: (index: number) => void;
}) => {
  return (
    <Stack
      sx={{
        overflowY: "auto",
        overflowX: "hidden",
        maxHeight: "60vh",
        width: "100%",
      }}
    >
      {players.length === 0 && (
        <Typography
          sx={{ color: "#B0B0B0" }}
          textOverflow="ellipsis"
          textAlign={"center"}
        >
          No players added yet. Click "Add Player" to start.
        </Typography>
      )}
      {players.map((player, index) => (
        <PlayerBox
          key={index}
          player={player}
          index={index}
          handleRemovePlayer={handleRemovePlayer}
          handleEditPlayer={handleEditPlayer}
        />
      ))}
    </Stack>
  );
};
