import {
  useEffect,
  useState,
} from "react";

import {
  getThemeConfig,
  THEME_UPDATED_EVENT,
  type ThemeConfig,
} from "./themeConfig";

export function useTheme() {
  const [theme, setTheme] =
    useState<ThemeConfig>(
      getThemeConfig(),
    );

  useEffect(() => {
    const updateTheme = () => {
      setTheme(getThemeConfig());
    };

    window.addEventListener(
      THEME_UPDATED_EVENT,
      updateTheme,
    );

    window.addEventListener(
      "storage",
      updateTheme,
    );

    return () => {
      window.removeEventListener(
        THEME_UPDATED_EVENT,
        updateTheme,
      );

      window.removeEventListener(
        "storage",
        updateTheme,
      );
    };
  }, []);

  return theme;
}