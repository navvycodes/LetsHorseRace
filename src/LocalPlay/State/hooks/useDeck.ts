import { useSelector } from "@xstate/react";
import { useLocalHorseRacingActor } from "./useHorseRacingActor";

export const useDeck = () => {
  const actor = useLocalHorseRacingActor();
  if (!actor) {
    throw new Error("useDeck must be used within a HorseRacingStateProvider");
  }

  const deck = useSelector(actor, (state) => state.context.deck);

  return deck;
};
