export type ProfileTheme = {
  background: string;
  surface: string;
  text: string;
  accent: string;
  buttonStyle: "solid" | "outline" | "soft";
  cardRadius: string;
  cardShadow: string;
  fontFamily: string;
  template: string;
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
  template: "classic",
};

export const presets: { name: string; theme: ProfileTheme }[] = [
  {
    name: "Classic Linktree",
    theme: { template: "classic", background: "#b7aa7e", surface: "#c7b98b", text: "#35231e", accent: "#655b39", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Dark Mode",
    theme: { template: "classic", background: "#0f172a", surface: "#1e293b", text: "#f1f5f9", accent: "#38bdf8", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Rose Gold",
    theme: { template: "classic", background: "#fdf2f8", surface: "#fce7f3", text: "#831843", accent: "#db2777", buttonStyle: "soft", cardRadius: "28px", cardShadow: "0 4px 16px -4px", fontFamily: "Georgia, serif" },
  },
  {
    name: "Forest Green",
    theme: { template: "classic", background: "#ecfdf5", surface: "#d1fae5", text: "#064e3b", accent: "#10b981", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Ocean Blue",
    theme: { template: "classic", background: "#eff6ff", surface: "#dbeafe", text: "#1e3a5f", accent: "#3b82f6", buttonStyle: "outline", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Sunset Orange",
    theme: { template: "classic", background: "#fff7ed", surface: "#ffedd5", text: "#7c2d12", accent: "#f97316", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Lavender Dream",
    theme: { template: "classic", background: "#faf5ff", surface: "#f3e8ff", text: "#4c1d95", accent: "#a855f7", buttonStyle: "soft", cardRadius: "28px", cardShadow: "0 4px 16px -4px", fontFamily: "Georgia, serif" },
  },
  {
    name: "Midnight Purple",
    theme: { template: "classic", background: "#1e1b4b", surface: "#312e81", text: "#e0e7ff", accent: "#c084fc", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Warm Neutral",
    theme: { template: "classic", background: "#fafaf9", surface: "#f5f5f4", text: "#1c1917", accent: "#78716c", buttonStyle: "solid", cardRadius: "14px", cardShadow: "0 2px 8px -2px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Retro Pop",
    theme: { template: "classic", background: "#fefce8", surface: "#fef08a", text: "#422006", accent: "#eab308", buttonStyle: "outline", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Neon Tokyo",
    theme: { template: "neon", background: "#0a0a0a", surface: "#1a1a2e", text: "#e0e0ff", accent: "#ff2d95", buttonStyle: "solid", cardRadius: "32px", cardShadow: "0 0 20px -2px", fontFamily: "'Courier New', monospace" },
  },
  {
    name: "Bubblegum Pop",
    theme: { template: "bubblegum", background: "#fff0f5", surface: "#ffe4ec", text: "#9d174d", accent: "#f472b6", buttonStyle: "soft", cardRadius: "28px", cardShadow: "0 4px 16px -4px", fontFamily: "'Comic Sans MS', cursive" },
  },
  {
    name: "Arctic Frost",
    theme: { template: "glass", background: "#f0f9ff", surface: "#e0f2fe", text: "#0c4a6e", accent: "#0ea5e9", buttonStyle: "solid", cardRadius: "16px", cardShadow: "0 2px 12px -2px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Cyberpunk 2077",
    theme: { template: "cyberpunk", background: "#0d0d0d", surface: "#1a1a1a", text: "#00ff88", accent: "#ff00ff", buttonStyle: "outline", cardRadius: "4px", cardShadow: "0 0 12px -2px", fontFamily: "'Courier New', monospace" },
  },
  {
    name: "Golden Hour",
    theme: { template: "classic", background: "#fff5e6", surface: "#ffe4b5", text: "#5c3d2e", accent: "#d97706", buttonStyle: "solid", cardRadius: "28px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Mint Fresh",
    theme: { template: "minimal", background: "#f0fdf4", surface: "#dcfce7", text: "#14532d", accent: "#22c55e", buttonStyle: "solid", cardRadius: "24px", cardShadow: "0 3px 12px -2px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Cherry Blossom",
    theme: { template: "soft", background: "#fff1f2", surface: "#ffe4e6", text: "#881337", accent: "#e11d48", buttonStyle: "soft", cardRadius: "28px", cardShadow: "0 4px 16px -4px", fontFamily: "Georgia, serif" },
  },
  {
    name: "Deep Space",
    theme: { template: "cosmic", background: "#020617", surface: "#0f172a", text: "#e2e8f0", accent: "#6366f1", buttonStyle: "solid", cardRadius: "18px", cardShadow: "0 0 24px -4px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Matcha Latte",
    theme: { template: "minimal", background: "#f9faf5", surface: "#e8ecd6", text: "#3d4224", accent: "#84a935", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Sunset Beach",
    theme: { template: "gradient", background: "#fff8f0", surface: "#fff0e0", text: "#4a3728", accent: "#ff7f50", buttonStyle: "solid", cardRadius: "24px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Minimal White",
    theme: { template: "minimal", background: "#ffffff", surface: "#f8f8f8", text: "#0a0a0a", accent: "#6b7280", buttonStyle: "outline", cardRadius: "12px", cardShadow: "0 1px 3px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Ember Glow",
    theme: { template: "cosmic", background: "#1a0a00", surface: "#2d1a10", text: "#ffe0c0", accent: "#f97316", buttonStyle: "solid", cardRadius: "22px", cardShadow: "0 0 16px -2px", fontFamily: "Georgia, serif" },
  },
  {
    name: "Aqua Dreams",
    theme: { template: "glass", background: "#ecfeff", surface: "#cffafe", text: "#164e63", accent: "#06b6d4", buttonStyle: "outline", cardRadius: "28px", cardShadow: "0 4px 16px -4px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Gothic Noir",
    theme: { template: "brutal", background: "#0a0a0a", surface: "#1a1a1a", text: "#d4d4d4", accent: "#a855f7", buttonStyle: "outline", cardRadius: "2px", cardShadow: "0 0 0 1px", fontFamily: "'Times New Roman', serif" },
  },
  {
    name: "Tropical Vibes",
    theme: { template: "gradient", background: "#fff7ed", surface: "#fed7aa", text: "#7c2d12", accent: "#ea580c", buttonStyle: "solid", cardRadius: "28px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  // NEW 25 UNIQUE TEMPLATES
  {
    name: "Instagram Stories",
    theme: { template: "instagram", background: "#ffffff", surface: "#fafafa", text: "#262626", accent: "#e4405f", buttonStyle: "solid", cardRadius: "8px", cardShadow: "0 1px 3px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Brutalist Raw",
    theme: { template: "brutal", background: "#ff0", surface: "#fff", text: "#000", accent: "#000", buttonStyle: "solid", cardRadius: "0", cardShadow: "0 0 0 3px", fontFamily: "'Courier New', monospace" },
  },
  {
    name: "Glassmorphism",
    theme: { template: "glass", background: "#f5f5f5", surface: "rgba(255,255,255,0.6)", text: "#1a1a2e", accent: "#6366f1", buttonStyle: "solid", cardRadius: "16px", cardShadow: "0 8px 32px -8px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Terminal CLI",
    theme: { template: "terminal", background: "#0c0c0c", surface: "#1a1a1a", text: "#00ff41", accent: "#00ff41", buttonStyle: "outline", cardRadius: "0", cardShadow: "0 0 0 1px", fontFamily: "monospace" },
  },
  {
    name: "Polaroid Gallery",
    theme: { template: "polaroid", background: "#faf3e0", surface: "#ffffff", text: "#5c4033", accent: "#d4a574", buttonStyle: "solid", cardRadius: "2px", cardShadow: "3px 3px 8px -2px", fontFamily: "Georgia, serif" },
  },
  {
    name: "VHS Retro",
    theme: { template: "vhs", background: "#1a0030", surface: "#2d1060", text: "#ff6ec7", accent: "#00ffff", buttonStyle: "solid", cardRadius: "2px", cardShadow: "0 0 0 2px", fontFamily: "'Courier New', monospace" },
  },
  {
    name: "Newspaper Column",
    theme: { template: "newspaper", background: "#f8f4e8", surface: "#ffffff", text: "#2c1810", accent: "#8b0000", buttonStyle: "outline", cardRadius: "0", cardShadow: "0 1px 0 0", fontFamily: "'Times New Roman', serif" },
  },
  {
    name: "Comic Book Hero",
    theme: { template: "comic", background: "#fff", surface: "#ffe600", text: "#000", accent: "#ff0000", buttonStyle: "solid", cardRadius: "0", cardShadow: "4px 4px 0 0", fontFamily: "'Comic Sans MS', cursive" },
  },
  {
    name: "Luxury Gold",
    theme: { template: "luxury", background: "#0d0d0d", surface: "#1a1a1a", text: "#d4af37", accent: "#d4af37", buttonStyle: "outline", cardRadius: "0", cardShadow: "0 0 0 1px", fontFamily: "Georgia, serif" },
  },
  {
    name: "Neon Sign",
    theme: { template: "neon", background: "#0a0a0a", surface: "#111", text: "#fff", accent: "#ff00ff", buttonStyle: "solid", cardRadius: "8px", cardShadow: "0 0 20px -4px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Handwritten Note",
    theme: { template: "handwritten", background: "#fffef5", surface: "#ffffff", text: "#2d3748", accent: "#e53e3e", buttonStyle: "soft", cardRadius: "12px", cardShadow: "2px 2px 0 0", fontFamily: "'Comic Sans MS', cursive" },
  },
  {
    name: "Sci-Fi HUD",
    theme: { template: "scifi", background: "#001428", surface: "#002040", text: "#00ffff", accent: "#00ff88", buttonStyle: "outline", cardRadius: "0", cardShadow: "0 0 0 1px", fontFamily: "monospace" },
  },
  {
    name: "Magazine Cover",
    theme: { template: "magazine", background: "#1a1a1a", surface: "#ffffff", text: "#1a1a1a", accent: "#e63946", buttonStyle: "solid", cardRadius: "4px", cardShadow: "0 2px 8px", fontFamily: "Georgia, serif" },
  },
  {
    name: "Watercolor Soft",
    theme: { template: "watercolor", background: "#fefcfb", surface: "#fff5f5", text: "#4a4a4a", accent: "#e8a0bf", buttonStyle: "soft", cardRadius: "20px", cardShadow: "0 4px 20px -4px", fontFamily: "Georgia, serif" },
  },
  {
    name: "Art Deco Luxe",
    theme: { template: "artdeco", background: "#0a0a0a", surface: "#1a1a1a", text: "#ffd700", accent: "#ffd700", buttonStyle: "outline", cardRadius: "0", cardShadow: "0 0 0 2px", fontFamily: "'Times New Roman', serif" },
  },
  {
    name: "Japanese Zen",
    theme: { template: "zen", background: "#f5f0e8", surface: "#ffffff", text: "#2c2c2c", accent: "#8b4513", buttonStyle: "outline", cardRadius: "4px", cardShadow: "0 1px 2px", fontFamily: "Georgia, serif" },
  },
  {
    name: "Graffiti Wall",
    theme: { template: "graffiti", background: "#2c3e50", surface: "#34495e", text: "#ecf0f1", accent: "#e74c3c", buttonStyle: "solid", cardRadius: "12px", cardShadow: "0 4px 0 0", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Pixel Arcade",
    theme: { template: "pixel", background: "#1a1a2e", surface: "#16213e", text: "#e94560", accent: "#0f3460", buttonStyle: "solid", cardRadius: "0", cardShadow: "0 4px 0 0", fontFamily: "monospace" },
  },
  {
    name: "Soft Pastel",
    theme: { template: "soft", background: "#fef6fb", surface: "#fce4ec", text: "#6a1b9a", accent: "#ec407a", buttonStyle: "soft", cardRadius: "24px", cardShadow: "0 4px 16px -4px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Steampunk Brass",
    theme: { template: "steampunk", background: "#2c1810", surface: "#3d2b1f", text: "#d4af37", accent: "#cd7f32", buttonStyle: "solid", cardRadius: "4px", cardShadow: "0 3px 0 0", fontFamily: "'Times New Roman', serif" },
  },
  {
    name: "Desert Oasis",
    theme: { template: "gradient", background: "#faf0e6", surface: "#ffefd5", text: "#8b4513", accent: "#daa520", buttonStyle: "solid", cardRadius: "16px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Holgraphic Prism",
    theme: { template: "holographic", background: "#0a0a0a", surface: "rgba(255,255,255,0.05)", text: "#ffffff", accent: "#ff69b4", buttonStyle: "outline", cardRadius: "16px", cardShadow: "0 0 24px -4px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Kids Crayon",
    theme: { template: "crayon", background: "#fff", surface: "#fff", text: "#333", accent: "#ff6b35", buttonStyle: "solid", cardRadius: "20px", cardShadow: "2px 3px 0 0", fontFamily: "'Comic Sans MS', cursive" },
  },
  {
    name: "Film Noir",
    theme: { template: "noir", background: "#000", surface: "#111", text: "#ddd", accent: "#c8a96e", buttonStyle: "outline", cardRadius: "0", cardShadow: "0 0 0 1px", fontFamily: "Georgia, serif" },
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
    template: theme.template || defaultTheme.template,
  };
}
