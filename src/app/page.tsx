import Tarjeta from "@/components/Tarjeta";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="text-center my-4">
        <h1 className="text-center text-3xl font-semibold my-3">Juego</h1>
        <Button>Empezar</Button>
      </div>

      <div className="border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((element) => 
          <Tarjeta key={element} nom={element.toString()} imatge={"Targeta " + element.toString()}/>
        )}
      </div>
    </>
  );
}
