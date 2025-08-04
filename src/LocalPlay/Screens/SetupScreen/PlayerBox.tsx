import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import type { PlayerRecord } from "../../State/utils/types";

export const PlayerBox = ({
  player,
  index,
  handleRemovePlayer,
}: {
  player: PlayerRecord;
  index: number | undefined;
  handleRemovePlayer: (index: number) => void;
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
        backgroundColor: "#2F2F2F", // slightly lighter than background
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)", // subtle shadow
        border: "1px solid #3A3A3A", // soft border for definition
        color: "#F0F0F0", // light text for readability
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
            console.log("Edit player", index);
          }}
          sx={{ color: "#F0F0F0" }} // light color for icon
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          color="error"
          onClick={() => {
            if (index !== undefined) {
              console.log("Remove player", index); // Debug log
              handleRemovePlayer(index);
            }
          }}
          sx={{ color: "#F0F0F0" }} // light color for icon
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
