"use client";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
import { Users, GamepadIcon, CreditCard, Star } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { differenceInDays, format, parseISO } from "date-fns";
import UserDialog from "@/components/dialogs/UserDialog";
import AlertConfirmationDelete from "@/components/AlertConfirmationDelete";
import toast from "react-hot-toast";
import GameDialog from "@/components/dialogs/GameDialog";
import Image from "next/image";
import CardDialog from "@/components/dialogs/CardDialog";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
  role: "admin" | "user";
};

type GameData = {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  clicks: number;
  points: number;
  duration: number;
  user?: User;
};

type Card = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  url: string;
  category_id: number | null;
  user_id: number | null;
  user: unknown | null;
  category: unknown | null;
};

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [partidas, setPartidas] = useState<GameData[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedTab, setSelectedTab] = useState("usuarios");
  const [gamesLoaded, setGamesLoaded] = useState(false);
  const [tarjetasLoaded, setTarjetasLoaded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // cargar usuarios y partidas
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://m7-uf4-laravel-production.up.railway.app/api/users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 403) {
        router.push("/");
        return;
      }
      if (!res.ok) throw new Error("Error en la respuesta del servidor");
      const usersData = await res.json();
      setUsers(usersData?.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://m7-uf4-laravel-production.up.railway.app/api/gamesAll",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 403) {
        router.push("/");
        return;
      }
      if (!res.ok) throw new Error("Error en la respuesta del servidor");
      const gamesData = await res.json();

      setPartidas(gamesData || []);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCards = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://m7-uf4-laravel-production.up.railway.app/api/cards",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 403) {
        router.push("/");
        return;
      }
      if (!res.ok) throw new Error("Error en la respuesta del servidor");
      const cardsData = await res.json();
      setCards(cardsData || []);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: SetStateAction<string>) => {
    setSelectedTab(value);

    if (value === "partidas" && !gamesLoaded) {
      fetchGames();
      setGamesLoaded(true);
    } else if (value === "tarjetas" && !tarjetasLoaded) {
      fetchCards();
      setTarjetasLoaded(true);
    }
  };

  console.log("cards: ", cards);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: number) => {
    try {
      if (!userId) return;
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://m7-uf4-laravel-production.up.railway.app/api/users/${userId}`,
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
      toast.success(data.message || "Usuario eliminado correctamente.");

      // hacer otro fetch
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("No se ha podido eliminar el usuario.");
    }
  };

  const handleDeleteGame = async (gameId: number) => {
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

      fetchGames();
    } catch (error) {
      console.error("Error deleting game:", error);
      toast.error("No se ha podido eliminar la partida.");
    }
  };
  const handleDeleteCard = async (cardId: number) => {
    try {
      if (!cardId) return;
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://m7-uf4-laravel-production.up.railway.app/api/cards/${cardId}`,
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
      toast.success(data.message || "Carta eliminada correctamente.");

      fetchCards();
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("No se ha podido eliminar la carta.");
    }
  };

  // console.log("users", users);
  // console.log("partidas", partidas);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header de la página con selector de API */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Panel de Gestión</h1>
            <p className="text-muted-foreground">
              Administra usuarios, partidas y tarjetas personalizadas
            </p>
          </div>
        </div>

        {/* Tabs principales */}
        <Tabs
          value={selectedTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="usuarios" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="partidas" className="flex items-center gap-2">
              <GamepadIcon className="h-4 w-4" />
              Partidas
            </TabsTrigger>
            <TabsTrigger value="tarjetas" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Tarjetas
            </TabsTrigger>
          </TabsList>

          {/* Gestión de Usuarios */}
          <TabsContent value="usuarios" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-3">
              <div className="flex items-center gap-2 flex-1 max-w-sm relative">
                {/* <Input placeholder="Buscar usuarios..." className="pl-8" />
                <Search className="h-4 w-4 absolute left-2" /> */}
              </div>
              <UserDialog onConfirm={fetchUsers} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <Card
                  key={user.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3 flex-1">
                      <CardTitle className="text-sm">{user.name}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        user.role === "admin" ? "destructive" : "default"
                      }
                    >
                      {user.role === "admin" ? "Admin" : "Usuario"}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <UserDialog
                        user={user}
                        isEditing={true}
                        onConfirm={fetchUsers}
                      />
                      <AlertConfirmationDelete
                        id={user?.id}
                        type="user"
                        onConfirm={handleDeleteUser}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gestión de Partidas */}
          <TabsContent value="partidas" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-3">
              <div className="flex items-center gap-2 flex-1 max-w-sm relative">
                {/* <Input placeholder="Buscar usuarios..." className="pl-8" />
                <Search className="h-4 w-4 absolute left-2" /> */}
              </div>
              {/* <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nueva Partida
              </Button> */}
              {/* <GameDialog /> */}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {partidas.map((game) => {
                const dias = differenceInDays(
                  new Date(),
                  parseISO(game.created_at)
                );
                return (
                  <Card
                    key={game.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Partida #{game.id.toString().padStart(3, "0")}
                      </CardTitle>
                      <CardDescription>
                        Creada hace {dias} día{dias !== 1 ? "s" : ""} por{" "}
                        {game.user?.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Clicks:</span>
                          <span className="font-medium">{game.clicks}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Duración:
                          </span>
                          <span className="font-medium">{game.duration} s</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Puntuación (parejas):
                            {/* hay 12 cartas, 6 parejas,  */}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{game.points}</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Puntuación (% acierto):
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">
                              {((game.points * 100) / 6).toFixed(2)}%
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Usuario:
                          </span>
                          <span className="font-medium">{game.user?.name}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <GameDialog
                            game={game}
                            isEditing={true}
                            onConfirm={fetchGames}
                          />
                          <AlertConfirmationDelete
                            id={game?.id}
                            type="adminGame"
                            onConfirm={handleDeleteGame}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Gestión de Tarjetas */}
          <TabsContent value="tarjetas" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-3">
              <div className="flex items-center gap-2 flex-1 max-w-sm relative">
                {/* <Input placeholder="Buscar usuarios..." className="pl-8" />
                <Search className="h-4 w-4 absolute left-2" /> */}
              </div>
              <CardDialog onConfirm={fetchCards} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {cards.map((card) => (
                <Card
                  key={card?.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-2">
                    <div className="aspect-square border flex items-center justify-center rounded-md mb-3">
                      <Image
                        src={card?.url}
                        alt={card?.name}
                        width={64}
                        height={64}
                        className="size-30 object-contain"
                      />
                    </div>
                    <CardTitle className="text-sm">{card?.name}</CardTitle>
                    <CardDescription>ID: #{card?.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Creado:</span>
                        <span className="font-medium">
                          {format(card?.created_at, "dd/MM/yyyy HH:mm")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Actualizado:
                        </span>
                        <span className="font-medium">
                          {format(card?.updated_at, "dd/MM/yyyy HH:mm")}
                        </span>
                      </div>
                      {/* Puedes mostrar más campos si lo deseas */}
                      <div className="flex gap-1 pt-2">
                        <CardDialog
                          card={card}
                          isEditing={true}
                          onConfirm={fetchCards}
                        />
                        <AlertConfirmationDelete
                          id={card?.id}
                          type="adminCard"
                          onConfirm={handleDeleteCard}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
