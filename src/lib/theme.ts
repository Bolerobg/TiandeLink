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
    theme: { template: "linktree", background: "#b7aa7e", surface: "#c7b98b", text: "#35231e", accent: "#655b39", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Dark Mode",
    theme: { template: "dark", background: "#0f172a", surface: "#1e293b", text: "#f1f5f9", accent: "#38bdf8", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Rose Gold",
    theme: { template: "rosegold", background: "#fdf2f8", surface: "#fce7f3", text: "#831843", accent: "#db2777", buttonStyle: "soft", cardRadius: "28px", cardShadow: "0 4px 16px -4px", fontFamily: "Georgia, serif" },
  },
  {
    name: "Forest Green",
    theme: { template: "forest", background: "#ecfdf5", surface: "#d1fae5", text: "#064e3b", accent: "#10b981", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Ocean Blue",
    theme: { template: "ocean", background: "#eff6ff", surface: "#dbeafe", text: "#1e3a5f", accent: "#3b82f6", buttonStyle: "outline", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Sunset Orange",
    theme: { template: "sunset", background: "#fff7ed", surface: "#ffedd5", text: "#7c2d12", accent: "#f97316", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Lavender Dream",
    theme: { template: "lavender", background: "#faf5ff", surface: "#f3e8ff", text: "#4c1d95", accent: "#a855f7", buttonStyle: "soft", cardRadius: "28px", cardShadow: "0 4px 16px -4px", fontFamily: "Georgia, serif" },
  },
  {
    name: "Midnight Purple",
    theme: { template: "midnight", background: "#1e1b4b", surface: "#312e81", text: "#e0e7ff", accent: "#c084fc", buttonStyle: "solid", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
  },
  {
    name: "Warm Neutral",
    theme: { template: "warm", background: "#fafaf9", surface: "#f5f5f4", text: "#1c1917", accent: "#78716c", buttonStyle: "solid", cardRadius: "14px", cardShadow: "0 2px 8px -2px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "Retro Pop",
    theme: { template: "retro", background: "#fefce8", surface: "#fef08a", text: "#422006", accent: "#eab308", buttonStyle: "outline", cardRadius: "22px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
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
    theme: { template: "golden", background: "#fff5e6", surface: "#ffe4b5", text: "#5c3d2e", accent: "#d97706", buttonStyle: "solid", cardRadius: "28px", cardShadow: "3px 4px 0", fontFamily: "Georgia, serif" },
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
  // ─── STITCH BEAUTY PORTFOLIO (14 дизайна) ───
  {
    name: "🌟 Organic Bento",
    theme: { template: "organic", background: "#fbf9f4", surface: "#F2EFE9", text: "#1e0f0b", accent: "#C7B98B", buttonStyle: "solid", cardRadius: "2rem", cardShadow: "0 4px 20px -4px", fontFamily: "Hanken Grotesk, sans-serif" },
  },
  {
    name: "Organic Elegance v1",
    theme: { template: "o1", background: "#fff8f3", surface: "#fffaf5", text: "#181512", accent: "#775a19", buttonStyle: "solid", cardRadius: "8px", cardShadow: "0 2px 16px -2px", fontFamily: "'DM Sans', sans-serif" },
  },
  {
    name: "Bento Gold Grid",
    theme: { template: "bento", background: "#fbf9f4", surface: "#F2EFE9", text: "#1e0f0b", accent: "#C7B98B", buttonStyle: "solid", cardRadius: "12px", cardShadow: "0 4px 20px -4px", fontFamily: "'Hanken Grotesk', sans-serif" },
  },
  {
    name: "Clean Gallery",
    theme: { template: "clean", background: "#fbf9f4", surface: "#fff", text: "#1e0f0b", accent: "#685e38", buttonStyle: "solid", cardRadius: "8px", cardShadow: "0 2px 10px -2px", fontFamily: "'Hanken Grotesk', sans-serif" },
  },
  {
    name: "Z-Pattern Glass",
    theme: { template: "zglass", background: "#fbf9f4", surface: "rgba(242,239,233,0.7)", text: "#1e0f0b", accent: "#C7B98B", buttonStyle: "solid", cardRadius: "16px", cardShadow: "0 8px 40px -8px", fontFamily: "'Hanken Grotesk', sans-serif" },
  },
  {
    name: "Offset Border",
    theme: { template: "offset", background: "#fbf9f4", surface: "#fff", text: "#1e0f0b", accent: "#685e38", buttonStyle: "solid", cardRadius: "8px", cardShadow: "0 10px 40px -10px", fontFamily: "'Hanken Grotesk', sans-serif" },
  },
  {
    name: "Organic Blobs",
    theme: { template: "blobs", background: "#fbf9f4", surface: "#fff", text: "#1e0f0b", accent: "#685e3c", buttonStyle: "solid", cardRadius: "2rem", cardShadow: "0 4px 20px -4px", fontFamily: "'Hanken Grotesk', sans-serif" },
  },
  {
    name: "Wellness Brutalism",
    theme: { template: "wellness", background: "#fbf9f4", surface: "#fff", text: "#1e0f0b", accent: "#1e0f0b", buttonStyle: "solid", cardRadius: "0", cardShadow: "4px 4px 0 0", fontFamily: "'Hanken Grotesk', sans-serif" },
  },
  {
    name: "Editorial Masonry",
    theme: { template: "masonry", background: "#fafaf9", surface: "#fff", text: "#1e0f0b", accent: "#78716c", buttonStyle: "solid", cardRadius: "4px", cardShadow: "0 2px 12px -2px", fontFamily: "'EB Garamond', serif" },
  },
  {
    name: "Soft Glass Blobs",
    theme: { template: "softblob", background: "#fbf9f4", surface: "rgba(242,239,233,0.7)", text: "#1e0f0b", accent: "#685e3c", buttonStyle: "solid", cardRadius: "16px", cardShadow: "0 8px 32px -8px", fontFamily: "'Hanken Grotesk', sans-serif" },
  },
  {
    name: "Full Glassmorphism",
    theme: { template: "fullglass", background: "linear-gradient(135deg, #fbf9f4 0%, #eae8e3 100%)", surface: "rgba(255,255,255,0.4)", text: "#1e0f0b", accent: "#C7B98B", buttonStyle: "solid", cardRadius: "16px", cardShadow: "0 8px 32px -8px", fontFamily: "'Hanken Grotesk', sans-serif" },
  },
  {
    name: "Classic Link Bio v1",
    theme: { template: "linkbio1", background: "#fbf9f4", surface: "#fff", text: "#1e0f0b", accent: "#C7B98B", buttonStyle: "solid", cardRadius: "16px", cardShadow: "0 4px 20px -4px", fontFamily: "'Hanken Grotesk', sans-serif" },
  },
  {
    name: "Classic Link Bio v2",
    theme: { template: "linkbio2", background: "#fbf9f4", surface: "#f0eee9", text: "#1e0f0b", accent: "#685e38", buttonStyle: "solid", cardRadius: "14px", cardShadow: "0 2px 12px -2px", fontFamily: "'Hanken Grotesk', sans-serif" },
  },
  {
    name: "Soft UI Neumorphism",
    theme: { template: "neumorph", background: "#fbf9f4", surface: "linear-gradient(145deg, #ffffff, #e6e3dd)", text: "#1e0f0b", accent: "#35231e", buttonStyle: "solid", cardRadius: "12px", cardShadow: "4px 4px 10px -4px, -4px -4px 10px -2px", fontFamily: "'Hanken Grotesk', sans-serif" },
  },
  {
    name: "Organic Elegance v2",
    theme: { template: "o2", background: "#FFF8F3", surface: "#fffaf5", text: "#181512", accent: "#775a19", buttonStyle: "solid", cardRadius: "4px", cardShadow: "0 2px 12px -2px", fontFamily: "'DM Sans', sans-serif" },
  },
  {
    name: "📌 Pinterest Masonry",
    theme: { template: "pinterest", background: "#fff", surface: "#f0f0f0", text: "#111", accent: "#e60023", buttonStyle: "solid", cardRadius: "16px", cardShadow: "0 2px 8px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "📝 Apple Notes",
    theme: { template: "notes", background: "#fffef2", surface: "#fff8d6", text: "#2c2c2c", accent: "#f5a623", buttonStyle: "solid", cardRadius: "4px", cardShadow: "none", fontFamily: "Georgia, serif" },
  },
  {
    name: "𝕏 Twitter Feed",
    theme: { template: "twitter", background: "#000", surface: "#16181c", text: "#e7e9ea", accent: "#1d9bf0", buttonStyle: "solid", cardRadius: "12px", cardShadow: "none", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "🎬 Netflix Row",
    theme: { template: "netflix", background: "#141414", surface: "#222", text: "#fff", accent: "#e50914", buttonStyle: "solid", cardRadius: "6px", cardShadow: "0 2px 8px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "💬 Discord Channel",
    theme: { template: "discord", background: "#313338", surface: "#2b2d31", text: "#dbdee1", accent: "#5865f2", buttonStyle: "solid", cardRadius: "4px", cardShadow: "none", fontFamily: "monospace" },
  },
  {
    name: "🎵 Spotify Wrapped",
    theme: { template: "spotify", background: "#191414", surface: "#1db954", text: "#fff", accent: "#1db954", buttonStyle: "solid", cardRadius: "16px", cardShadow: "0 4px 20px -4px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "🐙 GitHub Repos",
    theme: { template: "github", background: "#0d1117", surface: "#161b22", text: "#c9d1d9", accent: "#58a6ff", buttonStyle: "solid", cardRadius: "6px", cardShadow: "none", fontFamily: "monospace" },
  },
  {
    name: "🏠 Airbnb Cards",
    theme: { template: "airbnb", background: "#fff", surface: "#f7f7f7", text: "#222", accent: "#ff385c", buttonStyle: "solid", cardRadius: "12px", cardShadow: "0 2px 8px", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "🤖 ChatGPT Style",
    theme: { template: "chatgpt", background: "#343541", surface: "#444654", text: "#ececf1", accent: "#19c37d", buttonStyle: "solid", cardRadius: "12px", cardShadow: "none", fontFamily: "-apple-system, sans-serif" },
  },
  {
    name: "🕹 Arcade Retro",
    theme: { template: "arcade", background: "#0a0a2e", surface: "rgba(255,0,255,0.05)", text: "#0ff", accent: "#f0f", buttonStyle: "solid", cardRadius: "0", cardShadow: "3px 3px 0", fontFamily: "monospace" },
  },
  // ─── 20 NEW PREMIUM TEMPLATES ───
  {
    name: "✨ Aurora Glow",
    theme: { template: "aurora_glow", background: "linear-gradient(135deg, #09090e 0%, #131326 100%)", surface: "rgba(255,255,255,0.06)", text: "#ffffff", accent: "#a3e635", buttonStyle: "solid", cardRadius: "16px", cardShadow: "0 0 20px -2px rgba(163,230,53,0.15)", fontFamily: "'Outfit', sans-serif" },
  },
  {
    name: "🏺 Soft Claymorphism",
    theme: { template: "clay_soft", background: "#f0f7ff", surface: "#ffffff", text: "#3b2314", accent: "#ff6b6b", buttonStyle: "solid", cardRadius: "28px", cardShadow: "inset 2px 2px 6px #ffffff, inset -2px -2px 6px rgba(0,0,0,0.05), 8px 8px 20px rgba(0,0,0,0.06)", fontFamily: "'Quicksand', sans-serif" },
  },
  {
    name: "⚡ Neo-Brutalism Retro",
    theme: { template: "neo_brutal", background: "#fef08a", surface: "#ff007f", text: "#000000", accent: "#ff6600", buttonStyle: "solid", cardRadius: "4px", cardShadow: "6px 6px 0px 0px #000000", fontFamily: "'Space Grotesk', sans-serif" },
  },
  {
    name: "📜 Vintage Journal",
    theme: { template: "vintage_paper", background: "#f5ece1", surface: "#fffbf7", text: "#2c1d11", accent: "#1e3f20", buttonStyle: "outline", cardRadius: "2px", cardShadow: "2px 2px 0px 0px #2c1d11", fontFamily: "'EB Garamond', serif" },
  },
  {
    name: "📡 Cyber HUD",
    theme: { template: "cyber_hud", background: "#030712", surface: "rgba(0,242,254,0.02)", text: "#00f2fe", accent: "#4facfe", buttonStyle: "outline", cardRadius: "0px", cardShadow: "0 0 10px rgba(0,242,254,0.3)", fontFamily: "'Share Tech Mono', monospace" },
  },
  {
    name: "💎 Glass Obsidian",
    theme: { template: "glass_obsidian", background: "linear-gradient(180deg, #020205 0%, #080811 100%)", surface: "rgba(10,10,20,0.5)", text: "#ffffff", accent: "#d946ef", buttonStyle: "soft", cardRadius: "20px", cardShadow: "0 8px 32px 0 rgba(0,0,0,0.37)", fontFamily: "'Syne', sans-serif" },
  },
  {
    name: "⚜️ Luxury Slate",
    theme: { template: "luxury_slate", background: "#0f1115", surface: "#15181f", text: "#dfcfbe", accent: "#d4af37", buttonStyle: "outline", cardRadius: "0px", cardShadow: "0 1px 0px rgba(212,175,55,0.2)", fontFamily: "'Cormorant Garamond', serif" },
  },
  {
    name: "👾 Synthwave Grid",
    theme: { template: "synth_grid", background: "#0c011a", surface: "#1f033c", text: "#ff007f", accent: "#00ffff", buttonStyle: "solid", cardRadius: "8px", cardShadow: "0 0 15px rgba(255,0,127,0.4)", fontFamily: "'Orbitron', sans-serif" },
  },
  {
    name: "🎋 Japanese Zen Sage",
    theme: { template: "zen_linen", background: "#f2f0eb", surface: "#ffffff", text: "#2b2f29", accent: "#708238", buttonStyle: "outline", cardRadius: "12px", cardShadow: "0 4px 16px rgba(112,130,56,0.06)", fontFamily: "'Plus Jakarta Sans', sans-serif" },
  },
  {
    name: "🎨 Pop Art Halftone",
    theme: { template: "halftone_pop", background: "#1d4ed8", surface: "#facc15", text: "#000000", accent: "#ef4444", buttonStyle: "solid", cardRadius: "24px", cardShadow: "4px 4px 0px #000000", fontFamily: "'Bangers', cursive" },
  },
  {
    name: "🧱 Metro Tiles",
    theme: { template: "metro_tiles", background: "#f3f4f6", surface: "#2563eb", text: "#ffffff", accent: "#10b981", buttonStyle: "solid", cardRadius: "0px", cardShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", fontFamily: "'Inter', sans-serif" },
  },
  {
    name: "🍧 Frosted Ice",
    theme: { template: "frosted_ice", background: "linear-gradient(135deg, #e0f2fe 0%, #f3e8ff 100%)", surface: "rgba(255,255,255,0.45)", text: "#0f172a", accent: "#db2777", buttonStyle: "soft", cardRadius: "24px", cardShadow: "0 8px 32px 0 rgba(31,38,135,0.04)", fontFamily: "'Outfit', sans-serif" },
  },
  {
    name: "🔴 Neon Pulse",
    theme: { template: "neon_pulse", background: "#050505", surface: "#0a0a0a", text: "#ffffff", accent: "#ef4444", buttonStyle: "solid", cardRadius: "14px", cardShadow: "0 0 12px rgba(239,68,68,0.5)", fontFamily: "'Space Mono', monospace" },
  },
  {
    name: "📸 Polaroid Stack",
    theme: { template: "polaroid_stack", background: "#eae3d2", surface: "#ffffff", text: "#1a1f2c", accent: "#8b5a2b", buttonStyle: "solid", cardRadius: "2px", cardShadow: "3px 5px 15px rgba(0,0,0,0.08)", fontFamily: "'Caveat', cursive" },
  },
  {
    name: "✏️ Notebook Doodle",
    theme: { template: "notebook_doodle", background: "#fcfcf7", surface: "#ffffff", text: "#1e3a8a", accent: "#dc2626", buttonStyle: "outline", cardRadius: "8px", cardShadow: "2px 3px 0px rgba(30,58,138,0.2)", fontFamily: "'Architects Daughter', cursive" },
  },
  {
    name: "🌐 Hologram 3D",
    theme: { template: "hologram_3d", background: "#040c16", surface: "rgba(6,182,212,0.04)", text: "#22d3ee", accent: "#06b6d4", buttonStyle: "outline", cardRadius: "4px", cardShadow: "0 0 15px rgba(6,182,212,0.2)", fontFamily: "'Teko', sans-serif" },
  },
  {
    name: "🌌 Galaxy Cosmic",
    theme: { template: "galaxy_cosmic", background: "linear-gradient(135deg, #03001e 0%, #7303c0 50%, #ec38bc 100%)", surface: "rgba(255,255,255,0.08)", text: "#ffffff", accent: "#f472b6", buttonStyle: "solid", cardRadius: "30px", cardShadow: "0 0 25px rgba(236,56,188,0.3)", fontFamily: "'Cinzel', serif" },
  },
  {
    name: "💥 Pop Comic",
    theme: { template: "pop_comic", background: "#fcd34d", surface: "#ffffff", text: "#000000", accent: "#e11d48", buttonStyle: "solid", cardRadius: "0px", cardShadow: "5px 5px 0px #000000", fontFamily: "'Bangers', cursive" },
  },
  {
    name: "📐 Avant-Garde",
    theme: { template: "avant_garde", background: "#edeae4", surface: "#2a2d24", text: "#eae6df", accent: "#d97706", buttonStyle: "solid", cardRadius: "0px", cardShadow: "-8px 8px 0px rgba(42,45,36,0.15)", fontFamily: "'EB Garamond', serif" },
  },
  {
    name: "🏆 Minimal Luxury Gold",
    theme: { template: "minimal_luxury", background: "#ffffff", surface: "#faf9f6", text: "#1c1917", accent: "#b89047", buttonStyle: "outline", cardRadius: "24px", cardShadow: "0 4px 30px rgba(184,144,71,0.06)", fontFamily: "'Great Vibes', cursive" },
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
