export type ProfileTheme = {
  background: string;
  surface: string;
  text: string;
  accent: string;
  buttonStyle: "solid" | "outline" | "soft";
  cardRadius: string;
  cardShadow: string;
  fontFamily: string;
};

export const defaultTheme: ProfileTheme = {
  background: "#b7aa7e",
  surface: "#c7b98b",
  text: "#35231e",
  accent: "#655b39",
  buttonStyle: "solid",
  cardRadius: "22px",
  cardShadow: "3px 4px 0",
  fontFamily: "Georgia, serif",
};

export const presets: { name: string; theme: ProfileTheme }[] = [
  {
    name: "Linktree Classic",
    theme: { background: "#b7aa7e", surface: "#c7b98b", text: "#35231e", accent: "#655b39", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Dark Mode",
    theme: { background: "#0f172a", surface: "#1e293b", text: "#f1f5f9", accent: "#38bdf8", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Rose Gold",
    theme: { background: "#fdf2f8", surface: "#fce7f3", text: "#831843", accent: "#db2777", buttonStyle: "soft", cardRadius: "28px", cardShadow: "0 4px 16px -4px", fontFamily: "Georgia, serif" },
  },
  {
    name: "Forest Green",
    theme: { background: "#ecfdf5", surface: "#d1fae5", text: "#064e3b", accent: "#10b981", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Ocean Blue",
    theme: { background: "#eff6ff", surface: "#dbeafe", text: "#1e3a5f", accent: "#3b82f6", buttonStyle: "outline", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Sunset Orange",
    theme: { background: "#fff7ed", surface: "#ffedd5", text: "#7c2d12", accent: "#f97316", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Lavender Dream",
    theme: { background: "#faf5ff", surface: "#f3e8ff", text: "#4c1d95", accent: "#a855f7", buttonStyle: "soft", cardRadius: "28px", cardShadow: "0 4px 16px -4px", fontFamily: "Georgia, serif" },
  },
  {
    name: "Midnight Purple",
    theme: { background: "#1e1b4b", surface: "#312e81", text: "#e0e7ff", accent: "#c084fc", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Warm Neutral",
    theme: { background: "#fafaf9", surface: "#f5f5f4", text: "#1c1917", accent: "#78716c", buttonStyle: "solid", cardRadius: "14px", cardShadow: "0 2px 8px -2px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Retro Pop",
    theme: { background: "#fefce8", surface: "#fef08a", text: "#422006", accent: "#eab308", buttonStyle: "outline", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Neon Tokyo",
    theme: { background: "#0a0a0a", surface: "#1a1a2e", text: "#e0e0ff", accent: "#ff2d95", buttonStyle: "solid", cardRadius: "32px", cardShadow: "0 0 20px -2px", fontFamily: "'Courier New', monospace" },
  },
  {
    name: "Bubblegum Pop",
    theme: { background: "#fff0f5", surface: "#ffe4ec", text: "#9d174d", accent: "#f472b6", buttonStyle: "soft", cardRadius: "28px", cardShadow: "0 4px 16px -4px", fontFamily: "'Comic Sans MS', cursive" },
  },
  {
    name: "Arctic Frost",
    theme: { background: "#f0f9ff", surface: "#e0f2fe", text: "#0c4a6e", accent: "#0ea5e9", buttonStyle: "solid", cardRadius: "16px", cardShadow: "0 2px 12px -2px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Cyberpunk 2077",
    theme: { background: "#0d0d0d", surface: "#1a1a1a", text: "#00ff88", accent: "#ff00ff", buttonStyle: "outline", cardRadius: "4px", cardShadow: "0 0 12px -2px", fontFamily: "'Courier New', monospace" },
  },
  {
    name: "Golden Hour",
    theme: { background: "#fff5e6", surface: "#ffe4b5", text: "#5c3d2e", accent: "#d97706", buttonStyle: "solid", cardRadius: "28px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Mint Fresh",
    theme: { background: "#f0fdf4", surface: "#dcfce7", text: "#14532d", accent: "#22c55e", buttonStyle: "solid", cardRadius: "24px", cardShadow: "0 3px 12px -2px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Cherry Blossom",
    theme: { background: "#fff1f2", surface: "#ffe4e6", text: "#881337", accent: "#e11d48", buttonStyle: "soft", cardRadius: "28px", cardShadow: "0 4px 16px -4px", fontFamily: "Georgia, serif" },
  },
  {
    name: "Deep Space",
    theme: { background: "#020617", surface: "#0f172a", text: "#e2e8f0", accent: "#6366f1", buttonStyle: "solid", cardRadius: "18px", cardShadow: "0 0 24px -4px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Matcha Latte",
    theme: { background: "#f9faf5", surface: "#e8ecd6", text: "#3d4224", accent: "#84a935", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Sunset Beach",
    theme: { background: "#fff8f0", surface: "#fff0e0", text: "#4a3728", accent: "#ff7f50", buttonStyle: "solid", cardRadius: "24px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Minimal White",
    theme: { background: "#ffffff", surface: "#f8f8f8", text: "#0a0a0a", accent: "#6b7280", buttonStyle: "outline", cardRadius: "12px", cardShadow: "0 1px 3px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Ember Glow",
    theme: { background: "#1a0a00", surface: "#2d1a10", text: "#ffe0c0", accent: "#f97316", buttonStyle: "solid", cardRadius: "22px", cardShadow: "0 0 16px -2px", fontFamily: "Georgia, serif" },
  },
  {
    name: "Aqua Dreams",
    theme: { background: "#ecfeff", surface: "#cffafe", text: "#164e63", accent: "#06b6d4", buttonStyle: "outline", cardRadius: "28px", cardShadow: "0 4px 16px -4px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Gothic Noir",
    theme: { background: "#0a0a0a", surface: "#1a1a1a", text: "#d4d4d4", accent: "#a855f7", buttonStyle: "outline", cardRadius: "2px", cardShadow: "0 0 0 1px", fontFamily: "'Times New Roman', serif" },
  },
  {
    name: "Tropical Vibes",
    theme: { background: "#fff7ed", surface: "#fed7aa", text: "#7c2d12", accent: "#ea580c", buttonStyle: "solid", cardRadius: "28px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
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
    cardRadius: theme.cardRadius || defaultTheme.cardRadius,
    cardShadow: theme.cardShadow || defaultTheme.cardShadow,
    fontFamily: theme.fontFamily || defaultTheme.fontFamily,
  };
}
