"use client";
import { Card, CardContent } from "@/components/ui/card";
import { AppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

type CardProps = {
  card: {
    id: number;
    uniqueId: string;
    nom: string;
    imatge: string;
  };
  started: boolean;
};

export default function Tarjeta({ card, started }: CardProps) {
  const {
    flippedCards,
    setFlippedCards,
    flippedIds,
    setFlippedIds,
    matchedCards,
    setMatchedCards,
    setGlobalPoints,
    setGlobalClicks,
  } = useContext(AppContext);

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [cardClick, setCardClick] = useState(0);

  const isFlipped = flippedIds.includes(card.uniqueId);
  const isMatched = matchedCards.includes(card.id);

  // cada vez que se gira una carta se ejecuta este bloque
  useEffect(() => {
    // si solo hay una carta, usa un timeout para volver a girarla
    if (flippedCards.length === 1) {
      const [firstCard] = flippedCards;

      if (firstCard.uniqueId === card.uniqueId) {
        const id = setTimeout(() => {
          setFlippedIds((prev) =>
            prev.filter((id) => id !== firstCard.uniqueId)
          );
          setFlippedCards([]);
        }, 1000);
        setTimeoutId(id); // Guardar el timeout en el estado
      }
    }

    // si hay dos cartas giradas, cancelar el timeout de la primera carta y compararlas
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;

      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }

      // condicion para que el bloque se ejecute una vez al girar la carta (sino se ejecutaria tantas veces como cartas haya)
      if (card.uniqueId === firstCard.uniqueId) {
        if (firstCard.id === secondCard.id) {
          setMatchedCards((prev) => [...prev, firstCard.id]);
          setGlobalPoints((prevPts) => prevPts + 1);
          setFlippedCards([]);
        } else {
          setTimeout(() => {
            setFlippedIds((prev) =>
              prev.filter(
                (id) => id !== firstCard.uniqueId && id !== secondCard.uniqueId
              )
            );
            setFlippedCards([]);
          }, 1000);
        }
      }
    }
  }, [flippedCards]);

  const handleSelectCard = () => {
    if (flippedCards.length >= 2 || isFlipped || isMatched || !started) return;

    setFlippedIds((prev) => [...prev, card.uniqueId]);
    setFlippedCards((prev) => [...prev, card]);
    setGlobalClicks((prevClick) => prevClick + 1);
    setCardClick((prev) => prev + 1);
  };

  return (
    <Card
      className={cn(
        "cursor-pointer hover:shadow-md transition min-w-[13rem] min-h-[13rem] w-full max-w-xs flex flex-col items-center justify-center mx-auto my-4 duration-500",
        isFlipped && "rotate-y-180",
        isMatched && "opacity-50 pointer-events-none scale-95"
      )}
      onClick={handleSelectCard}
    >
      <CardContent className="w-full flex justify-center p-4">
        {!isFlipped ? (
          <div className="relative aspect-square w-24">
            <Image
              src="/assets/images/pokeball.png"
              alt="Pokeball"
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <>
            <Image
              src={card.imatge}
              alt="Pokeball"
              fill
              className="object-contain p-8"
            />
            <span className="absolute top-2 right-3 border rounded-full size-6 shadow-md flex items-center justify-center bg-white rotate-y-180">
              {cardClick}
            </span>
          </>
        )}
      </CardContent>
    </Card>
  );
}
