import Link from "next/link";
import { BioPreview } from "@/components/bio-preview";

const features = [
  ["Публичен профил", "Персонален URL, bio, avatar, теми и неограничени линкове."],
  ["Монетизация", "Подготовка за продукти, bookings, affiliate/sponsored links и Stripe."],
  ["Аналитика", "Кликове, CTR, аудитория, UTM, referrers и продуктови conversion events."],
  ["Docker-first", "Проектът е готов за Ubuntu server с PostgreSQL и docker compose."],
];

export default function HomePage() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/">
          <span className="brand-mark">S</span>
          <span>SaasLink</span>
        </Link>
        <nav className="nav-actions" aria-label="Main navigation">
          <Link className="button" href="/demo">
            Виж demo
          </Link>
          <Link className="button primary" href="/dashboard">
            Dashboard
          </Link>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Linktree-style SaaS, но твой</p>
          <h1>Една страница за всички линкове, продукти и кампании.</h1>
          <p className="lede">
            MVP старт за платформа като Linktree: публични bio страници, редактор,
            теми, link tracking и структура за бъдещи платени планове.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/dashboard">
              Започни с demo профил
            </Link>
            <Link className="button" href="/demo">
              Отвори публичната страница
            </Link>
          </div>
        </div>
        <BioPreview />
      </section>

      <section className="feature-grid" aria-label="Product features">
        {features.map(([title, description]) => (
          <article className="feature-card" key={title}>
            <strong>{title}</strong>
            <span>{description}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
