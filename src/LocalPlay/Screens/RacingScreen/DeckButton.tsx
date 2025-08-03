import { Box } from "@mui/material";

export const DeckButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 140,
        height: 200,
        position: "relative",
        cursor: "pointer",
      }}
    >
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          component="div"
          sx={{
            position: "absolute",
            top: i * 2,
            left: i * 2,
            width: "100%",
            height: "100%",
            borderRadius: 2,
            backgroundColor: "#1c1c1c",
            backgroundImage: `url("/svgcards/back_card.svg")`,
            backgroundSize: "cover",
            boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
            zIndex: 3 - i,
          }}
        />
      ))}
    </Box>
  );
};
