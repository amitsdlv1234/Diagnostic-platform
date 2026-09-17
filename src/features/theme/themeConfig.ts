export interface SectionColors {
  background: string;
  heading: string;
  text: string;
  accent: string;
  buttonBackground: string;
  buttonText: string;
  cardBackground: string;
  border: string;
}

export interface ThemeConfig {
  primaryColor: string;

  sections: {
    hero: SectionColors;
    popularTests: SectionColors;
    packages: SectionColors;
    homeCollection: SectionColors;
    centres: SectionColors;
    whyChooseUs: SectionColors;
    howItWorks: SectionColors;
    articles: SectionColors;
    testimonials: SectionColors;
    faq: SectionColors;
    cta: SectionColors;
  };
}

export type SectionName = keyof ThemeConfig["sections"];

/*
 * ============================================================
 * DEFAULT SECTION COLORS
 * ============================================================
 *
 * Apollo Diagnostics inspired color palette:
 *
 * Primary / Accent  : #B21F5B
 * Light Background  : #F8F8FC
 * Card              : #FFFFFF
 * Heading           : #222222
 * Text              : #667085
 * Border            : #E8C7D6
 *
 * These values are used when no custom theme is configured.
 */

export const defaultSectionColors: SectionColors = {
  background: "#F8F8FC",
  heading: "#222222",
  text: "#667085",
  accent: "#B21F5B",
  buttonBackground: "#B21F5B",
  buttonText: "#FFFFFF",
  cardBackground: "#FFFFFF",
  border: "#E8C7D6",
};

/*
 * ============================================================
 * DEFAULT THEME
 * ============================================================
 */

export const defaultThemeConfig: ThemeConfig = {
  /*
   * Global primary color
   */
  primaryColor: "#B21F5B",

  sections: {
    /*
     * ========================================================
     * HERO
     * ========================================================
     */
    hero: {
      ...defaultSectionColors,

      background: "#F8F8FC",
      heading: "#222222",
      text: "#667085",
      accent: "#B21F5B",
      buttonBackground: "#B21F5B",
      buttonText: "#FFFFFF",
      cardBackground: "#FFFFFF",
      border: "#E8C7D6",
    },

    /*
     * ========================================================
     * POPULAR TESTS
     * ========================================================
     */
    popularTests: {
      ...defaultSectionColors,

      background: "#F8F8FC",
      heading: "#222222",
      text: "#667085",
      accent: "#B21F5B",
      buttonBackground: "#B21F5B",
      buttonText: "#FFFFFF",
      cardBackground: "#FFFFFF",
      border: "#E8C7D6",
    },

    /*
     * ========================================================
     * PACKAGES
     * ========================================================
     */
    packages: {
      ...defaultSectionColors,

      background: "#FFFFFF",
      heading: "#222222",
      text: "#667085",
      accent: "#B21F5B",
      buttonBackground: "#B21F5B",
      buttonText: "#FFFFFF",
      cardBackground: "#FFFFFF",
      border: "#E8C7D6",
    },

    /*
     * ========================================================
     * HOME COLLECTION
     * ========================================================
     */
    homeCollection: {
      ...defaultSectionColors,

      /*
       * Light section outside the banner
       */
      background: "#F8F8FC",

      /*
       * Banner uses accent as background
       */
      heading: "#FFFFFF",
      text: "#FFFFFF",
      accent: "#B21F5B",

      /*
       * White CTA button
       */
      buttonBackground: "#FFFFFF",
      buttonText: "#B21F5B",

      cardBackground: "#FFFFFF",
      border: "#E8C7D6",
    },

    /*
     * ========================================================
     * DIAGNOSTIC CENTRES
     * ========================================================
     */
    centres: {
      ...defaultSectionColors,

      background: "#FFFFFF",
      heading: "#222222",
      text: "#667085",
      accent: "#B21F5B",
      buttonBackground: "#B21F5B",
      buttonText: "#FFFFFF",
      cardBackground: "#FFFFFF",
      border: "#E8C7D6",
    },

    /*
     * ========================================================
     * WHY CHOOSE US
     * ========================================================
     */
    whyChooseUs: {
      ...defaultSectionColors,

      background: "#F8F8FC",
      heading: "#222222",
      text: "#667085",
      accent: "#B21F5B",
      buttonBackground: "#B21F5B",
      buttonText: "#FFFFFF",
      cardBackground: "#FFFFFF",
      border: "#E8C7D6",
    },

    /*
     * ========================================================
     * HOW IT WORKS
     * ========================================================
     */
    howItWorks: {
      ...defaultSectionColors,

      background: "#FFFFFF",
      heading: "#222222",
      text: "#667085",
      accent: "#B21F5B",
      buttonBackground: "#B21F5B",
      buttonText: "#FFFFFF",
      cardBackground: "#FFFFFF",
      border: "#E8C7D6",
    },

    /*
     * ========================================================
     * ARTICLES
     * ========================================================
     */
    articles: {
      ...defaultSectionColors,

      background: "#F8F8FC",
      heading: "#222222",
      text: "#667085",
      accent: "#B21F5B",
      buttonBackground: "#B21F5B",
      buttonText: "#FFFFFF",
      cardBackground: "#FFFFFF",
      border: "#E8C7D6",
    },

    /*
     * ========================================================
     * TESTIMONIALS
     * ========================================================
     */
    testimonials: {
      ...defaultSectionColors,

      background: "#FFFFFF",
      heading: "#222222",
      text: "#667085",
      accent: "#B21F5B",
      buttonBackground: "#B21F5B",
      buttonText: "#FFFFFF",
      cardBackground: "#FFFFFF",
      border: "#E8C7D6",
    },

    /*
     * ========================================================
     * FAQ
     * ========================================================
     */
    faq: {
      ...defaultSectionColors,

      background: "#F8F8FC",
      heading: "#222222",
      text: "#667085",
      accent: "#B21F5B",
      buttonBackground: "#B21F5B",
      buttonText: "#FFFFFF",
      cardBackground: "#FFFFFF",
      border: "#E8C7D6",
    },

    /*
     * ========================================================
     * CTA
     * ========================================================
     */
    cta: {
      ...defaultSectionColors,

      /*
       * Main CTA uses brand color
       */
      background: "#B21F5B",
      heading: "#FFFFFF",
      text: "#FCE7F0",
      accent: "#FFFFFF",

      /*
       * White CTA button
       */
      buttonBackground: "#FFFFFF",
      buttonText: "#B21F5B",

      cardBackground: "#FFFFFF",
      border: "#D88AAA",
    },
  },
};

/*
 * ============================================================
 * STORAGE
 * ============================================================
 */

const STORAGE_KEY = "diagnostic_theme_config";

export const THEME_UPDATED_EVENT =
  "diagnostic-theme-updated";

/*
 * ============================================================
 * GET THEME CONFIG
 * ============================================================
 */

export function getThemeConfig(): ThemeConfig {
  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    /*
     * No saved configuration.
     * Return Apollo-style default theme.
     */
    if (!stored) {
      return structuredClone(
        defaultThemeConfig,
      );
    }

    const parsed: Partial<ThemeConfig> =
      JSON.parse(stored);

    /*
     * Merge saved configuration with
     * the latest default configuration.
     *
     * This also protects against older
     * localStorage configurations.
     */
    return {
      ...structuredClone(
        defaultThemeConfig,
      ),

      ...parsed,

      sections: {
        ...structuredClone(
          defaultThemeConfig.sections,
        ),

        ...(parsed.sections || {}),
      },
    };
  } catch {
    /*
     * Invalid localStorage data.
     * Fall back to default theme.
     */
    return structuredClone(
      defaultThemeConfig,
    );
  }
}

/*
 * ============================================================
 * SAVE THEME CONFIG
 * ============================================================
 */

export function saveThemeConfig(
  config: ThemeConfig,
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(config),
  );

  /*
   * Notify components in the same tab.
   */
  window.dispatchEvent(
    new CustomEvent(
      THEME_UPDATED_EVENT,
    ),
  );
}