"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/lib/theme-store";

export default function ThemeToggle() {
  const { theme, toggleTheme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme((saved as "light" | "dark") ?? (prefersDark ? "dark" : "light"));
    setMounted(true);
  }, [setTheme]);

  if (!mounted) return null;

  return (
    <button
      className="text-sm p-2 border rounded-full hover:cursor-pointer"
      onClick={toggleTheme}
    >
      {theme === "light" ? "🌞" : "🌚"}
    </button>
  );
}
