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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import AlertConfirmationDelete from "./AlertConfirmationDelete";

type GameData = {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  clicks: number;
  points: number;
  duration: number;
};
export default function GameHistory() {
  const [isLoading, setIsLoading] = useState(false);
  const [gameHistoryData, setGameHistoryData] = useState<GameData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://m7-uf4-laravel-production.up.railway.app/api/games",
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
      setGameHistoryData(data || []);
    } catch (error) {
      console.error("Error fetching game history:", error);
      toast.error("No se ha podido obtener las partidas del jugador.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (gameId: number) => {
    try {
      if (!gameId) return;
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://m7-uf4-laravel-production.up.railway.app/api/games/${gameId}`,
        {
          method: "DELETE",
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
      toast.success(data.message || "Partida eliminada correctamente.");

      // hacer otro fetch
      fetchData();
    } catch (error) {
      console.error("Error deleting game:", error);
      toast.error("No se ha podido eliminar la partida.");
    }
  };

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
              placeholder="Busca por id, puntos, clicks, duración..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <TableHead className="cursor-pointer">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Cargando historial de partidas...
                  </TableCell>
                </TableRow>
              ) : gameHistoryData.length > 0 ? (
                gameHistoryData
                  .filter((game) => {
                    const search = searchTerm.toLowerCase().trim();

                    if (search == "") {
                      return true;
                    }
                    return (
                      String(game?.id).toLowerCase().includes(searchTerm) ||
                      String(game?.clicks).toLowerCase().includes(searchTerm) ||
                      String(game?.duration)
                        .toLowerCase()
                        .includes(searchTerm) ||
                      String(game?.created_at)
                        .toLowerCase()
                        .includes(searchTerm) ||
                      String(game?.points).toLowerCase().includes(searchTerm)
                    );
                  })
                  .map((game) => (
                    <TableRow key={game.id}>
                      <TableCell className="font-medium">{game.id}</TableCell>
                      <TableCell>
                        {format(game.created_at, "dd-MM-yyyy HH:mm")}
                      </TableCell>
                      <TableCell>
                        {format(game.updated_at, "dd-MM-yyyy HH:mm")}
                      </TableCell>
                      <TableCell>{game.clicks}</TableCell>
                      <TableCell className="font-medium">
                        {game.points}
                      </TableCell>
                      <TableCell>{game.duration}</TableCell>
                      <TableCell>
                        {/* <span title="Eliminar partida">
                          <Trash2
                            onClick={() => handleDelete(game?.id)}
                            className="text-red-600 cursor-pointer"
                            size={20}
                          />
                        </span> */}
                        <AlertConfirmationDelete
                          id={game?.id}
                          type={"game"}
                          onConfirm={handleDelete}
                        />
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No hay resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
