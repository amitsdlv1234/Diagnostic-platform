export type ThemeColor =
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "teal"
  | "red";

export type ThemeMode = "light" | "soft";

export interface ThemeSettings {
  color: ThemeColor;
  mode: ThemeMode;
  borderRadius: "small" | "medium" | "large";
}

export const defaultTheme: ThemeSettings = {
  color: "blue",
  mode: "light",
  borderRadius: "medium",
};

export const themeColors: Record<
  ThemeColor,
  {
    name: string;
    primary: string;
    light: string;
    text: string;
  }
> = {
  blue: {
    name: "Blue",
    primary: "#2563eb",
    light: "#eff6ff",
    text: "#1d4ed8",
  },

  green: {
    name: "Green",
    primary: "#16a34a",
    light: "#f0fdf4",
    text: "#15803d",
  },

  purple: {
    name: "Purple",
    primary: "#7c3aed",
    light: "#f5f3ff",
    text: "#6d28d9",
  },

  orange: {
    name: "Orange",
    primary: "#ea580c",
    light: "#fff7ed",
    text: "#c2410c",
  },

  teal: {
    name: "Teal",
    primary: "#0d9488",
    light: "#f0fdfa",
    text: "#0f766e",
  },

  red: {
    name: "Red",
    primary: "#dc2626",
    light: "#fef2f2",
    text: "#b91c1c",
  },
};

