import Link from "next/link";
import { getDb } from "@/lib/db";
import { requireUserProfile } from "@/lib/profile";
import { logoutUser } from "@/app/(auth)/actions";

export const dynamic = "force-dynamic";

function Bar({ label, value, max, total }: { label: string; value: number; max: number; total: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  const share = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, fontSize: "0.85rem" }}>
      <span style={{ width: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flexShrink: 0 }}>
        {label || "(none)"}
      </span>
      <div style={{ flex: 1, height: 22, background: "var(--panel-strong)", borderRadius: 6, overflow: "hidden" }}>
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: "var(--accent)",
            borderRadius: 6,
            minWidth: pct > 0 ? 4 : 0,
          }}
        />
      </div>
      <span style={{ width: 50, textAlign: "right", flexShrink: 0, fontWeight: 700 }}>
        {value} ({share}%)
      </span>
    </div>
  );
}

export default async function AnalyticsPage() {
  const { user, profile } = await requireUserProfile();
  const db = getDb();

  const countryData = await db.clickEvent.groupBy({
    by: ["country"],
    where: { profileId: profile.id },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 8,
  });

  const referrerData = await db.clickEvent.groupBy({
    by: ["referrer"],
    where: { profileId: profile.id, referrer: { not: null } },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 8,
  });

  const last30d = await db.clickEvent.groupBy({
    by: ["createdAt"],
    where: {
      profileId: profile.id,
      createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    },
    _count: { id: true },
    orderBy: { createdAt: "asc" },
  });

  const total = countryData.reduce((s, c) => s + c._count.id, 0);
  const maxCountry = Math.max(...countryData.map((c) => c._count.id), 1);
  const maxReferrer = Math.max(...referrerData.map((r) => r._count.id), 1);
  const maxDay = Math.max(...last30d.map((d) => d._count.id), 1);

  const dailyMap = new Map<string, number>();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    dailyMap.set(d.toISOString().slice(0, 10), 0);
  }
  for (const d of last30d) {
    const key = d.createdAt.toISOString().slice(0, 10);
    dailyMap.set(key, d._count.id);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/">
          <span className="brand-mark">S</span>
          <span>SaasLink</span>
        </Link>
        <nav className="nav-actions">
          <span className="user-pill">{user.email}</span>
          <Link className="button" href="/dashboard">
            Обратно
          </Link>
          <form action={logoutUser}>
            <button className="button" type="submit">Изход</button>
          </form>
        </nav>
      </header>

      <h2 style={{ marginTop: 24, marginBottom: 20 }}>Аналитика</h2>

      <section className="panel" style={{ marginBottom: 16 }}>
        <h2>Кликове по държави</h2>
        {countryData.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>Няма данни</p>
        ) : (
          countryData.map((c) => (
            <Bar key={c.country || "unknown"} label={c.country || "(none)"} value={c._count.id} max={maxCountry} total={total} />
          ))
        )}
      </section>

      <section className="panel" style={{ marginBottom: 16 }}>
        <h2>Реферери</h2>
        {referrerData.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>Няма данни</p>
        ) : (
          referrerData.map((r) => (
            <Bar key={r.referrer || "direct"} label={r.referrer || "Direct"} value={r._count.id} max={maxReferrer} total={total} />
          ))
        )}
      </section>

      <section className="panel">
        <h2>Последни 30 дни</h2>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 120, paddingTop: 10 }}>
          {[...dailyMap.entries()].map(([date, count]) => (
            <div key={date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: "0.65rem", color: "var(--muted)" }}>{count}</span>
              <div
                style={{
                  width: "100%",
                  height: count > 0 ? `${(count / maxDay) * 90}px` : "2px",
                  background: count > 0 ? "var(--accent)" : "var(--line)",
                  borderRadius: "3px 3px 0 0",
                  minHeight: count > 0 ? 4 : 2,
                }}
              />
              <span style={{ fontSize: "0.6rem", color: "var(--muted)", transform: "rotate(-45deg)", transformOrigin: "left top" }}>
                {date.slice(5)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
