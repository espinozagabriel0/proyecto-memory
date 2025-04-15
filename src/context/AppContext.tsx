"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type AppContextProps = {
  globalTimer: number;
  setGlobalTimer: Dispatch<SetStateAction<number>>;
  globalClicks: number;
  setGlobalClicks: Dispatch<SetStateAction<number>>;
  globalPoints: number;
  setGlobalPoints: Dispatch<SetStateAction<number>>;
  flippedCards: Card[];
  setFlippedCards: Dispatch<SetStateAction<Card[]>>;
  flippedIds: string[]; 
  setFlippedIds: Dispatch<SetStateAction<string[]>>;
  matchedCards: number[]; 
  setMatchedCards: Dispatch<SetStateAction<number[]>>;
};

const defaultValues: AppContextProps = {
  globalTimer: 0,
  setGlobalTimer: () => {},
  globalClicks: 0,
  setGlobalClicks: () => {},
  globalPoints: 0,
  setGlobalPoints: () => {},
  flippedCards: [],
  setFlippedCards: () => {},
  flippedIds: [],
  setFlippedIds: () => {},
  matchedCards: [],
  setMatchedCards: () => {},
};

type Card = {
  id: number;
  uniqueId: string;
  nom: string;
  imatge: string;
};

const AppContext = createContext<AppContextProps>(defaultValues);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [globalTimer, setGlobalTimer] = useState(20);
  const [globalClicks, setGlobalClicks] = useState(0);
  const [globalPoints, setGlobalPoints] = useState(0);

  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  return (
    <AppContext.Provider
      value={{
        globalTimer,
        setGlobalTimer,
        globalClicks,
        setGlobalClicks,
        globalPoints,
        setGlobalPoints,
        flippedCards,
        setFlippedCards,
        flippedIds,
        setFlippedIds,
        matchedCards,
        setMatchedCards,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
