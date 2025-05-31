import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Edit, Plus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import toast from "react-hot-toast";

type Game = {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  clicks: number;
  points: number;
  duration: number;
};

const gameSchema = z.object({
  clicks: z
    .number({ invalid_type_error: "Debe ser un número" })
    .min(0, "Debe ser 0 o mayor"),
  points: z
    .number({ invalid_type_error: "Debe ser un número" })
    .min(0, "Debe ser un número entre 0 y 6")
    .max(6, "Debe ser un número entre 0 y 6"),
  duration: z
    .number({ invalid_type_error: "Debe ser un número" })
    .min(0, "Debe ser un número entre 0 y 20")
    .max(20, "Debe ser un número entre 0 y 20"),
});

export default function GameDialog({
  game = null,
  isEditing = false,
  onConfirm = () => {},
}: {
  game?: Game | null;
  isEditing?: boolean;
  onConfirm?: () => void;
}) {
  const form = useForm({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      clicks: game?.clicks ?? 0,
      points: game?.points ?? 0,
      duration: game?.duration ?? 0,
    },
  });

  useEffect(() => {
    form.reset({
      clicks: game?.clicks ?? 0,
      points: game?.points ?? 0,
      duration: game?.duration ?? 0,
    });
  }, [game, form]);

  //   const handleCreateGame = async (values: unknown) => {
  //     try {
  //       const response = await fetch(
  //         "https://m7-uf4-laravel-production.up.railway.app/api/games",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(values),
  //         }
  //       );
  //       const data = await response.json();

  //       if (!response.ok) {
  //         toast.error("No se ha podido crear la partida.");
  //         return;
  //       }

  //       toast.success("Partida creada correctamente.");
  //       form.reset();
  //       console.log(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const handleUpdateGame = async (values: unknown) => {
    try {
      const token = localStorage.getItem("token");
      const gameId = game?.id;
      if (!gameId || !token) return;

      const response = await fetch(
        `https://m7-uf4-laravel-production.up.railway.app/api/games/${gameId}/finish`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        toast.error("No se ha podido actualizar la partida.");
        return;
      }
      const data = await response.json();

      toast.success("Partida actualizada correctamente.");

      form.reset();
      console.log("Partida actualizada: ", data);
    } catch (error) {
      console.error(error);
      toast.error("No se ha podido actualizar la partida.");
    }
  };

  const onSubmit = async (values: unknown) => {
    try {
      console.log(values);
      //   if (isEditing && game?.id) {
      //     await handleUpdateGame(values, game.id);
      //   } else {
      //     await handleCreateGame(values);
      //   }
      await handleUpdateGame(values);

      onConfirm();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button variant="outline" size="sm" className="flex-1">
            <Edit className="h-3 w-3 mr-1" />
            Editar
          </Button>
        ) : (
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nueva Partida
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar partida" : "Crear partida"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>{""}</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="clicks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clicks</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Cantidad de clicks"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Puntos</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Cantidad de puntos"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duración (segundos)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Duración en segundos"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <DialogFooter className="p-5">
              <Button type="submit" className="w-full">
                {isEditing ? "Guardar cambios" : "Crear partida"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
