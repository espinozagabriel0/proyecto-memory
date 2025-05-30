"use client";
import Header from "@/components/Header";
import Tarjeta from "@/components/Tarjeta";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AppContext } from "@/context/AppContext";
import {
  BanIcon,
  Clock,
  MousePointerClick,
  SaveOff,
  Star,
  TrophyIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Card = {
  id: number;
  uniqueId: string;
  name: string;
  url: string;
};

export default function Home() {
  const {
    started,
    setStarted,
    globalTimer,
    globalClicks,
    globalPoints,
    setGlobalTimer,
    setFlippedIds,
    setMatchedCards,
    setGlobalClicks,
    setGlobalPoints,
    matchedCards,
    isAuthenticated,
    currentGameId,
    setCurrentGameId,
  } = useContext(AppContext);
  const [cards, setCards] = useState<Card[]>([]);
  // estado para controlar el loading del fetch (cards)
  const [loading, setLoading] = useState(false);

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [firstGame, setFirstGame] = useState(true);

  const router = useRouter();

  //se duplican las cartas para que hayan pares, y se añade un id unico para evitar usar el mismo id de la carta y causar problemas
  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://m7-uf4-laravel-production.up.railway.app/api/public-cards?limit=6"
      );
      if (!response.ok) {
        throw new Error("Error fetching cards");
      }

      const data = await response.json();
      const duplicated = [...data.cards, ...data.cards].map((card, index) => ({
        ...card,
        uniqueId: `${card.id}-${index}`, // "1-0", "1-1", "2-2"...
      }));

      // mezclar cartas
      const shuffledCards = duplicated.sort(() => Math.random() - 0.5);
      setCards(shuffledCards);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // tambien, hacer una peticion post para guardar la partida en bd y al terminar la partida, hacer un update de esa partida , con los datos obtenidos

  const handleBeginGame = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://m7-uf4-laravel-production.up.railway.app/api/games",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (!response.ok) {
        throw new Error("No se pudo crear la partida");
      }

      const data = await response.json();
      const id = data?.game.id;

      setCurrentGameId(id);
    } catch (error) {
      console.error(error);
      toast.error("Error al iniciar la partida");
    }
  };

  const handleUpdateGame = async (
    totalClicks: number,
    totalPoints: number,
    totalDuration: number
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!currentGameId || !token) {
        toast.error("No se ha encontrado la partida actual");
        return;
      }

      const response = await fetch(
        `https://m7-uf4-laravel-production.up.railway.app/api/games/${currentGameId}/finish`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            clicks: totalClicks,
            points: totalPoints,
            duration: totalDuration,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo crear la partida");
      }
      const data = await response.json();
      console.log("Datos partida finalizada y guardada: ", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleTimer = async () => {
    // reset estados iniciales
    setGlobalClicks(0);
    setGlobalPoints(0);
    setFlippedIds([]);
    setMatchedCards([]);

    // si es la primera vez que se juega, no se hace el fetch de las cartas (ya se han cargado)
    if (!firstGame) {
      await fetchCards(); // espera a que se carguen las cartas antes de empezar el juego
    } else {
      setFirstGame(false);
    }

    if (isAuthenticated) await handleBeginGame();

    setGlobalTimer(20);
    setStarted(true);

    if (intervalId) return;

    const id = setInterval(() => {
      setGlobalTimer((s) => s - 1);
    }, 1000);

    setIntervalId(id);
  };

  useEffect(() => {
    if (
      (globalTimer == 0 && intervalId) ||
      (matchedCards.length * 2 == cards.length && intervalId)
    ) {
      clearInterval(intervalId);
      setIntervalId(null);
      setStarted(false);
      if (isAuthenticated) {
        handleUpdateGame(
          globalClicks,
          globalPoints,
          Math.abs(globalTimer - 20)
        );
      }
    }
  }, [globalTimer, intervalId]);

  return (
    <>
      <Header />
      <div className="dark:bg-gray-700 text-center mt-3 mb-7 grid grid-cols-1 lg:grid-cols-4 items-center shadow-md border rounded-md p-4 bg-white">
        <div>
          <h3 className="text-2xl flex items-center justify-center gap-2">
            <Clock className="w-6 h-6 text-blue-500" />
            Tiempo: <span className="font-semibold">{globalTimer}s</span>
          </h3>
        </div>
        <div>
          <h3 className="text-2xl flex items-center justify-center gap-2">
            <MousePointerClick className="w-6 h-6 text-green-500" />
            Clicks: <span className="font-semibold">{globalClicks}</span>
          </h3>
        </div>
        <div>
          <h3 className="text-2xl flex items-center justify-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Puntos: <span className="font-semibold">{globalPoints}</span>
          </h3>
        </div>
        <div>
          <h1 className="text-center text-3xl font-semibold my-3">Memory</h1>
          {!started && (
            <Button
              onClick={handleTimer}
              className="bg-green-600 hover:bg-green-700"
            >
              Jugar
            </Button>
          )}
        </div>
      </div>

      {!loading &&
        !started &&
        cards.length > 0 &&
        matchedCards.length * 2 == cards.length && (
          <div
            className="
      flex flex-col items-center justify-center
      bg-gradient-to-br from-green-50 to-green-100
      dark:from-gray-900 dark:to-gray-800
      rounded-xl shadow-lg p-8 transition-colors
    "
          >
            <div className="flex items-center gap-3 mb-4">
              <TrophyIcon className="w-10 h-10 text-green-600 dark:text-green-400 drop-shadow-lg" />
              <h2 className="text-4xl font-extrabold text-green-700 dark:text-green-300 drop-shadow-lg">
                ¡Has ganado!
              </h2>
            </div>
            {!isAuthenticated && (
              <div
                className="
          flex flex-col items-center gap-3 mt-4
          bg-white/80 dark:bg-gray-900/80
          rounded-lg p-4 shadow-inner transition-colors
        "
              >
                <SaveOff className="w-8 h-8 text-gray-400 dark:text-gray-500 animate-pulse" />
                <p className="text-gray-600 dark:text-gray-200 text-lg font-medium text-center">
                  Para que se guarden tus partidas, inicia sesión.
                </p>
                <Button
                  className="
              mt-2 px-4 py-2 bg-green-600 dark:bg-green-700
              text-white rounded-full shadow
              hover:bg-green-700 dark:hover:bg-green-600
              transition
            "
                  onClick={() => router.push("/login")}
                >
                  Iniciar sesión
                </Button>
              </div>
            )}
          </div>
        )}

      {matchedCards.length * 2 !== cards.length &&
        !started &&
        globalTimer == 0 && (
          <div
            className="flex flex-col items-center justify-center 
      bg-gradient-to-br from-red-50 to-red-100 
      dark:from-gray-900 dark:to-gray-800 
      rounded-xl shadow-lg p-8 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <BanIcon className="w-10 h-10 text-red-600 dark:text-red-400 drop-shadow-lg" />
              <h2 className="text-4xl font-extrabold text-red-700 dark:text-red-400 drop-shadow-lg">
                ¡Fin de la partida!
              </h2>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-200 mb-2 text-center">
              Pulsa{" "}
              <span className="text-green-700 dark:text-green-400 font-semibold">
                Jugar
              </span>{" "}
              para comenzar de nuevo.
            </p>

            {!isAuthenticated && (
              <div
                className="flex items-center gap-2 mt-3 
          bg-white/80 dark:bg-gray-900/80 
          rounded-lg p-3 shadow-inner transition-colors"
              >
                <span className="text-red-700 dark:text-red-400 font-bold">
                  Nota:
                </span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">
                  Para que tus partidas se guarden tienes que estar autenticado.
                </span>
              </div>
            )}
          </div>
        )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
        {loading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
              <Skeleton
                key={index}
                className="min-w-[12rem] min-h-[12rem] w-full"
              />
            ))
          : cards.map((card) => <Tarjeta key={card.uniqueId} card={card} />)}
      </div>
    </>
  );
}
