"use client";

import { cn } from "@/lib/utils";
import { Award, Clock, MousePointerClick, Trophy, User } from "lucide-react";
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

export default function RankingHistory() {
  // Ejemplo de datos para el ranking global
  const rankingData = [
    {
      user_id: "user987",
      best_time: 165, // en segundos (2:45) - el mejor tiempo
      min_clicks: 16,
      max_points: 950,
      user: {
        id: "user987",
        name: "LucyLiu",
        email: "lucy@example.com",
      },
    },
    {
      user_id: "user456",
      best_time: 175, // (2:55)
      min_clicks: 17,
      max_points: 940,
      user: {
        id: "user456",
        name: "AliceWonder",
        email: "alice@example.com",
      },
    },
    {
      user_id: "user123", // Este es el usuario actual
      best_time: 185, // (3:05)
      min_clicks: 17, // Mismo número de clicks que Alice, pero peor tiempo
      max_points: 930,
      user: {
        id: "user123",
        name: "JohnDoe",
        email: "john@example.com",
      },
    },
    {
      user_id: "user321",
      best_time: 190, // (3:10)
      min_clicks: 18,
      max_points: 920,
      user: {
        id: "user321",
        name: "EvaGreen",
        email: "eva@example.com",
      },
    },
    {
      user_id: "user654",
      best_time: 195, // (3:15)
      min_clicks: 19,
      max_points: 910,
      user: {
        id: "user654",
        name: "SamSmith",
        email: "sam@example.com",
      },
    },
  ];
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
        {rankingData.map((player, index) => (
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
                "overflow-hidden border-2 rounded-lg transition-all hover:shadow-md bg-white",
                (index === 2 || index === 4 || index === 5) && "text-slate-900"
              )}
            >
              <div className={cn("h-2", rankColors[index])} />
              <div className="p-2">
                <div className="flex items-center mb-3 mt-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                    <User className="h-6 w-6 text-slate-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{player.user.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {player.user_id}
                    </p>
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
                      <div className="font-bold">{player.best_time}</div>
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
        ))}
      </div>
    </div>
  );
}
