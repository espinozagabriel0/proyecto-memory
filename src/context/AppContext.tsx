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
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  userData: UserDataRetrieved | null;
  logout: () => Promise<void>;
  getProfile: () => Promise<void>;
  currentGameId: number | null;
  setCurrentGameId: Dispatch<SetStateAction<number | null>>;
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
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userData: null,
  logout: async () => {},
  getProfile: async () => {},
  currentGameId: null,
  setCurrentGameId: () => {},
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

type UserDataRetrieved = {
  name: string;
  email: string;
  role?: string;
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

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserDataRetrieved | null>(null);

  const [currentGameId, setCurrentGameId] = useState<number | null>(null);

  useEffect(() => {
    console.log("Global Points:", globalPoints);
  }, [globalPoints]);

  // auth con api
  const getProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setUserData(null);
      return;
    }
    try {
      const response = await fetch(
        "https://m7-uf4-laravel-production.up.railway.app/api/me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching profile");
      }

      const data = await response.json();
      setUserData({
        name: data?.data.name,
        email: data?.data.email,
        role: data?.data.role,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://m7-uf4-laravel-production.up.railway.app/api/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error logging out.");
      }
      const data = await response.json();
      console.log(data);

      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUserData(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // auth con localstorage
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
        isAuthenticated,
        setIsAuthenticated,
        userData,
        logout,
        getProfile,
        currentGameId,
        setCurrentGameId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
