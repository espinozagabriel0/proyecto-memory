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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Users,
  GamepadIcon,
  CreditCard,
  Plus,
  Edit,
  Trash2,
  Search,
  Play,
  Pause,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
  role: "admin" | "user";
};

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://m7-uf4-laravel-production.up.railway.app/api/users",
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
        const usersData = await response.json();
        setUsers(usersData?.data || []);
      } catch (error) {
        console.error("Error fetching users data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  console.log("users", users);

  if (isLoading) {
    return "cargando...";
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
        <Tabs defaultValue="usuarios" className="w-full">
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 flex-1 max-w-sm">
                <Search className="h-4 w-4" />
                <Input placeholder="Buscar usuarios..." />
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nuevo Usuario
              </Button>
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
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gestión de Partidas */}
          <TabsContent value="partidas" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 flex-1 max-w-sm">
                <Search className="h-4 w-4" />
                <Input placeholder="Buscar partidas..." />
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nueva Partida
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((game) => (
                <Card key={game} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          Partida #{game.toString().padStart(3, "0")}
                        </CardTitle>
                        <CardDescription>
                          Creada hace {Math.floor(Math.random() * 7) + 1} días
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          game % 3 === 0
                            ? "default"
                            : game % 3 === 1
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {game % 3 === 0
                          ? "Activa"
                          : game % 3 === 1
                          ? "Pausada"
                          : "Finalizada"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Jugadores:
                        </span>
                        <span className="font-medium">
                          {Math.floor(Math.random() * 4) + 2}/6
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duración:</span>
                        <span className="font-medium">
                          {Math.floor(Math.random() * 120) + 30}min
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Puntuación:
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">
                            {(Math.random() * 2 + 3).toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          {game % 3 === 0 ? (
                            <Pause className="h-3 w-3 mr-1" />
                          ) : (
                            <Play className="h-3 w-3 mr-1" />
                          )}
                          {game % 3 === 0 ? "Pausar" : "Reanudar"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gestión de Tarjetas */}
          <TabsContent value="tarjetas" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 flex-1 max-w-sm">
                <Search className="h-4 w-4" />
                <Input placeholder="Buscar tarjetas..." />
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nueva Tarjeta
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((card) => (
                <Card key={card} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-2">
                      <CreditCard className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-sm">Tarjeta {card}</CardTitle>
                    <CardDescription>
                      Tipo: {card % 2 === 0 ? "Ataque" : "Defensa"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Poder:</span>
                        <span className="font-medium">
                          {Math.floor(Math.random() * 100) + 50}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rareza:</span>
                        <Badge
                          variant={card % 3 === 0 ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {card % 3 === 0
                            ? "Épica"
                            : card % 3 === 1
                            ? "Rara"
                            : "Común"}
                        </Badge>
                      </div>
                      <div className="flex gap-1 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Trash2 className="h-3 w-3" />
                        </Button>
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
