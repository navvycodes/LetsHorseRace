import { useHorseStates } from "./useHorseStates";
import { useMaxHorsePosition } from "./useMaxHorsePosition";
import { usePlayers } from "./usePlayers";

export const useGetWinners = () => {
  const players = usePlayers();
  const horseStates = useHorseStates();
  const maxHorsePosition = useMaxHorsePosition();
  console.log("Horse States:", horseStates);
  console.log("Max Horse Position:", maxHorsePosition);
  console.log("Players:", players);
  const winningSuits = Object.entries(horseStates)
    .filter(([_, position]) => position >= maxHorsePosition)
    .map(([suit]) => suit);
  console.log("Winning Suits:", winningSuits);

  const winners = players.filter((player) =>
    winningSuits.includes(player.betSuit)
  );

  return winners;
};
