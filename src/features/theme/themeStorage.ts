import {
  defaultTheme,
} from "./themeDefaults";

import type {
  ThemeSettings,
} from "./themeTypes";

export const THEME_STORAGE_KEY =
  "diagnostic-admin-theme";

export function getTheme(): ThemeSettings {
  try {
    const stored =
      localStorage.getItem(
        THEME_STORAGE_KEY,
      );

    if (!stored) {
      return defaultTheme;
    }

    return {
      ...defaultTheme,
      ...JSON.parse(stored),
    };
  } catch {
    return defaultTheme;
  }
}

export function saveTheme(
  theme: ThemeSettings,
): void {
  localStorage.setItem(
    THEME_STORAGE_KEY,
    JSON.stringify(theme),
  );
}

export function resetTheme(): void {
  localStorage.removeItem(
    THEME_STORAGE_KEY,
  );
}
