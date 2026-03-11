"use client";
import { createContext, useContext, useEffect, ReactNode } from "react";

const ThemeCtx = createContext<{ theme: "dark"; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Always dark — light theme removed
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme: "dark", toggle: () => {} }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
