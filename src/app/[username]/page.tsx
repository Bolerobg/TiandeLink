import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { ensureDemoProfile } from "@/lib/demo";
import { parseTheme } from "@/lib/theme";

export const dynamic = "force-dynamic";

type PublicProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { username } = await params;
  if (username === "demo") {
    await ensureDemoProfile();
  }

  const profile = await getDb().profile.findUnique({
    where: { username },
    include: {
      links: {
        where: { isActive: true },
        orderBy: { position: "asc" },
      },
    },
  });

  if (!profile || !profile.isPublished) {
    notFound();
  }

  const now = Date.now();
  const theme = parseTheme(profile.theme);
  const links = profile.links.filter((link) => {
    const startsAt = link.startsAt?.getTime() || 0;
    const endsAt = link.endsAt?.getTime() || Number.POSITIVE_INFINITY;
    return startsAt <= now && endsAt >= now;
  });

  return (
    <main
      className="bio-page"
      style={{
        background: theme.background,
        color: theme.text,
        ["--profile-background" as string]: theme.background,
        ["--profile-surface" as string]: theme.surface,
        ["--profile-text" as string]: theme.text,
        ["--profile-accent" as string]: theme.accent,
      }}
    >
      <section className="bio-card" aria-label={`${profile.displayName} links`}>
        <header className="bio-header">
          <div className="avatar">{profile.displayName.slice(0, 1).toUpperCase()}</div>
          <h1>{profile.displayName}</h1>
          {profile.bio ? <p>{profile.bio}</p> : null}
        </header>

        <div className="bio-links">
          {links.map((link) => (
            <a
              className={`bio-link ${link.spotlight ? "featured" : ""}`}
              href={`/api/click/${link.id}`}
              key={link.id}
              rel="nofollow"
            >
              <strong>{link.title}</strong>
              {link.description ? <small>{link.description}</small> : null}
            </a>
          ))}
        </div>

        {profile.footerBrand ? <div className="footer-brand">Made with SaasLink</div> : null}
      </section>
    </main>
  );
}
