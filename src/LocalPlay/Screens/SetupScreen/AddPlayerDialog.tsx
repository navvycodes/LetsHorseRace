import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import {
  betTypeArray,
  allSuitsArray,
  type Suit,
  type BetType,
  suitIcons,
  betTypeIcons,
} from "../../State/utils/types";

export const AddPlayerDialog = ({
  open,
  handleClose,
  onAddPlayer,
}: {
  open: boolean;
  handleClose: () => void;
  onAddPlayer: (player: {
    playerName: string;
    betSize: number;
    betType: BetType;
    betSuit: Suit;
  }) => void;
}) => {
  const [playerName, setPlayerName] = useState("");
  const [betSize, setBetSize] = useState(10);
  const [betType, setBetType] = useState(betTypeArray[0]);
  const [betSuit, setBetSuit] = useState(allSuitsArray[0]);

  const handleSubmit = () => {
    onAddPlayer({ playerName, betSize, betType, betSuit });
    handleClose();
    setPlayerName("");
    setBetSize(10);
    setBetType(betTypeArray[0]);
    setBetSuit(allSuitsArray[0]);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "#1E1E1E",
            color: "#F0F0F0",
            borderRadius: 2,
          },
        },
      }}
      fullWidth={true}
    >
      <DialogTitle>Add Player</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Player Name"
            type="text"
            placeholder="Enter player name"
            fullWidth
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            variant="outlined"
            slotProps={{
              inputLabel: {
                sx: { color: "#AAAAAA" },
              },
              input: {
                sx: { color: "#F0F0F0" },
              },
            }}
          />
          <TextField
            label="Bet Size"
            type="number"
            fullWidth
            value={betSize}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (!isNaN(value) && value >= 0) {
                setBetSize(value);
              } else if (e.target.value === "") {
                setBetSize(0);
              }
            }}
            error={betSize < 0}
            helperText={betSize < 0 ? "Bet size cannot be negative" : ""}
            variant="outlined"
            slotProps={{
              htmlInput: {
                min: 0,
              },
              inputLabel: {
                sx: { color: "#AAAAAA" },
              },
              input: {
                sx: { color: "#F0F0F0" },
              },
            }}
          />

          <TextField
            select
            label="Bet Type"
            fullWidth
            value={betType}
            onChange={(e) => setBetType(e.target.value as BetType)}
            variant="outlined"
            slotProps={{
              inputLabel: {
                sx: { color: "#AAAAAA" },
              },
              input: {
                sx: { color: "#F0F0F0" },
              },
            }}
          >
            {betTypeArray.map((type) => (
              <MenuItem key={type} value={type}>
                {betTypeIcons[type]} {type}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Suit"
            fullWidth
            value={betSuit}
            onChange={(e) => setBetSuit(e.target.value as Suit)}
            variant="outlined"
            slotProps={{
              inputLabel: {
                sx: { color: "#AAAAAA" },
              },
              input: {
                sx: { color: "#F0F0F0" },
              },
            }}
          >
            {allSuitsArray.map((suit) => (
              <MenuItem key={suit} value={suit}>
                {suitIcons[suit]} {suit}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "#AAA" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#3A3A3A",
            color: "#F0F0F0",
            textTransform: "none",
            "&:hover": { backgroundColor: "#4A4A4A" },
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
