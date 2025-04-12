"use client";
import Tarjeta from "@/components/Tarjeta";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

export default function Home() {
  const { globalTimer, globalClicks, globalPoints, setGlobalTimer } =
    useContext(AppContext);

  const cards = [
    {
      nom: "Pikachu",
      imatge: "Icono Pikachu",
    },
    {
      nom: "Charizard",
      imatge: "Icono Charizard",
    },
    {
      nom: "Bulbasaur",
      imatge: "Icono Bulbasaur",
    },
    {
      nom: "Squirtle",
      imatge: "Icono Squirtle",
    },
    {
      nom: "Eevee",
      imatge: "Icono Eevee",
    },
    {
      nom: "Dragonite",
      imatge: "Icono Dragonite",
    },
    {
      nom: "Gyarados",
      imatge: "Icono Gyarados",
    },
    {
      nom: "Lugia",
      imatge: "Icono Lugia",
    },
    {
      nom: "Ho-Oh",
      imatge: "Icono Ho-Oh",
    },
    {
      nom: "Mewtwo",
      imatge: "Icono Mewtwo",
    },
    {
      nom: "Articuno",
      imatge: "Icono Articuno",
    },
    {
      nom: "Moltres",
      imatge: "Icono Moltres",
    },
  ];

  const handleTimer = () => {
    const intervalId = setInterval(() => {
      setGlobalTimer((s) => s - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  };

  return (
    <>
      <div className="text-center my-4 grid grid-cols-1 lg:grid-cols-4 items-center">
        <div className="">
          <h3 className="text-2xl">
            Tiempo: <span className="font-semibold">{globalTimer}</span>
          </h3>
        </div>
        <div className="">
          <h3 className="text-2xl">
            Clicks: <span className="font-semibold">{globalClicks}</span>
          </h3>
        </div>
        <div className="">
          <h3 className="text-2xl">
            Puntos: <span className="font-semibold">{globalPoints}</span>
          </h3>
        </div>
        <div>
          <h1 className="text-center text-3xl font-semibold my-3">Juego</h1>
          <Button onClick={handleTimer}>Empezar</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
        {cards.map((card, index) => (
          <Tarjeta
            key={index}
            nom={card.nom}
            imatge={card.imatge}
          />
        ))}
      </div>
    </>
  );
}
