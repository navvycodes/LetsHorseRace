// gameContext.ts

import { Actor } from "xstate";
import { HorseRacingLocalStateMachine } from "./HorseRacingLocalStateMachine";
import React from "react";
import { useActorRef } from "@xstate/react";

type HorseMachineType = typeof HorseRacingLocalStateMachine;
type HorseRacingContextValue = Actor<HorseMachineType>;
export const LocalHorseRacingContext =
  React.createContext<HorseRacingContextValue>({} as Actor<HorseMachineType>);

export const HorseRacingStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const actorRef = useActorRef(HorseRacingLocalStateMachine);
  return (
    <LocalHorseRacingContext.Provider value={actorRef}>
      {children}
    </LocalHorseRacingContext.Provider>
  );
};
