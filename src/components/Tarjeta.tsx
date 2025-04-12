"use client";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

type CardProps = {
  nom: string;
  imatge: string;
};
export default function Tarjeta({ nom, imatge }: CardProps) {
  const [timer, setTimer] = useState(0);
  const [isFlipped, setIsFlipped] = useState(true)


  const handleSelectCard = () => {
    console.log("Has clickado la carta: ", nom);

    setIsFlipped(false)
    const intervalId = setInterval(() => {
      setTimer((s) => s + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    if (timer != 0) {
      console.log("tiempo : ", timer, nom);
    }
  }, [timer]);

 
  return (
    <Card
      className={cn(
        "cursor-pointer hover:shadow-md transition-shadow min-w-[13rem] w-full max-w-xs flex flex-col items-center justify-center mx-auto my-4" 
      )}
      onClick={handleSelectCard}
    >
      <CardContent className="w-full flex justify-center p-4">
        {isFlipped ? (
          <div className="relative aspect-square w-24">
            <Image
              src="/assets/images/pokeball.png"
              alt="Pokeball"
              fill
              className="object-contain"
            />
          </div>

        ): (
          <p>{imatge}</p>
        )}
      </CardContent>
    </Card>
  );
}
