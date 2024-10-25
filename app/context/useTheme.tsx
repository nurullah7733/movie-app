"use client";
import { useContext, createContext, useState, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: Theme;
}

// Helper function for cookie management
const setCookie = (theme: Theme) => {
  document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Strict`;
};

// Function to update CSS variables
const updateCSSVariables = (theme: Theme) => {
  if (theme === "dark") {
    document.documentElement.style.setProperty("--background", "#0a0a0a");
    document.documentElement.style.setProperty("--foreground", "#ededed");
  } else {
    document.documentElement.style.setProperty("--background", "#ffffff");
    document.documentElement.style.setProperty("--foreground", "#171717");
  }
};

// Helper function to get theme from storage
const getStoredTheme = (): Theme | null => {
  try {
    const localTheme = localStorage.getItem("theme");
    if (localTheme === "dark" || localTheme === "light") {
      return localTheme;
    }
    return null;
  } catch (error) {
    console.error("Error reading theme from localStorage:", error);
    return null;
  }
};

// Helper function to get system preference
const getSystemTheme = (): Theme => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
  theme: "light",
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    try {
      const storedTheme = getStoredTheme();
      const initialTheme = storedTheme || getSystemTheme();

      setTheme(initialTheme);
      setIsDarkMode(initialTheme === "dark");

      // Update CSS variables and DOM
      updateCSSVariables(initialTheme);
      document.documentElement.classList.toggle(
        "dark",
        initialTheme === "dark"
      );

      setCookie(initialTheme);

      // Listen for system theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        if (!getStoredTheme()) {
          // Only update if no user preference is stored
          const newTheme = e.matches ? "dark" : "light";
          setTheme(newTheme);
          setIsDarkMode(e.matches);
          document.documentElement.classList.toggle("dark", e.matches);
          setCookie(newTheme);
          updateCSSVariables(newTheme);
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } catch (error) {
      console.error("Error initializing theme:", error);
    }
  }, []);

  const toggleTheme = () => {
    try {
      const newTheme = theme === "dark" ? "light" : "dark";

      // Update state
      setTheme(newTheme);
      setIsDarkMode(newTheme === "dark");

      // Update localStorage
      localStorage.setItem("theme", newTheme);

      // Update cookie for middleware
      setCookie(newTheme);

      // Update CSS variables and DOM
      updateCSSVariables(newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    } catch (error) {
      console.error("Error toggling theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
