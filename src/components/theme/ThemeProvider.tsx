import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  defaultThemeConfig,
  getThemeConfig,
  saveThemeConfig,
  THEME_UPDATED_EVENT,
  type ThemeConfig,
  type SectionColors,
  type SectionName,
} from "../../features/theme/themeConfig";

interface ThemeContextType {
  theme: ThemeConfig;

  setTheme: (
    theme: ThemeConfig,
  ) => void;

  resetTheme: () => void;

  updateSectionColors: (
    section: SectionName,
    colors: Partial<SectionColors>,
  ) => void;

  getSectionColors: (
    section: SectionName,
  ) => SectionColors;
}

const ThemeContext =
  createContext<ThemeContextType | null>(
    null,
  );

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setThemeState] =
    useState<ThemeConfig>(() =>
      getThemeConfig(),
    );

  /*
   * Apply theme whenever theme changes.
   */
  useEffect(() => {
    const root =
      document.documentElement;

    /*
     * Global primary color
     */
    root.style.setProperty(
      "--theme-primary",
      theme.primaryColor,
    );

    /*
     * Apply section colors
     */
    (
      Object.entries(
        theme.sections,
      ) as [
        SectionName,
        SectionColors,
      ][]
    ).forEach(
      ([sectionName, colors]) => {
        const prefix =
          `--section-${sectionName}`;

        root.style.setProperty(
          `${prefix}-background`,
          colors.background,
        );

        root.style.setProperty(
          `${prefix}-heading`,
          colors.heading,
        );

        root.style.setProperty(
          `${prefix}-text`,
          colors.text,
        );

        root.style.setProperty(
          `${prefix}-accent`,
          colors.accent,
        );

        root.style.setProperty(
          `${prefix}-button-background`,
          colors.buttonBackground,
        );

        root.style.setProperty(
          `${prefix}-button-text`,
          colors.buttonText,
        );

        root.style.setProperty(
          `${prefix}-card-background`,
          colors.cardBackground,
        );

        root.style.setProperty(
          `${prefix}-border`,
          colors.border,
        );
      },
    );

    /*
     * Save theme.
     */
    saveThemeConfig(theme);
  }, [theme]);

  /*
   * Listen for changes from another tab.
   */
  useEffect(() => {
    const handleStorage = (
      event: StorageEvent,
    ) => {
      if (
        event.key ===
        "diagnostic_theme_config"
      ) {
        setThemeState(
          getThemeConfig(),
        );
      }
    };

    const handleThemeUpdate = () => {
      setThemeState(
        getThemeConfig(),
      );
    };

    window.addEventListener(
      "storage",
      handleStorage,
    );

    window.addEventListener(
      THEME_UPDATED_EVENT,
      handleThemeUpdate,
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage,
      );

      window.removeEventListener(
        THEME_UPDATED_EVENT,
        handleThemeUpdate,
      );
    };
  }, []);

  /*
   * Replace complete theme.
   */
  const setTheme = (
    nextTheme: ThemeConfig,
  ) => {
    setThemeState(nextTheme);
  };

  /*
   * Reset complete theme.
   */
  const resetTheme = () => {
    setThemeState(
      structuredClone(
        defaultThemeConfig,
      ),
    );
  };

  /*
   * Update one section's colors.
   */
  const updateSectionColors = (
    section: SectionName,
    colors: Partial<SectionColors>,
  ) => {
    setThemeState(
      (
        previous: ThemeConfig,
      ): ThemeConfig => ({
        ...previous,

        sections: {
          ...previous.sections,

          [section]: {
            ...previous.sections[
              section
            ],

            ...colors,
          },
        },
      }),
    );
  };

  /*
   * Get one section's colors.
   */
  const getSectionColors = (
    section: SectionName,
  ): SectionColors => {
    return theme.sections[section];
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        resetTheme,
        updateSectionColors,
        getSectionColors,
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