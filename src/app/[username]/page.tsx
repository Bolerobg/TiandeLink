import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { ensureDemoProfile } from "@/lib/demo";
import { parseTheme } from "@/lib/theme";
import { EmailCapture } from "@/components/email-capture";

export const dynamic = "force-dynamic";

const SOCIAL_PATTERNS: Record<string, string> = {
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  tiktok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.09 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  phone: "M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.01-.24c1.12.36 2.33.56 3.58.56.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.58.1.37.02.77-.25 1.02l-2.2 2.19z",
};

type SocialPlatform = keyof typeof SOCIAL_PATTERNS;

function detectPlatform(url: string): SocialPlatform | null {
  const u = url.toLowerCase();
  if (u.includes("instagram.com")) return "instagram";
  if (u.includes("tiktok.com")) return "tiktok";
  if (u.includes("facebook.com") || u.includes("fb.com")) return "facebook";
  if (u.includes("wa.me") || u.includes("whatsapp.com")) return "whatsapp";
  if (u.startsWith("tel:") || u.includes("phone")) return "phone";
  return null;
}

type EmbedType = "spotify" | "youtube" | null;

function detectEmbed(url: string): EmbedType {
  const u = url.toLowerCase();
  if (u.includes("spotify.com")) return "spotify";
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  return null;
}

function spotifyEmbedId(url: string): string | null {
  const m = url.match(/spotify\.com\/(?:embed\/)?(track|album|playlist|episode|show)\/([\w]+)/);
  if (m) return `${m[1]}/${m[2]}`;
  return null;
}

function youtubeEmbedId(url: string): string | null {
  const short = url.match(/youtu\.be\/([\w-]+)/);
  if (short) return short[1];
  const long = url.match(/youtube\.com\/watch\?v=([\w-]+)/);
  if (long) return long[1];
  const embed = url.match(/youtube\.com\/embed\/([\w-]+)/);
  if (embed) return embed[1];
  return null;
}

function SocialSvg({ platform }: { platform: SocialPlatform }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d={SOCIAL_PATTERNS[platform]} />
    </svg>
  );
}

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

  const socialLinks = links.filter((link) => detectPlatform(link.url));
  const mainLinks = links.filter((link) => !detectPlatform(link.url));

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
          <div className="avatar">
            {profile.avatarUrl ? <img alt="" src={profile.avatarUrl} /> : profile.displayName.slice(0, 1).toUpperCase()}
          </div>
          <h1>{profile.displayName}</h1>
          {profile.bio ? <p>{profile.bio}</p> : null}
        </header>

        {socialLinks.length > 0 ? (
          <div className="bio-socials">
            {socialLinks.map((link) => {
              const platform = detectPlatform(link.url);
              return platform ? (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="nofollow noopener"
                  className="social-icon"
                  aria-label={platform}
                >
                  <SocialSvg platform={platform} />
                </a>
              ) : null;
            })}
          </div>
        ) : null}

        <div className="bio-links">
          {mainLinks.map((link) => {
            const embed = detectEmbed(link.url);

            if (link.type === "EMAIL_CAPTURE") {
              return (
                <div className="linktree-card no-image" key={link.id}>
                  <div className="linktree-body" style={{ width: "100%" }}>
                    <strong>{link.title}</strong>
                    {link.description ? <small>{link.description}</small> : null}
                    <EmailCapture linkId={link.id} />
                  </div>
                </div>
              );
            }

            if (embed === "spotify") {
              const sid = spotifyEmbedId(link.url);
              return sid ? (
                <div className="linktree-embed" key={link.id}>
                  <iframe
                    src={`https://open.spotify.com/embed/${sid}`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={link.title}
                  />
                </div>
              ) : null;
            }

            if (embed === "youtube") {
              const yid = youtubeEmbedId(link.url);
              return yid ? (
                <div className="linktree-embed" key={link.id}>
                  <iframe
                    src={`https://www.youtube.com/embed/${yid}`}
                    width="100%"
                    height="200"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    title={link.title}
                    style={{ borderRadius: 18 }}
                  />
                </div>
              ) : null;
            }

            return (
              <a
                className={`linktree-card ${!link.imageUrl ? "no-image" : ""}`}
                href={`/api/click/${link.id}`}
                key={link.id}
                rel="nofollow"
              >
                {link.imageUrl ? (
                  <div className="linktree-thumb">
                    <img alt="" src={link.imageUrl} loading="lazy" />
                  </div>
                ) : null}
                <div className="linktree-body">
                  <strong>{link.title}</strong>
                  {link.description ? <small>{link.description}</small> : null}
                </div>
              </a>
            );
          })}
        </div>

        {profile.footerBrand ? <div className="footer-brand">Made with SaasLink</div> : null}
      </section>
    </main>
  );
}
