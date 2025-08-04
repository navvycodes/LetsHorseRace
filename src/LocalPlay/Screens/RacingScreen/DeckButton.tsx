import { Box } from "@mui/material";
import { useCurrentCard } from "../../State/hooks/useCurrentCard";
import { useFlipCard } from "../../State/hooks/useFlipCard";

export const DeckButton = () => {
  const currentCard = useCurrentCard();
  const flipCard = useFlipCard();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        onClick={flipCard}
        sx={{
          width: 140,
          height: 200,
          position: "relative",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          },
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
      {currentCard && (
        <img
          src={`/svgcards/${currentCard.suit.toLowerCase()}_${currentCard.rank.toLowerCase()}.svg`}
          alt={`${currentCard.rank} of ${currentCard.suit}`}
          style={{ width: 140, height: 200, objectFit: "contain" }}
        />
      )}
    </Box>
  );
};
