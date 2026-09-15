export type RadiusSize =
  | "small"
  | "medium"
  | "large"
  | "pill";

export type ShadowSize =
  | "none"
  | "soft"
  | "strong";

export interface ThemeSettings {
  name: string;

  primaryColor: string;
  secondaryColor: string;

  backgroundColor: string;
  sectionBackgroundColor: string;

  textColor: string;
  mutedTextColor: string;

  borderColor: string;

  buttonRadius: RadiusSize;
  cardRadius: RadiusSize;

  cardShadow: ShadowSize;
}
