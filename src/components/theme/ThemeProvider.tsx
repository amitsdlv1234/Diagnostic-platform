import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  defaultTheme,
  themeColors,
  type ThemeSettings,
} from "./themeTypes";

const STORAGE_KEY = "diagnostic-admin-theme";

interface ThemeContextType {
  theme: ThemeSettings;
  setTheme: (theme: ThemeSettings) => void;
  resetTheme: () => void;
}

const ThemeContext =
  createContext<ThemeContextType | null>(null);

function loadTheme(): ThemeSettings {
  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (stored) {
      return {
        ...defaultTheme,
        ...JSON.parse(stored),
      };
    }
  } catch {
    // Use default theme.
  }

  return defaultTheme;
}

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setThemeState] =
    useState<ThemeSettings>(loadTheme);

  useEffect(() => {
    const root = document.documentElement;

    const color =
      themeColors[theme.color];

    root.style.setProperty(
      "--theme-primary",
      color.primary,
    );

    root.style.setProperty(
      "--theme-primary-light",
      color.light,
    );

    root.style.setProperty(
      "--theme-primary-text",
      color.text,
    );

    root.dataset.theme = theme.color;
    root.dataset.themeMode = theme.mode;
    root.dataset.radius = theme.borderRadius;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(theme),
    );
  }, [theme]);

  const setTheme = (
    nextTheme: ThemeSettings,
  ) => {
    setThemeState(nextTheme);
  };

  const resetTheme = () => {
    setThemeState(defaultTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider",
    );
  }

  return context;
}