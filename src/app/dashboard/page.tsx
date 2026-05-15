import Link from "next/link";
import {
  createLink,
  deleteLink,
  moveLink,
  toggleLink,
  updateLink,
  updateProfile,
} from "@/app/dashboard/actions";
import { logoutUser } from "@/app/(auth)/actions";
import { BioPreview } from "@/components/bio-preview";
import { getDb } from "@/lib/db";
import { requireUserProfile } from "@/lib/profile";
import { parseTheme } from "@/lib/theme";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { user, profile } = await requireUserProfile();
  const db = getDb();
  const links = await db.link.findMany({
    where: { profileId: profile.id },
    orderBy: { position: "asc" },
    include: { _count: { select: { clicks: true } } },
  });
  const clickCount = await db.clickEvent.count({ where: { profileId: profile.id } });
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentClickCount = await db.clickEvent.count({
    where: { profileId: profile.id, createdAt: { gte: lastWeek } },
  });
  const activeLinks = links.filter((link) => link.isActive).length;
  const topLink = [...links].sort((a, b) => b._count.clicks - a._count.clicks)[0];
  const theme = parseTheme(profile.theme);
  const previewLinks = links
    .filter((link) => link.isActive)
    .map((link) => ({
      title: link.title,
      description: link.description,
      spotlight: link.spotlight,
    }));

  return (
    <main className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/">
          <span className="brand-mark">S</span>
          <span>SaasLink</span>
        </Link>
        <nav className="nav-actions" aria-label="Dashboard navigation">
          <span className="user-pill">{user.email}</span>
          <Link className="button" href={`/${profile.username}`}>
            Публична страница
          </Link>
          <form action={logoutUser}>
            <button className="button" type="submit">
              Изход
            </button>
          </form>
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
          <span>Последни 7 дни</span>
          <strong>{recentClickCount}</strong>
        </div>
        <div className="stat-card">
          <span>Топ линк</span>
          <strong>{topLink ? topLink._count.clicks : 0}</strong>
          <small>{topLink?.title || "Няма данни"}</small>
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
              {links.map((link, index) => (
                <article className="link-row" key={link.id}>
                  <div>
                    <strong>{link.title}</strong>
                    <p>{link.description || link.url}</p>
                    <p>
                      {link.type} · {link._count.clicks} клика · {link.isActive ? "Активен" : "Скрит"}
                    </p>
                    <details className="link-editor">
                      <summary>Редактирай</summary>
                      <form className="form-grid compact-form" action={updateLink}>
                        <input type="hidden" name="id" value={link.id} />
                        <div className="two-col">
                          <div className="field">
                            <label htmlFor={`title-${link.id}`}>Заглавие</label>
                            <input id={`title-${link.id}`} name="title" defaultValue={link.title} required />
                          </div>
                          <div className="field">
                            <label htmlFor={`type-${link.id}`}>Тип</label>
                            <select id={`type-${link.id}`} name="type" defaultValue={link.type}>
                              <option value="URL">URL</option>
                              <option value="FEATURED">Featured</option>
                              <option value="PRODUCT">Product</option>
                              <option value="BOOKING">Booking</option>
                              <option value="EMAIL_CAPTURE">Email capture</option>
                            </select>
                          </div>
                        </div>
                        <div className="field">
                          <label htmlFor={`url-${link.id}`}>URL</label>
                          <input id={`url-${link.id}`} name="url" type="url" defaultValue={link.url} required />
                        </div>
                        <div className="field">
                          <label htmlFor={`description-${link.id}`}>Описание</label>
                          <input
                            id={`description-${link.id}`}
                            name="description"
                            defaultValue={link.description || ""}
                          />
                        </div>
                        <label className="check-row">
                          <input name="spotlight" type="checkbox" defaultChecked={link.spotlight} />
                          <span>Spotlight линк</span>
                        </label>
                        <button className="button primary" type="submit">
                          Запази линка
                        </button>
                      </form>
                    </details>
                  </div>
                  <div className="link-actions">
                    <form action={moveLink}>
                      <input type="hidden" name="id" value={link.id} />
                      <input type="hidden" name="direction" value="up" />
                      <button className="button icon-button" disabled={index === 0} title="Премести нагоре" type="submit">
                        ↑
                      </button>
                    </form>
                    <form action={moveLink}>
                      <input type="hidden" name="id" value={link.id} />
                      <input type="hidden" name="direction" value="down" />
                      <button
                        className="button icon-button"
                        disabled={index === links.length - 1}
                        title="Премести надолу"
                        type="submit"
                      >
                        ↓
                      </button>
                    </form>
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

          <section className="panel">
            <h2>Аналитика по линк</h2>
            <div className="analytics-table" role="table" aria-label="Link analytics">
              <div className="analytics-row header" role="row">
                <span role="columnheader">Линк</span>
                <span role="columnheader">Тип</span>
                <span role="columnheader">Статус</span>
                <span role="columnheader">Кликове</span>
              </div>
              {links.map((link) => (
                <div className="analytics-row" role="row" key={`analytics-${link.id}`}>
                  <span role="cell">{link.title}</span>
                  <span role="cell">{link.type}</span>
                  <span role="cell">{link.isActive ? "Активен" : "Скрит"}</span>
                  <strong role="cell">{link._count.clicks}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="phone-preview" aria-label="Live preview">
          <BioPreview displayName={profile.displayName} bio={profile.bio} links={previewLinks} />
        </aside>
      </section>
    </main>
  );
}
