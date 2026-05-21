import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getDb } from "@/lib/db";
import { ensureDemoProfile } from "@/lib/demo";
import { parseTheme } from "@/lib/theme";
import { EmailCapture } from "@/components/email-capture";
import { CopyButton } from "@/components/copy-button";
import { QrModal } from "@/components/qr-modal";
import { PasswordGate } from "@/components/password-gate";

export const dynamic = "force-dynamic";

const SOCIAL_SVGS: Record<string, string> = {
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  tiktok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.09 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  viber: "M12.09 0c-.92.02-1.84.09-2.75.23-.94.14-1.83.29-2.86.53-.83.19-1.24.92-1.12 1.76.13.84.78 1.33 1.62 1.24.71-.08 1.4-.24 2.12-.36 1.58-.26 3.14-.32 4.72-.18 2.08.19 3.86.74 5.35 1.73 1.62 1.08 2.83 2.52 3.54 4.29.33.81.54 1.66.62 2.53.11 1.14-.55 2.07-1.69 2.22-1.16.15-2.06-.59-2.28-1.74-.07-.37-.12-.74-.13-1.11-.02-.89-.1-1.77-.24-2.64-.17-1.07-.5-2.09-1.05-3-.83-1.37-2.04-2.35-3.54-2.95-.95-.38-1.94-.66-2.96-.81-.71-.1-1.43-.19-2.14-.28-.52-.06-1.14.35-1.26.87-.03.14-.04.28-.03.42.02.98.63 1.68 1.62 1.72.6.02 1.19.07 1.74.24.68.21 1.25.61 1.63 1.22.22.35.3.74.2 1.17-.13.57-.52.87-1.15.75-.26-.05-.53-.07-.79-.11-1.22-.21-2.44-.47-3.69-.47-2.27.01-4.28 1.08-5.71 3.06C.94 18.79.35 20.88.14 23.08c-.07.78.28 1.46 1.03 1.65.75.18 1.42-.16 1.7-.89.41-1.11.84-2.22 1.48-3.19.52-.79 1.22-1.44 2.12-1.69.68-.19 1.32-.06 1.92.17.73.27 1.37.77 1.31 1.68-.04.62-.19 1.22-.39 1.79-.29.82-.64 1.62-.82 2.47-.14.64.23 1.33.89 1.46.66.14 1.28-.2 1.54-.78.49-1.05.91-2.13 1.27-3.22.27-.83.5-1.67.67-2.52.2-1 .32-2.01.32-3.03.01-1.18-.32-2.62-1.21-3.42-.87-.77-1.98-1.18-3.21-1.2z",
};

function detectPlatform(url: string): string | null {
  const u = url.toLowerCase();
  if (u.includes("instagram.com")) return "instagram";
  if (u.includes("tiktok.com")) return "tiktok";
  if (u.includes("facebook.com") || u.includes("fb.com")) return "facebook";
  if (u.includes("wa.me") || u.includes("whatsapp.com")) return "whatsapp";
  if (u.includes("viber")) return "viber";
  return null;
}

function detectEmbed(url: string): string | null {
  const u = url.toLowerCase();
  if (u.includes("spotify.com")) return "spotify";
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("calendly.com")) return "calendly";
  return null;
}

function SocialSvg({ platform }: { platform: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d={SOCIAL_SVGS[platform]} />
    </svg>
  );
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  if (username === "demo") await ensureDemoProfile();

  const profile = await getDb().profile.findUnique({
    where: { username },
    include: { links: { where: { isActive: true }, orderBy: { position: "asc" } } },
  });

  if (!profile || !profile.isPublished) notFound();

  if (profile.password) {
    const c = (await cookies()).get(`saaslink-${profile.username}`)?.value;
    if (c !== profile.password) return <PasswordGate username={profile.username} displayName={profile.displayName} />;
  }

  const now = Date.now();
  const theme = parseTheme(profile.theme);
  const links = profile.links.filter((link) => {
    const s = link.startsAt?.getTime() || 0;
    const e = link.endsAt?.getTime() || Number.POSITIVE_INFINITY;
    return s <= now && e >= now;
  });

  const socialPlatforms = links.filter((l) => detectPlatform(l.url));
  const mainLinks = links.filter((l) => !detectPlatform(l.url));

  const profileSocials = [
    { p: "instagram", u: profile.socialInstagram },
    { p: "facebook", u: profile.socialFacebook },
    { p: "whatsapp", u: profile.socialWhatsapp },
    { p: "viber", u: profile.socialViber },
  ].filter((s) => s.u);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const profileUrl = profile.customDomain ? `https://${profile.customDomain}` : `${baseUrl}/${profile.username}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(profileUrl)}`;

  const clickCount = await getDb().clickEvent.count({ where: { profileId: profile.id } });
  const randomBase = Math.floor(2500 + Math.random() * 2500);
  const displayViews = clickCount + randomBase;

  return (
    <main
      className="bio-page"
      data-template={theme.template}
      style={{
        background: theme.background,
        color: theme.text,
        fontFamily: theme.fontFamily,
        ["--profile-background" as string]: theme.background,
        ["--profile-surface" as string]: theme.surface,
        ["--profile-text" as string]: theme.text,
        ["--profile-accent" as string]: theme.accent,
        ["--card-radius" as string]: theme.cardRadius,
        ["--card-shadow" as string]: theme.cardShadow,
      }}
    >
      {profile.backgroundVideo ? (
        <video
          className="bio-video-bg"
          src={profile.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : null}

      <div className="bio-frame">
        <section className="bio-card" aria-label={`${profile.displayName} links`}>
          <header className="bio-header">
            <div className="avatar">
              {profile.avatarUrl ? <img alt="" src={profile.avatarUrl} /> : profile.displayName.slice(0, 1).toUpperCase()}
            </div>
            <h1>{profile.displayName}</h1>
            {profile.bio ? <p>{profile.bio}</p> : null}
            <div className="bio-views">👁 {displayViews.toLocaleString("bg")} посещения</div>
          </header>

          {(profileSocials.length > 0 || socialPlatforms.length > 0) ? (
            <div className="bio-socials">
              {profileSocials.map((s) => (
                <a key={s.p} href={s.u!} target="_blank" rel="nofollow noopener" className="social-icon" aria-label={s.p}>
                  <SocialSvg platform={s.p} />
                </a>
              ))}
              {socialPlatforms.map((link) => {
                const p = detectPlatform(link.url);
                if (p && profileSocials.some((s) => s.p === p)) return null;
                return p ? (
                  <a key={link.id} href={link.url} target="_blank" rel="nofollow noopener" className="social-icon" aria-label={p}>
                    <SocialSvg platform={p} />
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
                      <strong>{link.icon ? `${link.icon} ` : ""}{link.title}</strong>
                      {link.description ? <small>{link.description}</small> : null}
                      <EmailCapture linkId={link.id} />
                    </div>
                  </div>
                );
              }

              if (embed === "spotify") {
                const m = link.url.match(/spotify\.com\/(?:embed\/)?(\w+)\/([\w]+)/);
                if (m) return (
                  <div className="linktree-embed" key={link.id}>
                    <iframe src={`https://open.spotify.com/embed/${m[1]}/${m[2]}`} width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title={link.title} />
                  </div>
                );
              }

              if (embed === "youtube") {
                const m = link.url.match(/youtu\.be\/([\w-]+)/) || link.url.match(/youtube\.com\/watch\?v=([\w-]+)/) || link.url.match(/youtube\.com\/embed\/([\w-]+)/);
                if (m) return (
                  <div className="linktree-embed" key={link.id}>
                    <iframe src={`https://www.youtube.com/embed/${m[1]}`} width="100%" height="200" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen loading="lazy" title={link.title} style={{ borderRadius: 18 }} />
                  </div>
                );
              }

              if (embed === "calendly") {
                return (
                  <div className="linktree-embed" key={link.id}>
                    <iframe src={link.url} width="100%" height="580" frameBorder="0" loading="lazy" title={link.title} style={{ borderRadius: 18 }} />
                  </div>
                );
              }

              return (
                <a className={`linktree-card ${!link.imageUrl ? "no-image" : ""}`} href={`/api/click/${link.id}`} key={link.id} rel="nofollow">
                  {link.imageUrl ? (
                    <div className="linktree-thumb"><img alt="" src={link.imageUrl} loading="lazy" /></div>
                  ) : null}
                  <div className="linktree-body">
                    <strong>{link.icon ? `${link.icon} ` : ""}{link.title}</strong>
                    {link.description ? <small>{link.description}</small> : null}
                  </div>
                </a>
              );
            })}
          </div>

          {profile.donationUrl ? (
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <a href={profile.donationUrl} target="_blank" rel="nofollow noopener" className="donation-btn">
                ☕ Подкрепи ме
              </a>
            </div>
          ) : null}

          <div className="bio-tools">
            <CopyButton profileUrl={profileUrl} />
            <QrModal qrUrl={qrUrl} profileUrl={profileUrl} />
            <a className="tool-button" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`} target="_blank" rel="nofollow noopener" title="Сподели">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7 0-.24-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
              </svg>
              Сподели
            </a>
          </div>

          {profile.footerBrand ? <div className="footer-brand">Made with SaasLink</div> : null}
        </section>
      </div>
    </main>
  );
}
