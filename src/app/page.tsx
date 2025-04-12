"use client"
import Tarjeta from "@/components/Tarjeta";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

export default function Home() {
  const {globalTimer, globalClicks, globalPoints, setGlobalTimer} = useContext(AppContext)

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
          <h3 className="text-2xl">Tiempo: <span className="font-semibold">{globalTimer}</span></h3>
        </div>
        <div className="">
          <h3 className="text-2xl">Clicks: <span className="font-semibold">{globalClicks}</span></h3>
        </div>
        <div className="">
          <h3 className="text-2xl">Puntos: <span className="font-semibold">{globalPoints}</span></h3>
        </div>
        <div>
          <h1 className="text-center text-3xl font-semibold my-3">Juego</h1>
          <Button onClick={handleTimer}>Empezar</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
        {[1, 2, 3, 4].map((element) => (
          <Tarjeta
            key={element}
            nom={element.toString()}
            imatge={"Targeta " + element.toString()}
          />
        ))}
      </div>
    </>
  );
}
