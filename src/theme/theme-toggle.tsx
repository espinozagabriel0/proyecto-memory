"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="cursor-pointer bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf] hover:bg-hover-background active:bg-active-background rounded-md border border-button-border-color p-1.5 transition-colors"
      title="Toggle theme"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Moon className="w-4 h-4" aria-hidden="true" />
      ) : (
        <Sun className="w-4 h-4" aria-hidden="true" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
