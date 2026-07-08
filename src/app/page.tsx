"use client";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-center text-4xl font-extrabold mb-8 text-yellow-500 dark:text-yellow-400 drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(250,204,21,0.25)] tracking-tight">
          <span className="inline-block align-middle">
            <Image
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
              alt="Pikachu"
              width={48}
              height={48}
              className="inline-block mr-2"
            />
          </span>
          Sobre{" "}
          <span className="text-red-500 dark:text-red-400">PokeMemory</span>
        </h1>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-900 p-8 rounded-3xl shadow-xl dark:shadow-black/40 border border-yellow-200 dark:border-zinc-700">
          <p className="md:w-1/2 text-lg text-gray-700 dark:text-zinc-300 text-justify leading-relaxed">
            <span className="font-semibold text-red-500 dark:text-red-400">
              ¡Bienvenido a PokeMemory!
            </span>{" "}
            El lugar perfecto para los fans de Pokémon que quieren poner a
            prueba su memoria de una forma divertida. Aquí puedes jugar a un
            memory de temática Pokémon, registrar tus partidas para ver cómo
            mejoras, y crear una cuenta para guardar tus resultados.
            <br />
            <br />
            Además, podrás explorar las partidas de otros jugadores, descubrir
            sus mejores tiempos y estrategias, y competir en los rankings para
            demostrar tus habilidades.{" "}
            <span className="font-semibold text-yellow-500 dark:text-yellow-400">
              ¡Atrévete a convertirte en el Maestro Pokémon de la memoria!
            </span>
          </p>
          <div className="relative w-full md:w-1/2 h-72 flex justify-center items-center bg-white dark:bg-zinc-900 rounded-2xl shadow-lg dark:shadow-black/50 border-4 border-yellow-300 dark:border-yellow-500/40">
            <Image
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/149.svg"
              alt="Dragonite"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/game"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-200 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-300 font-semibold shadow-inner dark:shadow-none border border-yellow-300 dark:border-yellow-500/40 hover:bg-yellow-300 dark:hover:bg-yellow-500/30 transition cursor-pointer"
          >
            <Image
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
              alt="Bulbasaur"
              width={32}
              height={32}
            />
            ¡A jugar!
            <Image
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg"
              alt="Charmander"
              width={32}
              height={32}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
