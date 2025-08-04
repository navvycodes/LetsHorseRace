import { Box, Button, Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import { useNavigate } from "react-router";

export const Home = () => {
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

      <Typography
        sx={{
          color: "white",
          mb: 3,
          fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" },
          fontWeight: 500,
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Let's Horse Race
      </Typography>

      <Box sx={{ width: "100%", maxWidth: 300 }}>
        <Button
          fullWidth
          startIcon={<VideogameAssetIcon />}
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
            navigate("/local-play");
          }}
        >
          Local Play
        </Button>

        <Button
          fullWidth
          startIcon={<CloudIcon />}
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            py: { xs: 1.2, sm: 1.5 },
            backgroundColor: "#2C2C2C",
            color: "#F1F1F1",
            boxShadow: "0px 4px 12px rgba(22, 22, 22, 0.8)",
            "&:hover": {
              backgroundColor: "#1F1F1F",
            },
          }}
          onClick={() => {
            navigate("/online-play");
          }}
        >
          Online Play
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
    </Box>
  );
};
