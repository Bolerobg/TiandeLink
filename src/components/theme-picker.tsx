"use client";

import { ProfileTheme } from "@/lib/theme";

export function ThemePicker({ presets }: { presets: { name: string; theme: ProfileTheme }[] }) {
  function apply(theme: ProfileTheme) {
    const bg = document.querySelector<HTMLInputElement>("input#background");
    const s = document.querySelector<HTMLInputElement>("input#surface");
    const t = document.querySelector<HTMLInputElement>("input#text");
    const a = document.querySelector<HTMLInputElement>("input#accent");
    if (bg) (bg.value = theme.background), (bg.defaultValue = theme.background);
    if (s) (s.value = theme.surface), (s.defaultValue = theme.surface);
    if (t) (t.value = theme.text), (t.defaultValue = theme.text);
    if (a) (a.value = theme.accent), (a.defaultValue = theme.accent);
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {presets.map((p) => (
        <button
          key={p.name}
          type="button"
          onClick={() => apply(p.theme)}
          style={{
            padding: "6px 12px",
            border: `2px solid ${p.theme.accent}`,
            borderRadius: 8,
            background: p.theme.background,
            color: p.theme.text,
            cursor: "pointer",
            fontSize: "0.78rem",
            fontWeight: 700,
            fontFamily: "inherit",
          }}
        >
          {p.name}
        </button>
      ))}
    </div>
  );
}
