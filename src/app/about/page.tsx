import Header from "@/components/Header";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-center text-3xl font-semibold mb-7">About</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6 rounded">
          <p className="md:w-1/2 text-justify">
            Bienvenido a PokeMemory, el lugar perfecto para los fans de Pokémon
            que quieren poner a prueba su memoria de una forma divertida. Aquí
            puedes jugar a un memory de temática Pokémon, registrar tus partidas
            para ver cómo mejoras, y crear una cuenta para guardar tus
            resultados. Además, podrás explorar las partidas de otros jugadores,
            descubrir sus mejores tiempos, estrategias, y competir en los
            rankings para demostrar tus habilidades. !A jugar!
          </p>
          <div className="relative w-full md:w-1/2 h-64">
            <Image
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/149.svg"
              alt="Pokémon"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}
