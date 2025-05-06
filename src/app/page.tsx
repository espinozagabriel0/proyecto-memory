"use client";
import Tarjeta from "@/components/Tarjeta";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AppContext } from "@/context/AppContext";
import { Clock, MousePointerClick, Star } from "lucide-react";
import { useContext, useEffect, useState } from "react";

type Card = {
  id: number;
  uniqueId: string;
  name: string;
  url: string;
};

export default function Home() {
  const {
    globalTimer,
    globalClicks,
    globalPoints,
    setGlobalTimer,
    setFlippedIds,
    setMatchedCards,
    setGlobalClicks,
    setGlobalPoints,
    matchedCards,
  } = useContext(AppContext);
  const [cards, setCards] = useState<Card[]>([]);
  const [started, setStarted] = useState(false);
  // estado para controlar el loading del fetch
  const [loading, setLoading] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  //se duplican las cartas para que hayan pares, y se añade un id unico para evitar usar el mismo id de la carta y causar problemas
  useEffect(() => {
    // sustituir por fetch
    // const defaultCards = [
    //   {
    //     id: 1,
    //     nom: "Pikachu",
    //     imatge: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
    //   },
    //   {
    //     id: 2,
    //     nom: "Charizard",
    //     imatge: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg",
    //   },
    //   {
    //     id: 3,
    //     nom: "Bulbasaur",
    //     imatge: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
    //   },
    //   {
    //     id: 4,
    //     nom: "Squirtle",
    //     imatge: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg",
    //   },
    //   {
    //     id: 5,
    //     nom: "Eevee",
    //     imatge: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/133.svg",
    //   },
    //   {
    //     id: 6,
    //     nom: "Dragonite",
    //     imatge: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/149.svg",
    //   },
    // ];

    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://m7-uf4-laravel-production.up.railway.app/api/cards?limit=6"
        );
        if (!response.ok) {
          throw new Error("Error fetching cards");
        }

        const data = await response.json();
        console.log(data);
        const duplicated = [...data.cards, ...data.cards].map(
          (card, index) => ({
            ...card,
            uniqueId: `${card.id}-${index}`, // "1-0", "1-1", "2-2"...
          })
        );
        setCards(duplicated);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleTimer = () => {
    setGlobalTimer(20);
    setStarted(true);
    setGlobalClicks(0);
    setGlobalPoints(0);
    setFlippedIds([]);
    setMatchedCards([]);

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
    }
  }, [globalTimer, intervalId]);

  return (
    <>
      <div className="dark:bg-gray-900 text-center my-7 grid grid-cols-1 lg:grid-cols-4 items-center shadow-md border rounded-md p-4 bg-white">
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
          <div className="text-center">
            <h2 className="text-4xl text-green-700 font-semibold">
              Has ganado!{" "}
            </h2>
          </div>
        )}

      {!started && globalTimer == 0 && (
        <div className="text-center">
          <h2 className="text-4xl text-red-700 font-semibold">
            Fin de la partida!{" "}
          </h2>
          <p>
            pulsa <span className="text-green-700 font-semibold">jugar</span>{" "}
            para comenzar de nuevo.
          </p>
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
          : cards.map((card) => (
              <Tarjeta key={card.uniqueId} card={card} started={started} />
            ))}
      </div>
    </>
  );
}
