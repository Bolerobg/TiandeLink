"use client";

import { useState } from "react";

const emojis = [
  "🎵", "🎬", "📚", "🛒", "📅", "💡", "🎓", "💪",
  "🔥", "⭐", "❤️", "🎯", "📧", "💬", "📷", "🎮",
  "☕", "🌍", "🎁", "🚀",
];

export function EmojiPicker({ inputId }: { inputId: string }) {
  const [open, setOpen] = useState(false);

  function pick(emoji: string) {
    const input = document.getElementById(inputId) as HTMLInputElement | null;
    if (input) input.value = emoji;
    setOpen(false);
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          border: "1px solid var(--line)",
          borderRadius: 8,
          background: "var(--panel-strong)",
          padding: "10px 14px",
          cursor: "pointer",
          fontSize: "1.1rem",
          fontFamily: "inherit",
        }}
      >
        😊 Избери иконка
      </button>
      {open ? (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: 4,
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: 12,
            padding: 8,
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 4,
            zIndex: 50,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
        >
          {emojis.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => pick(e)}
              style={{
                border: 0,
                background: "transparent",
                fontSize: "1.4rem",
                cursor: "pointer",
                padding: 4,
                borderRadius: 6,
              }}
            >
              {e}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
