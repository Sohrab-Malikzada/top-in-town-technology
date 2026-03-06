import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("tit-theme");
    return (saved === "dark" ? "dark" : "light") as Theme;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("tit-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be within ThemeProvider");
  return ctx;
};
