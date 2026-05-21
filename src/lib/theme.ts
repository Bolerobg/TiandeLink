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

export const presets: { name: string; theme: ProfileTheme }[] = [
  {
    name: "Linktree Classic",
    theme: { background: "#b7aa7e", surface: "#c7b98b", text: "#35231e", accent: "#655b39", buttonStyle: "solid" },
  },
  {
    name: "Dark Mode",
    theme: { background: "#0f172a", surface: "#1e293b", text: "#f1f5f9", accent: "#38bdf8", buttonStyle: "solid" },
  },
  {
    name: "Rose Gold",
    theme: { background: "#fdf2f8", surface: "#fce7f3", text: "#831843", accent: "#db2777", buttonStyle: "soft" },
  },
  {
    name: "Forest Green",
    theme: { background: "#ecfdf5", surface: "#d1fae5", text: "#064e3b", accent: "#10b981", buttonStyle: "solid" },
  },
  {
    name: "Ocean Blue",
    theme: { background: "#eff6ff", surface: "#dbeafe", text: "#1e3a5f", accent: "#3b82f6", buttonStyle: "outline" },
  },
  {
    name: "Sunset Orange",
    theme: { background: "#fff7ed", surface: "#ffedd5", text: "#7c2d12", accent: "#f97316", buttonStyle: "solid" },
  },
  {
    name: "Lavender Dream",
    theme: { background: "#faf5ff", surface: "#f3e8ff", text: "#4c1d95", accent: "#a855f7", buttonStyle: "soft" },
  },
  {
    name: "Midnight Purple",
    theme: { background: "#1e1b4b", surface: "#312e81", text: "#e0e7ff", accent: "#c084fc", buttonStyle: "solid" },
  },
  {
    name: "Warm Neutral",
    theme: { background: "#fafaf9", surface: "#f5f5f4", text: "#1c1917", accent: "#78716c", buttonStyle: "solid" },
  },
  {
    name: "Retro Pop",
    theme: { background: "#fefce8", surface: "#fef08a", text: "#422006", accent: "#eab308", buttonStyle: "outline" },
  },
];

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
