import Link from "next/link";
import { createLink, updateProfile, updateLink, moveLink, toggleLink, deleteLink } from "@/app/dashboard/actions";
import { logoutUser } from "@/app/(auth)/actions";
import { BioPreview } from "@/components/bio-preview";
import { SortableLinks } from "@/components/sortable-links";
import { ThemePicker } from "@/components/theme-picker";
import { EmojiPicker } from "@/components/emoji-picker";
import { getDb } from "@/lib/db";
import { requireUserProfile } from "@/lib/profile";
import { parseTheme, presets } from "@/lib/theme";

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
  const subscriberCount = await db.emailSubscriber.count({ where: { profileId: profile.id } });
  const activeLinks = links.filter((link) => link.isActive).length;
  const topLink = [...links].sort((a, b) => b._count.clicks - a._count.clicks)[0];
  const theme = parseTheme(profile.theme);
  const previewLinks = links
    .filter((link) => link.isActive)
    .map((link) => ({
      title: link.title,
      description: link.description,
      imageUrl: link.imageUrl,
      spotlight: link.spotlight,
    }));
  const publicUrl = profile.customDomain
    ? `https://${profile.customDomain}`
    : `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/${profile.username}`;

  const linkItems = links.map((link) => ({
    id: link.id,
    title: link.title,
    url: link.url,
    type: link.type,
    description: link.description,
    imageUrl: link.imageUrl,
    spotlight: link.spotlight,
    isActive: link.isActive,
    startsAt: link.startsAt ? link.startsAt.toISOString().slice(0, 16) : "",
    endsAt: link.endsAt ? link.endsAt.toISOString().slice(0, 16) : "",
    clickCount: link._count.clicks,
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
          <Link className="button" href="/dashboard/analytics">
            Аналитика
          </Link>
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
          <small>{profile.isPublished ? "Публикуван" : "Скрит профил"}</small>
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
        <div className="stat-card">
          <span>Абонати</span>
          <strong>{subscriberCount}</strong>
          <small>От email capture форми</small>
        </div>
      </section>

      <section className="dashboard">
        <div className="stack">
          <form className="panel form-grid" action={updateProfile}>
            <h2>Профил и тема</h2>
            <div className="public-url">
              <span>Публичен адрес</span>
              <a href={`/${profile.username}`}>{publicUrl}</a>
            </div>
            <div className="two-col">
              <div className="field">
                <label htmlFor="displayName">Име</label>
                <input id="displayName" name="displayName" defaultValue={profile.displayName} />
              </div>
              <div className="field">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  defaultValue={profile.username}
                  pattern="[a-z0-9-]{3,32}"
                  required
                />
              </div>
            </div>
            <div className="two-col">
              <div className="field">
                <label htmlFor="customDomain">Собствен домейн (CNAME)</label>
                <input id="customDomain" name="customDomain" placeholder="lookthis.info" defaultValue={profile.customDomain || ""} />
              </div>
              <div className="field">
                <label htmlFor="timezone">Часова зона</label>
                <select id="timezone" name="timezone" defaultValue={profile.timezone}>
                  <option value="Europe/Sofia">Europe/Sofia (GMT+2/+3)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="America/New_York">America/New York (EST)</option>
                  <option value="America/Chicago">America/Chicago (CST)</option>
                  <option value="America/Denver">America/Denver (MST)</option>
                  <option value="America/Los_Angeles">America/Los Angeles (PST)</option>
                </select>
              </div>
            </div>
            <div className="two-col">
              <div className="field">
                <label htmlFor="avatarUrl">Avatar URL</label>
                <input id="avatarUrl" name="avatarUrl" type="url" defaultValue={profile.avatarUrl || ""} />
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
            <div className="toggle-grid">
              <label className="check-row">
                <input name="isPublished" type="checkbox" defaultChecked={profile.isPublished} />
                <span>Профилът е публичен</span>
              </label>
              <label className="check-row">
                <input name="footerBrand" type="checkbox" defaultChecked={profile.footerBrand} />
                <span>Показвай SaasLink branding</span>
              </label>
            </div>

            <details className="link-editor" open style={{ borderTop: "1px solid var(--line)", paddingTop: 14, marginTop: 14 }}>
              <summary>Допълнителни настройки</summary>
              <div style={{ paddingTop: 14, display: "grid", gap: 14 }}>

                <h3 style={{ margin: 0, fontSize: "0.95rem" }}>Социални мрежи</h3>
                <div className="two-col">
                  <div className="field">
                    <label htmlFor="socialInstagram">Instagram URL</label>
                    <input id="socialInstagram" name="socialInstagram" placeholder="https://instagram.com/username" defaultValue={profile.socialInstagram || ""} />
                  </div>
                  <div className="field">
                    <label htmlFor="socialFacebook">Facebook URL</label>
                    <input id="socialFacebook" name="socialFacebook" placeholder="https://facebook.com/profile" defaultValue={profile.socialFacebook || ""} />
                  </div>
                  <div className="field">
                    <label htmlFor="socialWhatsapp">WhatsApp</label>
                    <input id="socialWhatsapp" name="socialWhatsapp" placeholder="https://wa.me/359..." defaultValue={profile.socialWhatsapp || ""} />
                  </div>
                  <div className="field">
                    <label htmlFor="socialViber">Viber (само номер)</label>
                    <input id="socialViber" name="socialViber" placeholder="359887771911" defaultValue={profile.socialViber?.replace("viber://chat?number=%2B", "").replace("viber://chat?number=", "") || ""} />
                  </div>
                </div>

                <h3 style={{ margin: 0, fontSize: "0.95rem" }}>Домейн и часова зона</h3>
                <div className="two-col">
                  <div className="field">
                    <label htmlFor="customDomain">Собствен домейн (CNAME)</label>
                    <input id="customDomain" name="customDomain" placeholder="lookthis.info" defaultValue={profile.customDomain || ""} />
                  </div>
                  <div className="field">
                    <label htmlFor="timezone">Часова зона</label>
                    <select id="timezone" name="timezone" defaultValue={profile.timezone}>
                      <option value="Europe/Sofia">Europe/Sofia (GMT+2/+3)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                      <option value="America/New_York">America/New York (EST)</option>
                      <option value="America/Chicago">America/Chicago (CST)</option>
                      <option value="America/Denver">America/Denver (MST)</option>
                      <option value="America/Los_Angeles">America/Los Angeles (PST)</option>
                    </select>
                  </div>
                </div>

                <h3 style={{ margin: 0, fontSize: "0.95rem" }}>Екстри</h3>
                <div className="two-col">
                  <div className="field">
                    <label htmlFor="backgroundVideo">Фоново видео/GIF URL</label>
                    <input id="backgroundVideo" name="backgroundVideo" placeholder="https://example.com/video.mp4" defaultValue={profile.backgroundVideo || ""} />
                  </div>
                  <div className="field">
                    <label htmlFor="donationUrl">Линк за дарение</label>
                    <input id="donationUrl" name="donationUrl" placeholder="https://buymeacoffee.com/..." defaultValue={profile.donationUrl || ""} />
                  </div>
                  <div className="field">
                    <label htmlFor="password">Парола за профил (празно = свободен)</label>
                    <input id="password" name="password" placeholder="********" defaultValue={profile.password || ""} />
                  </div>
                </div>

                <h3 style={{ margin: 0, fontSize: "0.95rem" }}>Цветове</h3>
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
                <input type="hidden" name="cardRadius" defaultValue={theme.cardRadius} />
                <input type="hidden" name="cardShadow" defaultValue={theme.cardShadow} />
                <input type="hidden" name="fontFamily" defaultValue={theme.fontFamily} />
                <input type="hidden" name="template" defaultValue={theme.template} />
                <ThemePicker presets={presets} />
              </div>
            </details>

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
                <label htmlFor="icon">Иконка (emoji)</label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input id="icon" name="icon" placeholder="🎵" maxLength={6} style={{ fontSize: "1.3rem", flex: 1 }} />
                  <EmojiPicker inputId="icon" />
                </div>
              </div>
            </div>
            <div className="two-col">
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
            <div className="field">
              <label htmlFor="imageUrl">Картинка URL (thumbnail)</label>
              <input id="imageUrl" name="imageUrl" type="url" placeholder="https://example.com/image.jpg" />
            </div>
            <div className="two-col">
              <div className="field">
                <label htmlFor="startsAt">От (дата)</label>
                <input id="startsAt" name="startsAt" type="datetime-local" />
              </div>
              <div className="field">
                <label htmlFor="endsAt">До (дата)</label>
                <input id="endsAt" name="endsAt" type="datetime-local" />
              </div>
            </div>
            <label className="check-row">
              <input name="spotlight" type="checkbox" />
              <span>Spotlight</span>
            </label>
            <button className="button primary" type="submit">
              Добави линк
            </button>
          </form>

          <section className="panel">
            <h2>Линкове (drag & drop за пренареждане)</h2>
            <SortableLinks links={linkItems} />
            <div className="link-actions-row" style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              {links.map((link, index) => (
                <div key={`btns-${link.id}`} className="link-row" style={{ border: 0, padding: "8px 0", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ fontSize: "0.9rem" }}>{link.title}</strong>
                  </span>
                  <details className="link-editor" style={{ margin: 0, display: "inline" }}>
                    <summary style={{ fontSize: "0.82rem" }}>Редактирай</summary>
                    <form className="form-grid compact-form" action={updateLink} style={{ marginTop: 8, paddingTop: 8 }}>
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
                        <input id={`description-${link.id}`} name="description" defaultValue={link.description || ""} />
                      </div>
                      <div className="field">
                        <label htmlFor={`imageUrl-${link.id}`}>Картинка URL</label>
                        <input id={`imageUrl-${link.id}`} name="imageUrl" type="url" defaultValue={link.imageUrl || ""} />
                      </div>
                      <div className="two-col">
                        <div className="field">
                          <label htmlFor={`startsAt-${link.id}`}>От (дата)</label>
                          <input id={`startsAt-${link.id}`} name="startsAt" type="datetime-local" defaultValue={link.startsAt ? link.startsAt.toISOString().slice(0, 16) : ""} />
                        </div>
                        <div className="field">
                          <label htmlFor={`endsAt-${link.id}`}>До (дата)</label>
                          <input id={`endsAt-${link.id}`} name="endsAt" type="datetime-local" defaultValue={link.endsAt ? link.endsAt.toISOString().slice(0, 16) : ""} />
                        </div>
                      </div>
                      <label className="check-row">
                        <input name="spotlight" type="checkbox" defaultChecked={link.spotlight} />
                        <span>Spotlight</span>
                      </label>
                      <button className="button primary" type="submit">Запази</button>
                    </form>
                  </details>
                  <form action={moveLink}>
                    <input type="hidden" name="id" value={link.id} />
                    <input type="hidden" name="direction" value="up" />
                    <button className="button icon-button" disabled={index === 0} type="submit">↑</button>
                  </form>
                  <form action={moveLink}>
                    <input type="hidden" name="id" value={link.id} />
                    <input type="hidden" name="direction" value="down" />
                    <button className="button icon-button" disabled={index === links.length - 1} type="submit">↓</button>
                  </form>
                  <form action={toggleLink}>
                    <input type="hidden" name="id" value={link.id} />
                    <input type="hidden" name="active" value={String(link.isActive)} />
                    <button className="button" type="submit">{link.isActive ? "Скрий" : "Покажи"}</button>
                  </form>
                  <form action={deleteLink}>
                    <input type="hidden" name="id" value={link.id} />
                    <button className="button danger" type="submit">Изтрий</button>
                  </form>
                </div>
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
          <BioPreview
            avatarUrl={profile.avatarUrl}
            displayName={profile.displayName}
            bio={profile.bio}
            footerBrand={profile.footerBrand}
            links={previewLinks}
          />
        </aside>
      </section>
    </main>
  );
}
