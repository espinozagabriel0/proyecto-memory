"use client";
import { Card, CardContent } from "@/components/ui/card";
import { AppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useContext, useEffect } from "react";

type CardProps = {
  card: {
    id: number;
    uniqueId: string;
    nom: string;
    imatge: string;
  };
};

export default function Tarjeta({ card }: CardProps) {
  const {
    flippedCards,
    setFlippedCards,
    flippedIds,
    setFlippedIds,
    matchedCards,
    setMatchedCards,
  } = useContext(AppContext);

  const isFlipped = flippedIds.includes(card.uniqueId);
  const isMatched = matchedCards.includes(card.id);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;

      setTimeout(() => {
        if (firstCard.id === secondCard.id) {
          setMatchedCards(prev => [...prev, firstCard.id]); // se guardan las cartas emparejadas
        } else {
          // Ocultar solo las dos cartas seleccionadas
          setFlippedIds(prev => 
            prev.filter(id => id !== firstCard.uniqueId && id !== secondCard.uniqueId)
          );
        }
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards]);

  const handleSelectCard = () => {
    if (flippedCards.length >= 2 || isFlipped || isMatched) return;

    setFlippedIds(prev => [...prev, card.uniqueId]);
    setFlippedCards(prev => [...prev, card]);
  };

  return (
    <Card
      className={cn(
        "cursor-pointer hover:shadow-md transition min-w-[13rem] w-full max-w-xs flex flex-col items-center justify-center mx-auto my-4 duration-500",
        isFlipped && "rotate-y-180",
        isMatched && "opacity-50 pointer-events-none"
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
          <p className="rotate-y-180">{card.imatge}</p>
        )}
      </CardContent>
    </Card>
  );
}
