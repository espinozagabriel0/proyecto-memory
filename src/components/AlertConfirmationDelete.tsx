import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

// Puedes tipar las props si usas TypeScript
type Props = {
  id: number;
  type: string;
  onConfirm: (id: number) => Promise<void>;
};

export default function AlertConfirmationDelete({
  id,
  type,
  onConfirm,
}: Props) {
  // Mensaje condicional según el tipo
  const getDialogContent = () => {
    if (type === "game") {
      return {
        title: "¿Estás seguro de eliminar esta partida?",
        description:
          "Esta acción no se puede deshacer. Se eliminará la partida y todos sus datos asociados.",
        action: "Eliminar partida",
      };
    }

    if (type === "user") {
      return {
        title: "¿Estás seguro de eliminar este usuario?",
        description:
          "Esta acción no se puede deshacer. Se eliminará el usuario y todos sus datos asociados.",
        action: "Eliminar usuario",
      };
    }

    if (type === "adminGame") {
      return {
        title: "¿Estás seguro de eliminar esta partida?",
        description:
          "Esta acción no se puede deshacer. Se eliminará la partida y todos sus datos asociados.",
        action: "Eliminar partida",
      };
    }
    // Otros tipos...
    return {
      title: "Are you absolutely sure?",
      description:
        "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
      action: "Continue",
    };
  };

  const { title, description, action } = getDialogContent();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {type === "user" || type === "adminGame" ? (
          <Button variant="outline" size="sm" className="flex-1">
            <Trash2 className="h-3 w-3 mr-1" />
            Eliminar
          </Button>
        ) : (
          <span title="Eliminar">
            <Trash2 className="text-red-600 cursor-pointer" size={20} />
          </span>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-700"
            onClick={async () => {
              await onConfirm(id);
            }}
          >
            {action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
