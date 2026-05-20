export type ProfileTheme = {
  background: string;
  surface: string;
  text: string;
  accent: string;
  buttonStyle: "solid" | "outline" | "soft";
};

export const defaultTheme: ProfileTheme = {
  background: "#b7aa7e",
  surface: "#c7b98b",
  text: "#35231e",
  accent: "#655b39",
  buttonStyle: "solid",
};

export function parseTheme(value: unknown): ProfileTheme {
  if (!value || typeof value !== "object") {
    return defaultTheme;
  }

  const theme = value as Partial<ProfileTheme>;

  return {
    background: theme.background || defaultTheme.background,
    surface: theme.surface || defaultTheme.surface,
    text: theme.text || defaultTheme.text,
    accent: theme.accent || defaultTheme.accent,
    buttonStyle: theme.buttonStyle || defaultTheme.buttonStyle,
  };
}
