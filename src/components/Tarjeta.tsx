"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type CardProps = {
  nom: string;
  imatge: string;
};
export default function Tarjeta({ nom, imatge }: CardProps) {
  const [timer, setTimer] = useState(0);

  const handleSelectCard = () => {
    console.log("Has clickado la carta: ", nom);

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
        "text-center cursor-pointer hover:shadow-md transition-shadow animate",
        timer == 0 ? "bg-red-500" : "bg-green-600"
      )}
      onClick={handleSelectCard}
    >
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{nom}</p>
      </CardContent>
      <CardFooter>
        <p className="w-full">{imatge}</p>
      </CardFooter>
    </Card>
  );
}
