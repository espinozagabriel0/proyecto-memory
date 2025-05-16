"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type AppContextProps = {
  started: boolean;
  setStarted: Dispatch<SetStateAction<boolean>>;
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
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
};

const defaultValues: AppContextProps = {
  started: false,
  setStarted: () => {},
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
  users: [],
  setUsers: () => {},
  currentUser: null,
  setCurrentUser: () => {},
};

type Card = {
  id: number;
  uniqueId: string;
  name: string;
  url: string;
};

type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
};

const AppContext = createContext<AppContextProps>(defaultValues);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [started, setStarted] = useState(false);
  const [globalTimer, setGlobalTimer] = useState(20);
  const [globalClicks, setGlobalClicks] = useState(0);
  const [globalPoints, setGlobalPoints] = useState(0);

  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  useEffect(() => {
    console.log("Global Points:", globalPoints);
  }, [globalPoints]);

  // auth
  const defaultUsers = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@email.com",
      password: "juan1234",
    },
    {
      id: 2,
      name: "María García",
      email: "maria.garcia@email.com",
      password: "maria5678",
    },
    {
      id: 3,
      name: "Carlos López",
      email: "carlos.lopez@email.com",
      password: "carlos91011",
    },
  ];

  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // usuarios
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        setUsers(defaultUsers);
      }

      // usuario actual
      const storedCurrentUser = localStorage.getItem("currentUser");
      if (storedCurrentUser) {
        setCurrentUser(JSON.parse(storedCurrentUser));
      } else {
        setCurrentUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AppContext.Provider
      value={{
        started,
        setStarted,
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
        users,
        setUsers,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
