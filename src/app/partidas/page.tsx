"use client";
import GameHistory from "@/components/GameHistory";
import Header from "@/components/Header";
import RankingHistory from "@/components/RankingHistory";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

export default function Page() {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <>
      <Header />
      {/* <div>
        <h1 className="text-center text-3xl font-semibold">Partidas</h1>
      </div> */}
      {!isAuthenticated ? (
        <p className="text-center my-5">
          {!isAuthenticated &&
            "Para poder ver tus partidas y un ranking de otros jugadores, primero debes autenticarte."}
        </p>
      ) : (
        <div className="">
          <div className="lg:col-span-2">
            <GameHistory />
          </div>
          <div>
            <RankingHistory />
          </div>
        </div>
      )}
    </>
  );
}
