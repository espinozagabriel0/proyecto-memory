"use client";

import { cn } from "@/lib/utils";
import { Award, Clock, MousePointerClick, Trophy, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

// array para estilos, podio
const rankColors = [
  "bg-yellow-500", // 1st place
  "bg-gray-300", // 2nd place
  "bg-amber-700", // 3rd place
  "bg-slate-200", // 4th place
  "bg-slate-100", // 5th place
];

const rankTextColors = [
  "text-yellow-500", // 1st place
  "text-gray-400", // 2nd place
  "text-amber-700", // 3rd place
  "text-slate-500", // 4th place
  "text-slate-400", // 5th place
];

type RankingUser = {
  user_id: number;
  best_time: number;
  min_clicks: number;
  max_points: number;
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role: string;
  };
};

export default function RankingHistory() {
  const [rankingData, setRankingData] = useState<RankingUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://m7-uf4-laravel-production.up.railway.app/api/ranking",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        const data = await response.json();
        setRankingData(data || []);
      } catch (error) {
        console.error("Error fetching ranking data:", error);
        // toast.error("No se ha podido obtener las partidas del jugador.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankingData();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-2">
        <div className="flex items-center text-lg font-semibold">
          <Award className="mr-2 h-5 w-5" />
          <h2 className="text-xl">Global Top 5 Jugadores</h2>
        </div>
        <div className="text-muted-foreground text-sm">
          Jugadores del PokeMemory clasificados por mejor tiempo y clicks y
          puntos
        </div>
      </div>

      <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mt-3 gap-2">
        {isLoading ? (
          // Skeletons para loading
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="relative">
              <div className="overflow-hidden border-2 rounded-lg">
                <Skeleton className="h-2 w-full" />
                <div className="p-2 mt-1">
                  <div className="flex items-center mb-3 mt-2">
                    <Skeleton className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <Skeleton className="h-6 w-32 mb-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="flex items-center">
                      <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                      <Skeleton className="h-4 w-10" />
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                      <Skeleton className="h-4 w-10" />
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                      <Skeleton className="h-4 w-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : rankingData.length === 0 ? (
          // si está vacío
          <div className="col-span-full text-center text-muted-foreground py-10">
            No hay jugadores en el ranking aún.
          </div>
        ) : (
          // Renderizado normal
          rankingData.map((player, index) => (
            <div key={player.user_id} className="relative">
              <div
                className={cn(
                  "absolute -left-1 -top-1 w-8 h-8 rounded-full flex items-center justify-center font-bold",
                  rankColors[index],
                  index === 1 || index === 3 || index === 4
                    ? "text-slate-500"
                    : "text-white"
                )}
              >
                {index + 1}
              </div>
              <div
                className={cn(
                  "overflow-hidden border-2 rounded-lg transition-all hover:shadow-md ",
                  (index === 2 || index === 4 || index === 5) &&
                    "text-slate-900"
                )}
              >
                <div className={cn("h-2", rankColors[index])} />
                <div className="p-2 mt-1">
                  <div className="flex items-center mb-3 mt-2">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                      <User className="h-6 w-6 text-slate-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{player.user.name}</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="flex items-center">
                      <Clock
                        className={cn("mr-2 h-4 w-4", rankTextColors[index])}
                      />
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Best Time
                        </div>
                        <div className="font-bold">{player.best_time}s</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MousePointerClick
                        className={cn("mr-2 h-4 w-4", rankTextColors[index])}
                      />
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Min Clicks
                        </div>
                        <div className="font-medium">{player.min_clicks}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Trophy
                        className={cn("mr-2 h-4 w-4", rankTextColors[index])}
                      />
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Max Points
                        </div>
                        <div className="font-bold">{player.max_points}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
