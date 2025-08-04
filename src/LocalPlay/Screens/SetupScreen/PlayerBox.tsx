import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import type { PlayerRecord } from "../../State/utils/types";

export const PlayerBox = ({
  player,
  index,
  handleRemovePlayer,
  handleEditPlayer,
}: {
  player: PlayerRecord;
  index: number | undefined;
  handleRemovePlayer: (index: number) => void;
  handleEditPlayer: (index: number) => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        p: 1,
        mb: 1,
        flexShrink: 1,
        borderRadius: 2,
        backgroundColor: "#2F2F2F",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
        border: "1px solid #3A3A3A",
        color: "#F0F0F0",
      }}
    >
      <Stack maxWidth={"60%"}>
        <Typography textOverflow="ellipsis" noWrap={true} overflow={"hidden"}>
          {player.playerName}
        </Typography>
        <Typography
          sx={{
            color: "#B0B0B0",
          }}
        >
          {player.betSize} {player.betType} on {player.betSuit}
        </Typography>
      </Stack>

      <Box sx={{ display: "flex", gap: 1, ml: "auto", marginRight: 1 }}>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => {
            if (index !== undefined) {
              handleEditPlayer(index);
            }
          }}
          sx={{ color: "#F0F0F0" }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          color="error"
          onClick={() => {
            if (index !== undefined) {
              handleRemovePlayer(index);
            }
          }}
          sx={{ color: "#F0F0F0" }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
