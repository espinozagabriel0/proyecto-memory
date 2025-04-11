import Tarjeta from "@/components/Tarjeta";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="text-center my-4">
        <h1 className="text-center text-3xl font-semibold my-3">Juego</h1>
        <Button>Empezar</Button>
      </div>

      {/* Història 5: Comptadors reactius
        Comptador individual per targeta amb useState. -->al clickar tarjeta, darle la vuelta durante un segundo. si el usuario gira dos targetas iguales, se quedan visibles.
        Comptador global amb createContext i useContext.
     */}

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
