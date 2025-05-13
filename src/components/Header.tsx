"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ThemeToggle from "@/theme/theme-toggle";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { started, currentUser, setCurrentUser } = useContext(AppContext);

  const handleLogout = () => {
    setCurrentUser(null);
    router.push("/login");
  };
  return (
    <header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <span className="text-lg font-medium">PokeMemory</span>
      </Link>
      <nav className="hidden items-center gap-6 lg:flex">
        <Link
          href="/"
          className="text-sm font-medium transition-colors hover:text-primary"
          prefetch={false}
        >
          Juego
        </Link>
        <Link
          href="/about"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            started && "pointer-events-none opacity-50"
          )}
          aria-disabled={started}
          tabIndex={started ? -1 : 0}
          prefetch={false}
        >
          Acerca de
        </Link>
        <Link
          href="/partidas"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            started && "pointer-events-none opacity-50"
          )}
          aria-disabled={started}
          tabIndex={started ? -1 : 0}
          prefetch={false}
        >
          Partidas
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>GB</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center gap-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>GB</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 leading-none">
                <div className="font-semibold">
                  {currentUser ? currentUser.name : "Sin Nombre"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentUser ? currentUser.email : "ejemplo@email.com"}
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href="#"
                className="flex items-center gap-2"
                prefetch={false}
              >
                <div className="h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="#"
                className="flex items-center gap-2"
                prefetch={false}
              >
                <div className="h-4 w-4" />
                <span>Configuración</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button
                type="button"
                className="flex w-full items-center gap-2"
                onClick={handleLogout}
              >
                <div className="h-4 w-4" />
                <span>Cerrar sesión</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          onClick={() => router.push("/login")}
          disabled={started}
        >
          Login
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
