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

type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  password?: string;
  password_confirmation?: string;
};

const userSchema = z
  .object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().email("Correo inválido"),
    role: z.enum(["admin", "user"]),
    password: z.string().min(5, "Mínimo 5 caracteres").optional(),
    password_confirmation: z.string().optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Las contraseñas no coinciden",
  });

export default function UserDialog({
  user = null,
  isEditing = false,
  onConfirm = () => {},
}: {
  user?: User | null;
  isEditing?: boolean;
  onConfirm?: () => void;
}) {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "user",
      password: "",
      password_confirmation: "",
    },
  });

  useEffect(() => {
    form.reset({
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "user",
      password: "",
      password_confirmation: "",
    });
  }, [user, form]);

  const handleRegister = async (values: unknown) => {
    try {
      const response = await fetch(
        "https://m7-uf4-laravel-production.up.railway.app/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error("No se ha podido crear el usuario.");
        return;
      }

      toast.success("Usuario creado correctamente.");
      form.reset();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateUser = async (values: unknown, userId: number) => {
    try {
      if (!userId) return;

      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://m7-uf4-laravel-production.up.railway.app/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();

      console.log(response, data);

      if (!response.ok) {
        toast.error("No se ha podido actualizar el usuario.");
        return;
      }

      toast.success("Usuario actualizado correctamente.");
      form.reset();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (values: unknown) => {
    console.log(values);

    try {
      if (isEditing && user?.id) {
        await handleUpdateUser(values, user.id);
      } else {
        await handleRegister(values);
      }

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
            Nuevo Usuario
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar usuario" : "Crear usuario"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>{""}</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full border rounded px-2 py-1"
                      >
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nueva contraseña"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Repite la contraseña"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <DialogFooter className="p-5">
              <Button type="submit" className="w-full">
                {isEditing ? "Guardar cambios" : "Crear usuario"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
