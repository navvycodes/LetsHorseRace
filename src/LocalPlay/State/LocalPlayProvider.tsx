import { createContext, useContext, useState, type ReactNode } from "react";

// Define your context value type
interface LocalPlayContextType {
  playerName: string;
  setPlayerName: (name: string) => void;
}

// Create the context
const LocalPlayContext = createContext<LocalPlayContextType | undefined>(
  undefined
);

// Provider component
export const LocalPlayProvider = ({ children }: { children: ReactNode }) => {
  const [playerName, setPlayerName] = useState("");

  return (
    <LocalPlayContext.Provider value={{ playerName, setPlayerName }}>
      {children}
    </LocalPlayContext.Provider>
  );
};

// Custom hook for consuming the context
export const useLocalPlay = () => {
  const context = useContext(LocalPlayContext);
  if (!context) {
    throw new Error("useLocalPlay must be used within a LocalPlayProvider");
  }
  return context;
};
