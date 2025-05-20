"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, MousePointerClick, Search, Trophy } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect } from "react";
export default function GameHistory() {
  //   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const data = await getUserGameHistory();
    //     setGameHistoryData(data);
    //   } catch (error) {
    //     console.error("Error fetching game history:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchData();
  }, []);

  // Ejemplo de datos para el historial de partidas del usuario actual
  const gameHistoryData = [
    {
      id: 1,
      created_at: "2023-05-15T14:30:00Z",
      updated_at: "2023-05-15T14:35:20Z",
      user_id: "user123", // ID del usuario actual
      clicks: 24,
      points: 850,
      duration: 320, // en segundos (5:20)
    },
    {
      id: 2,
      created_at: "2023-05-17T09:20:00Z",
      updated_at: "2023-05-17T09:23:10Z",
      user_id: "user123",
      clicks: 20,
      points: 900,
      duration: 190, // (3:10)
    },
    {
      id: 3,
      created_at: "2023-05-19T08:45:00Z",
      updated_at: "2023-05-19T08:48:30Z",
      user_id: "user123",
      clicks: 28,
      points: 800,
      duration: 230, // (3:50)
    },
    {
      id: 4,
      created_at: "2023-05-20T15:10:00Z",
      updated_at: "2023-05-20T15:14:45Z",
      user_id: "user123",
      clicks: 22,
      points: 880,
      duration: 210, // (3:30)
    },
    {
      id: 5,
      created_at: "2023-05-21T11:30:00Z",
      updated_at: "2023-05-21T11:33:20Z",
      user_id: "user123",
      clicks: 18,
      points: 920,
      duration: 200, // (3:20)
    },
    {
      id: 6,
      created_at: "2023-05-22T17:45:00Z",
      updated_at: "2023-05-22T17:48:10Z",
      user_id: "user123",
      clicks: 26,
      points: 830,
      duration: 240, // (4:00)
    },
    {
      id: 7,
      created_at: "2023-05-23T10:05:00Z",
      updated_at: "2023-05-23T10:08:30Z",
      user_id: "user123",
      clicks: 19,
      points: 910,
      duration: 195, // (3:15)
    },
    {
      id: 8,
      created_at: "2023-05-24T14:20:00Z",
      updated_at: "2023-05-24T14:23:45Z",
      user_id: "user123",
      clicks: 21,
      points: 890,
      duration: 205, // (3:25)
    },
    {
      id: 9,
      created_at: "2023-05-25T09:30:00Z",
      updated_at: "2023-05-25T09:34:10Z",
      user_id: "user123",
      clicks: 17,
      points: 930,
      duration: 185, // (3:05)
    },
    {
      id: 10,
      created_at: "2023-05-26T16:15:00Z",
      updated_at: "2023-05-26T16:18:20Z",
      user_id: "user123",
      clicks: 23,
      points: 870,
      duration: 215, // (3:35)
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-2">
        <div className="flex items-center text-lg font-semibold">
          <Trophy className="mr-2 h-5 w-5" />
          <h1 className="text-2xl">Mi historial de partidas</h1>
        </div>
        <div className="text-muted-foreground text-sm">
          Aquí puedes ver el historial de tus partidas, fecha, duración,
          puntos...
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-3">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Busca por fecha, id, puntos..."
              className="pl-8"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center">Created At</div>
                </TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center">
                    <MousePointerClick className="mr-1 h-4 w-4" />
                    Clicks
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center">
                    <Trophy className="mr-1 h-4 w-4" />
                    Points
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    Duration
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gameHistoryData.map((game) => (
                <TableRow key={game.id}>
                  <TableCell className="font-medium">{game.id}</TableCell>
                  <TableCell>{game.created_at}</TableCell>
                  <TableCell>{game.updated_at}</TableCell>
                  <TableCell>{game.clicks}</TableCell>
                  <TableCell className="font-medium">{game.points}</TableCell>
                  <TableCell>{game.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Cargando historial de partidas...
                    </TableCell>
                  </TableRow>
                ) : sortedData.length > 0 ? (
                  sortedData.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell className="font-medium">{game.id}</TableCell>
                      <TableCell>{formatDate(game.created_at)}</TableCell>
                      <TableCell>{formatDate(game.updated_at)}</TableCell>
                      <TableCell>{game.clicks}</TableCell>
                      <TableCell className="font-medium">
                        {game.points}
                      </TableCell>
                      <TableCell>{formatDuration(game.duration)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No hay resultados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody> */}
          </Table>
        </div>
      </div>
    </div>
  );
}
