"use client";

import { useState } from "react";

async function checkPassword(formData: FormData) {
  const res = await fetch(`/${formData.get("username")}`, { method: "POST", body: formData });
  if (res.redirected) window.location.href = res.url;
}

export function PasswordGate({ username, displayName }: { username: string; displayName: string }) {
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const pwd = form.get("password") as string;
    form.set("username", username);
    await checkPassword(form);

    // if still here, password was wrong
    setError("Грешна парола");
  }

  return (
    <main className="bio-page" style={{ background: "#b7aa7e" }}>
      <div className="bio-frame" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <h1 style={{ marginBottom: 8 }}>{displayName}</h1>
        <p style={{ marginBottom: 20, opacity: 0.7 }}>Този профил е защитен с парола</p>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, width: "100%", maxWidth: 300 }}>
          <input type="hidden" name="username" value={username} />
          <input
            type="password"
            name="password"
            placeholder="Въведи парола"
            required
            style={{
              padding: "10px 14px",
              borderRadius: 14,
              border: "2px solid #655b39",
              fontSize: "0.95rem",
              textAlign: "center",
              fontFamily: "inherit",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: 14,
              border: "2px solid #655b39",
              background: "#c7b98b",
              color: "#35231e",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Отключи
          </button>
          {error ? <small style={{ color: "#991b1b" }}>{error}</small> : null}
        </form>
      </div>
    </main>
  );
}
