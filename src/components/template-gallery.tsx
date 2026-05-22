"use client";

import { useState } from "react";
import { ProfileTheme, presets } from "@/lib/theme";

function MiniPreview({ theme }: { theme: ProfileTheme }) {
  return (
    <div
      style={{
        width: "100%",
        height: 120,
        background: theme.background,
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        fontFamily: theme.fontFamily,
        position: "relative",
      }}
      data-template={theme.template}
    >
      <div style={{
        background: theme.template.includes("enhanced") ? theme.surface : "transparent",
        padding: "8px 10px",
        textAlign: "center",
        color: theme.text,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: theme.accent, opacity: 0.8,
          margin: "0 auto 4px",
          border: `2px solid ${theme.text}`,
        }} />
        <div style={{ fontSize: 8, fontWeight: 700 }}>Name</div>
        <div style={{ fontSize: 7, opacity: 0.5, marginTop: 1 }}>Bio text</div>
      </div>
      <div style={{ padding: "4px 8px", display: "grid", gap: 3 }}>
        {[1,2,3].map((i) => (
          <div key={i} style={{
            padding: "5px 8px",
            borderRadius: theme.cardRadius,
            background: theme.surface,
            color: theme.text,
            fontSize: 7,
            fontWeight: 700,
            border: `1.5px solid ${theme.accent}`,
            boxShadow: theme.cardShadow.replace("0", `0 0 0 ${theme.accent}`).slice(0, 24),
            ...(theme.template === "shopgrid" ? { display: "inline-block", width: "48%" } : {}),
          }}>
            {i === 1 ? "🔗 Link One" : i === 2 ? "📦 Link Two" : "🎵 Link Three"}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TemplateGallery({ currentTemplate, username }: { currentTemplate: string; username: string }) {
  const [selected, setSelected] = useState(currentTemplate);
  const [showAll, setShowAll] = useState(false);
  const stitchedPresets = presets.filter(p => [
    "organic", "o1", "o2", "bento", "clean", "zglass", "offset", "blobs", 
    "wellness", "masonry", "softblob", "fullglass", "linkbio1", "linkbio2", 
    "neumorph", "pinterest", "notes", "twitter", "netflix", "discord", 
    "spotify", "github", "airbnb", "chatgpt", "arcade",
    "aurora_glow", "clay_soft", "neo_brutal", "vintage_paper", "cyber_hud", "glass_obsidian", "luxury_slate", "synth_grid", "zen_linen", "halftone_pop", "metro_tiles", "frosted_ice", "neon_pulse", "polaroid_stack", "notebook_doodle", "hologram_3d", "galaxy_cosmic", "pop_comic", "avant_garde", "minimal_luxury"
  ].includes(p.theme.template));
  const visible = showAll ? presets : presets.slice(0, 25);

  function apply(theme: ProfileTheme) {
    setSelected(theme.template);
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
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
        <a
          href={`/${username}`}
          target="_blank"
          rel="nofollow noopener"
          style={{
            padding: "6px 14px",
            borderRadius: 8,
            border: "1px solid var(--accent)",
            background: "var(--accent)",
            color: "#fff",
            fontSize: "0.8rem",
            cursor: "pointer",
            fontWeight: 700,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          👁 Преглед на профила
        </a>
        <button
          type="submit"
          form="profile-form"
          style={{
            padding: "6px 14px",
            borderRadius: 8,
            border: "1px solid var(--accent)",
            background: "var(--panel)",
            color: "var(--foreground)",
            fontSize: "0.8rem",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          💾 Запази темплейта
        </button>
        <button
          type="button"
          onClick={() => setShowAll(false)}
          style={{
            padding: "4px 10px",
            borderRadius: 6,
            border: "1px solid var(--line)",
            background: showAll ? "var(--panel-strong)" : "var(--accent)",
            color: showAll ? "var(--foreground)" : "#fff",
            fontSize: "0.75rem",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Класически
        </button>
        <button
          type="button"
          onClick={() => setShowAll(true)}
          style={{
            padding: "4px 10px",
            borderRadius: 6,
            border: "1px solid var(--line)",
            background: !showAll ? "var(--panel-strong)" : "var(--accent)",
            color: !showAll ? "var(--foreground)" : "#fff",
            fontSize: "0.75rem",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Stitch Beauty
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10, maxHeight: showAll ? "none" : 320, overflowY: "auto" }}>
        {(showAll ? stitchedPresets : presets.slice(0, 25)).map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => apply(p.theme)}
            style={{
              border: p.theme.template === selected ? "2px solid var(--accent)" : "1px solid var(--line)",
              borderRadius: 12,
              padding: 6,
              background: "var(--panel)",
              cursor: "pointer",
              transition: "transform 0.1s",
              transform: p.theme.template === selected ? "scale(1.02)" : "scale(1)",
            }}
          >
            <MiniPreview theme={p.theme} />
            <div style={{ fontSize: "0.68rem", fontWeight: 700, marginTop: 4, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {p.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
