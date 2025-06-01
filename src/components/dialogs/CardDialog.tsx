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
import Image from "next/image";

// Tipo de Card
type CardType = {
  id?: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  url: string;
  category_id?: number | null;
  user_id?: number | null;
  user?: unknown | null;
  category?: unknown | null;
};

// Esquema de validación para el formulario de Card
const cardSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  url: z.string().url("Debe ser una URL válida"),
  category_id: z.union([z.number(), z.null()]).optional(),
});

export default function CardDialog({
  card = null,
  isEditing = false,
  onConfirm = () => {},
}: {
  card?: CardType | null;
  isEditing?: boolean;
  onConfirm?: () => void;
}) {
  const form = useForm({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      name: card?.name ?? "",
      url: card?.url ?? "",
      category_id: card?.category_id ?? null,
    },
  });

  useEffect(() => {
    form.reset({
      name: card?.name ?? "",
      url: card?.url ?? "",
      category_id: card?.category_id ?? null,
    });
  }, [card, form]);

  const handleCreateCard = async (values: unknown) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        "https://m7-uf4-laravel-production.up.railway.app/api/cards",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );
      console.log(response);
      const data = await response.json();

      if (!response.ok) {
        toast.error("No se ha podido crear la carta.");
        return;
      }

      toast.success("Carta creada correctamente.");
      form.reset();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCard = async (values: unknown) => {
    try {
      const token = localStorage.getItem("token");
      const cardId = card?.id;

      if (!cardId || !token) return;

      const response = await fetch(
        `https://m7-uf4-laravel-production.up.railway.app/api/cards/${cardId}`,
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
        toast.error("No se ha podido actualizar la carta.");
        return;
      }
      const data = await response.json();
      console.log(response, data);

      toast.success("Carta actualizada correctamente.");

      form.reset();
      console.log("Carta actualizada: ", data);
    } catch (error) {
      console.error(error);
      toast.error("No se ha podido actualizar la carta.");
    }
  };

  // Puedes adaptar esta función para crear/editar según tu API
  const handleSubmitCard = async (values: unknown) => {
    try {
      if (isEditing && card?.id) {
        await handleUpdateCard(values);
      } else {
        await handleCreateCard(values);
      }

      onConfirm();
      form.reset();
    } catch (error) {
      toast.error("No se ha podido guardar la carta.");
      console.error(error);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
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
            Nueva Carta
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar carta" : "Crear carta"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {isEditing
            ? "Modifica los datos de la carta."
            : "Introduce los datos de la nueva carta."}
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitCard)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre de la carta"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de la imagen</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="URL de la imagen"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Previsualización de la imagen */}
              {isValidUrl(form.watch("url")) && (
                <div className="flex justify-center">
                  <Image
                    src={form.watch("url")}
                    alt={form.watch("name") || "Imagen de la carta"}
                    width={96}
                    height={96}
                    className="rounded-lg border"
                  />
                </div>
              )}

              {/* <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="ID de categoría"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? null
                              : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </CardContent>
            <DialogFooter className="p-5">
              <Button type="submit" className="w-full">
                {isEditing ? "Guardar cambios" : "Crear carta"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
