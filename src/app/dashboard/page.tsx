import Link from "next/link";
import { createLink, deleteLink, toggleLink, updateProfile } from "@/app/dashboard/actions";
import { BioPreview } from "@/components/bio-preview";
import { ensureDemoProfile } from "@/lib/demo";
import { getDb } from "@/lib/db";
import { parseTheme } from "@/lib/theme";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const profile = await ensureDemoProfile();
  const db = getDb();
  const links = await db.link.findMany({
    where: { profileId: profile.id },
    orderBy: { position: "asc" },
    include: { _count: { select: { clicks: true } } },
  });
  const clickCount = await db.clickEvent.count({ where: { profileId: profile.id } });
  const activeLinks = links.filter((link) => link.isActive).length;
  const theme = parseTheme(profile.theme);

  return (
    <main className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/">
          <span className="brand-mark">S</span>
          <span>SaasLink</span>
        </Link>
        <nav className="nav-actions" aria-label="Dashboard navigation">
          <Link className="button" href={`/${profile.username}`}>
            Публична страница
          </Link>
        </nav>
      </header>

      <section className="stats-grid" aria-label="Profile stats">
        <div className="stat-card">
          <span>Активни линкове</span>
          <strong>{activeLinks}</strong>
        </div>
        <div className="stat-card">
          <span>Общо кликове</span>
          <strong>{clickCount}</strong>
        </div>
        <div className="stat-card">
          <span>План</span>
          <strong>PRO</strong>
        </div>
      </section>

      <section className="dashboard">
        <div className="stack">
          <form className="panel form-grid" action={updateProfile}>
            <h2>Профил и тема</h2>
            <div className="two-col">
              <div className="field">
                <label htmlFor="displayName">Име</label>
                <input id="displayName" name="displayName" defaultValue={profile.displayName} />
              </div>
              <div className="field">
                <label htmlFor="buttonStyle">Бутон стил</label>
                <select id="buttonStyle" name="buttonStyle" defaultValue={theme.buttonStyle}>
                  <option value="solid">Solid</option>
                  <option value="outline">Outline</option>
                  <option value="soft">Soft</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="bio">Bio</label>
              <textarea id="bio" name="bio" defaultValue={profile.bio || ""} />
            </div>
            <div className="two-col">
              <div className="field">
                <label htmlFor="background">Фон</label>
                <input id="background" name="background" defaultValue={theme.background} />
              </div>
              <div className="field">
                <label htmlFor="surface">Повърхност</label>
                <input id="surface" name="surface" defaultValue={theme.surface} />
              </div>
              <div className="field">
                <label htmlFor="text">Текст</label>
                <input id="text" name="text" defaultValue={theme.text} />
              </div>
              <div className="field">
                <label htmlFor="accent">Акцент</label>
                <input id="accent" name="accent" defaultValue={theme.accent} />
              </div>
            </div>
            <button className="button primary" type="submit">
              Запази профила
            </button>
          </form>

          <form className="panel form-grid" action={createLink}>
            <h2>Нов линк</h2>
            <div className="two-col">
              <div className="field">
                <label htmlFor="title">Заглавие</label>
                <input id="title" name="title" placeholder="Напр. Нов курс" required />
              </div>
              <div className="field">
                <label htmlFor="type">Тип</label>
                <select id="type" name="type" defaultValue="URL">
                  <option value="URL">URL</option>
                  <option value="FEATURED">Featured</option>
                  <option value="PRODUCT">Product</option>
                  <option value="BOOKING">Booking</option>
                  <option value="EMAIL_CAPTURE">Email capture</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="url">URL</label>
              <input id="url" name="url" type="url" placeholder="https://example.com" required />
            </div>
            <div className="field">
              <label htmlFor="description">Описание</label>
              <input id="description" name="description" placeholder="Кратък контекст под бутона" />
            </div>
            <label className="field">
              <span>Spotlight</span>
              <input name="spotlight" type="checkbox" />
            </label>
            <button className="button primary" type="submit">
              Добави линк
            </button>
          </form>

          <section className="panel">
            <h2>Линкове</h2>
            <div className="stack">
              {links.map((link) => (
                <article className="link-row" key={link.id}>
                  <div>
                    <strong>{link.title}</strong>
                    <p>{link.description || link.url}</p>
                    <p>
                      {link.type} · {link._count.clicks} клика · {link.isActive ? "Активен" : "Скрит"}
                    </p>
                  </div>
                  <div className="link-actions">
                    <form action={toggleLink}>
                      <input type="hidden" name="id" value={link.id} />
                      <input type="hidden" name="active" value={String(link.isActive)} />
                      <button className="button" type="submit">
                        {link.isActive ? "Скрий" : "Покажи"}
                      </button>
                    </form>
                    <form action={deleteLink}>
                      <input type="hidden" name="id" value={link.id} />
                      <button className="button danger" type="submit">
                        Изтрий
                      </button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="phone-preview" aria-label="Live preview">
          <BioPreview />
        </aside>
      </section>
    </main>
  );
}
