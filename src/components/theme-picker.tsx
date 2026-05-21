"use client";

import { ProfileTheme } from "@/lib/theme";

export function ThemePicker({ presets }: { presets: { name: string; theme: ProfileTheme }[] }) {
  function apply(theme: ProfileTheme) {
    const set = (id: string, val: string) => {
      const el = document.querySelector<HTMLInputElement>(`input[name="${id}"]`);
      if (el) (el.value = val), (el.defaultValue = val);
    };
    set("background", theme.background);
    set("surface", theme.surface);
    set("text", theme.text);
    set("accent", theme.accent);
    set("cardRadius", theme.cardRadius);
    set("cardShadow", theme.cardShadow);
    set("fontFamily", theme.fontFamily);
    set("template", theme.template);
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {presets.map((p) => (
        <button
          key={p.name}
          type="button"
          onClick={() => apply(p.theme)}
          style={{
            padding: "7px 12px",
            border: `2px solid ${p.theme.accent}`,
            borderRadius: 10,
            background: p.theme.background,
            color: p.theme.text,
            cursor: "pointer",
            fontSize: "0.76rem",
            fontWeight: 700,
            fontFamily: p.theme.fontFamily,
            boxShadow: p.theme.cardShadow.replace("0", `0 0 0 ${p.theme.accent}`).replace(/(\d+px)\s+(\d+px)/, "$1 $2"),
            maxWidth: 160,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {p.name}
        </button>
      ))}
    </div>
  );
}
