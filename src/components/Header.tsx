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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ThemeToggle from "@/theme/theme-toggle";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { usePathname, useRouter } from "next/navigation";
import { User } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const { started, logout, userData, isAuthenticated } = useContext(AppContext);

  const handleLogout = async () => {
    await logout();
    router.push("login");
  };

  const pathname = usePathname();

  return (
    <header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6">
      <Link href="/game" className="flex items-center gap-2" prefetch={false}>
        <span className="text-lg font-medium">PokeMemory</span>
      </Link>
      <nav className="hidden items-center gap-6 lg:flex">
        <Link
          href="/game"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary text-slate-300",
            pathname === "/game" && "text-primary dark:text-green-400"
          )}
          prefetch={false}
        >
          Juego
        </Link>
        <Link
          href="/"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary text-slate-300",
            pathname === "/" && "text-primary dark:text-green-400",
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
            "text-sm font-medium transition-colors hover:text-primary text-slate-300",
            pathname === "/partidas" && "text-primary dark:text-green-400",
            started && "pointer-events-none opacity-50"
          )}
          aria-disabled={started}
          tabIndex={started ? -1 : 0}
          prefetch={false}
        >
          Partidas
        </Link>
        {isAuthenticated && userData?.role === "admin" && (
          <Link
            href="/gestion"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary text-slate-300",
              pathname === "/gestion" && "text-primary dark:text-green-400",
              started && "pointer-events-none opacity-50"
            )}
            aria-disabled={started}
            tabIndex={started ? -1 : 0}
            prefetch={false}
          >
            Gestión
          </Link>
        )}
      </nav>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                {/* <AvatarImage src="/placeholder-user.jpg" /> */}
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center gap-2 p-2">
              <Avatar className="h-8 w-8">
                {/* <AvatarImage src="/placeholder-user.jpg" /> */}
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 leading-none">
                <div className="font-semibold">
                  {userData?.name || "Sin Nombre"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {userData?.email || "ejemplo@email.com"}
                </div>
              </div>
            </div>
            {/* <DropdownMenuItem
              disabled={!isAuthenticated}
              className="cursor-pointer"
            >
              <Link
                href="#"
                className="flex items-center gap-2"
                prefetch={false}
              >
                <div className="h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            {isAuthenticated && (
              <DropdownMenuItem asChild className="cursor-pointer">
                <button
                  type="button"
                  className="flex w-full items-center gap-2"
                  onClick={handleLogout}
                >
                  <div className="h-4 w-4" />
                  <span>Cerrar sesión</span>
                </button>
              </DropdownMenuItem>
            )}
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
