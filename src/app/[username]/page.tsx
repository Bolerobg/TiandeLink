import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getDb } from "@/lib/db";
import { ensureDemoProfile } from "@/lib/demo";
import { parseTheme } from "@/lib/theme";
import { EmailCapture } from "@/components/email-capture";
import { CopyButton } from "@/components/copy-button";
import { QrModal } from "@/components/qr-modal";
import { ShareButton } from "@/components/share-button";
import { PasswordGate } from "@/components/password-gate";
import { StitchTemplate } from "@/templates/renderer";

export const dynamic = "force-dynamic";

const socialIcons: Record<string, string> = {
  instagram: "/socials/instagram.png",
  tiktok: "/socials/tiktok.png",
  facebook: "/socials/facebook.png",
  whatsapp: "/socials/whatsapp.png",
  viber: "/socials/viber.png",
  youtube: "/socials/youtube.png",
};

function detectPlatform(url: string): string | null {
  const u = url.toLowerCase();
  if (u.includes("instagram.com")) return "instagram";
  if (u.includes("tiktok.com")) return "tiktok";
  if (u.includes("facebook.com") || u.includes("fb.com")) return "facebook";
  if (u.includes("wa.me") || u.includes("whatsapp.com")) return "whatsapp";
  if (u.includes("viber")) return "viber";
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  return null;
}

function SocialIcon({ platform, size }: { platform: string; size?: number }) {
  const src = socialIcons[platform];
  const s = size || 28;
  return src ? (
    <img src={src} alt={platform} width={s} height={s} style={{ objectFit: "contain" }} />
  ) : (
    <span style={{ width: s, height: s, display: "inline-block" }} />
  );
}

function detectEmbed(url: string): string | null {
  const u = url.toLowerCase();
  if (u.includes("spotify.com")) return "spotify";
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("calendly.com")) return "calendly";
  return null;
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

  const STITCH_TEMPLATES = ["bento","wellness","fullglass","neumorph","masonry","linkbio1","linkbio2","clean","blobs","zglass","o1","o2","softblob","offset","organic","pinterest","notes","twitter","netflix","discord","spotify","github","airbnb","chatgpt","arcade"];
  if (STITCH_TEMPLATES.includes(theme.template)) {
    return (
      <StitchTemplate
        template={theme.template}
        profile={profile}
        links={mainLinks.map((link) => ({
          id: link.id,
          title: link.title,
          url: link.url,
          description: link.description,
          imageUrl: link.imageUrl,
          icon: (link as any).icon,
          type: link.type,
        }))}
      />
    );
  }

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
                  <SocialIcon platform={s.p} />
                </a>
              ))}
              {socialPlatforms.map((link) => {
                const p = detectPlatform(link.url);
                if (p && profileSocials.some((s) => s.p === p)) return null;
                return p ? (
                  <a key={link.id} href={link.url} target="_blank" rel="nofollow noopener" className="social-icon" aria-label={p}>
                    <SocialIcon platform={p} />
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
                <a
                  className={`linktree-card ${!link.imageUrl ? "no-image" : ""}`}
                  data-link-type={link.type}
                  href={`/api/click/${link.id}`}
                  key={link.id}
                  rel="nofollow"
                >
                  {link.imageUrl ? (
                    <div className="linktree-thumb"><img alt="" src={link.imageUrl} loading="lazy" /></div>
                  ) : null}
                  {link.type !== "URL" ? (
                    <span className="linktree-type-badge">
                      {link.type === "FEATURED" ? "⭐ Featured" : link.type === "PRODUCT" ? "🛍" : link.type === "BOOKING" ? "📅" : link.type === "TEXT" ? "📄" : ""}
                    </span>
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
            <ShareButton profileUrl={profileUrl} displayName={profile.displayName} />
          </div>

          {profile.footerBrand ? <div className="footer-brand">Made with SaasLink</div> : null}
        </section>
      </div>
    </main>
  );
}
