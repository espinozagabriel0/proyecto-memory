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
        <span title="Eliminar">
          <Trash2 className="text-red-600 cursor-pointer" size={20} />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-red-700"
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
