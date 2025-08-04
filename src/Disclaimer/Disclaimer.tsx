import { Home } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { AdBanner } from "../Ads/AdBanner";

export const Disclaimer = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        py: { xs: 4, sm: 6 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        textAlign: "center",
      }}
    >
      <Box
        component="img"
        src="/icons/HorseIcon.svg"
        alt="Ace of Diamonds"
        sx={{
          width: { xs: 100, sm: 120, md: 150 },
          height: "auto",
          mb: 3,
        }}
      />

      <Box
        sx={{
          maxWidth: "80%",
          mt: 4,
          color: "#F0F0F0",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Disclaimer
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          This app is intended for entertainment purposes only. Any references
          to alcohol or betting (e.g., “shot betting” or “beer betting”) are
          purely fictional and should not be interpreted as encouragement to
          consume alcohol or engage in real gambling. Please drink responsibly
          and only if you are of legal drinking age in your country.
        </Typography>
      </Box>
      <Box sx={{ width: "100%", maxWidth: 300 }}>
        <Button
          fullWidth
          startIcon={<Home />}
          sx={{
            mb: 2,
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            py: { xs: 1.2, sm: 1.5 },
            backgroundColor: "#3B82F6",
            color: "#FFFFFF",
            boxShadow: "0px 4px 12px rgba(22, 22, 22, 0.8)",
            "&:hover": {
              backgroundColor: "#2563EB",
            },
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          GO HOME
        </Button>
      </Box>

      <Typography
        sx={{
          color: "#999999",
          mt: 5,
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
        }}
      >
        V 1.0.0
      </Typography>

      <Box sx={{ mt: 4, px: 2 }}>
        <AdBanner />
      </Box>
    </Box>
  );
};
