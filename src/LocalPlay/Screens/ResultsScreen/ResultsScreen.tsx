import { Box, Button, Stack, Typography } from "@mui/material";
import { useBackToSetup } from "../../State/hooks/useBackToSetup";
import { useRestartRace } from "../../State/hooks/useRestartRace";
import { useGetWinners } from "../../State/hooks/useGetWinners";
import type { PlayerRecord } from "../../State/utils/types";

export const ResultsScreen = () => {
  const winners: PlayerRecord[] = useGetWinners();
  const backToSetup = useBackToSetup();
  const restartRace = useRestartRace();
  const hasWinners = winners.length > 0;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        color: "#F0F0F0",
        pb: "80px", // space for footer
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mt: 4,
          textAlign: "center",
          textShadow: "1px 1px 4px black",
        }}
      >
        🎉 Game Results
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          mt: 2,
          px: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {hasWinners ? (
          <Stack spacing={2} sx={{ width: "100%", maxWidth: 500 }}>
            {winners.map((winner, idx) => (
              <Box
                key={idx}
                sx={{
                  backgroundColor: "#1e1e1e",
                  borderRadius: 2,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                  px: 3,
                  py: 1.5,
                  fontSize: "1.1rem",
                  textAlign: "center",
                }}
              >
                🏇 {winner.playerName} — {winner.betSize} {winner.betType} on{" "}
                {winner.betSuit}
              </Box>
            ))}
          </Stack>
        ) : (
          <Stack
            mb={10}
            alignItems="center"
            justifyContent="center"
            spacing={3}
            textAlign="center"
          >
            <Typography variant="h6" sx={{ opacity: 0.8 }}>
              No Winners This Time 💤
            </Typography>
            <Typography variant="body1" sx={{ color: "#aaa" }}>
              All bets missed the mark. Maybe your horse took a nap?
            </Typography>
            <img
              src="/icons/HorseIcon.svg"
              alt="Horse Icon"
              style={{ height: 300, opacity: 0.7 }}
            />
          </Stack>
        )}
      </Box>

      {/* Footer */}
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
          gap: 2,
          zIndex: 10,
        }}
      >
        <Button
          variant="contained"
          onClick={backToSetup}
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
          Edit Players And Bets
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={restartRace}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 2,
            px: 3,
            py: 1.5,
          }}
        >
          🚀 Restart Game
        </Button>
      </Box>
    </Box>
  );
};
