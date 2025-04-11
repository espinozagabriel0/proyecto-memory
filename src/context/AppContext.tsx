"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type AppContextProps = {
    globalTimer: number,
    setGlobalTimer: Dispatch<SetStateAction<number>>;
    globalClicks: number,
    setGlobalClicks: Dispatch<SetStateAction<number>>;
    globalPoints: number,
    setGlobalPoints: Dispatch<SetStateAction<number>>;

}
  
const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode}) => {
  const [globalTimer, setGlobalTimer] = useState(20);
  const [globalClicks, setGlobalClicks] = useState(0);
  const [globalPoints, setGlobalPoints] = useState(0);

  return (
    <AppContext.Provider
      value={{
        globalTimer, 
        setGlobalTimer,
        globalClicks,
        setGlobalClicks,
        globalPoints, 
        setGlobalPoints
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
