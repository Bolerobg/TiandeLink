import React from "react";
import configs from "./configs_summary.json";
import { EmailCapture } from "@/components/email-capture";

type Link = {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  imageUrl?: string | null;
  icon?: string | null;
  type?: string | null;
};

type Profile = {
  displayName: string;
  bio?: string | null;
  avatarUrl?: string | null;
  socialInstagram?: string | null;
  socialFacebook?: string | null;
  socialWhatsapp?: string | null;
  socialViber?: string | null;
  donationUrl?: string | null;
  customDomain?: string | null;
  footerBrand?: boolean | null;
};

function Av({ p }: { p: Profile }) {
  return p.avatarUrl ? (
    <img src={p.avatarUrl} alt="" className="w-full h-full object-cover" />
  ) : (
    <span className="text-xl font-bold">{p.displayName[0]}</span>
  );
}

// Unified wrapper to inject custom Fonts, Tailwind script, custom tailwind configs, and custom styles
function PremiumWrapper({ templateKey, children }: { templateKey: string | null; children: React.ReactNode }) {
  const config = templateKey ? (configs as any)[templateKey] : null;

  return (
    <>
      {/* 1. Inject Theme Fonts */}
      {config?.fonts &&
        config.fonts.map((fontUrl: string, idx: number) => {
          const cleanUrl = fontUrl.replace(/&amp;/g, "&");
          return <link key={idx} rel="stylesheet" href={cleanUrl} />;
        })}

      {/* 2. Inject Tailwind CDN script */}
      <script src="https://cdn.tailwindcss.com"></script>

      {/* 3. Inject Dynamic Custom Tailwind config */}
      {config?.tailwind_config && (
        <script
          id={`tailwind-config-${templateKey}`}
          dangerouslySetInnerHTML={{ __html: config.tailwind_config }}
        />
      )}

      {/* 4. Inject Theme-specific custom style overrides */}
      {config?.styles && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Custom styles for theme ${templateKey} */
              ${config.styles}
            `,
          }}
        />
      )}

      {/* 5. Render children in a container carrying the precise theme body classes */}
      <div className={`${config?.body_class || ""} min-h-screen w-full`}>{children}</div>
    </>
  );
}

export function StitchTemplate({ template, profile, links }: { template: string; profile: Profile; links: Link[] }) {
  switch (template) {
    case "bento":
      return (
        <PremiumWrapper templateKey="_6">
          <Bento profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "wellness":
      return (
        <PremiumWrapper templateKey="_7">
          <Wellness profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "fullglass":
      return (
        <PremiumWrapper templateKey="glassmorphism">
          <FullGlass profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "neumorph":
      return (
        <PremiumWrapper templateKey="soft_ui">
          <Neumorph profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "masonry":
      return (
        <PremiumWrapper templateKey="_8">
          <Masonry profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "linkbio1":
      return (
        <PremiumWrapper templateKey="link_in_bio_1">
          <LinkBio1 profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "linkbio2":
      return (
        <PremiumWrapper templateKey="_3">
          <LinkBio2 profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "clean":
      return (
        <PremiumWrapper templateKey="link_in_bio_2">
          <Clean profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "blobs":
    case "softblob":
      return (
        <PremiumWrapper templateKey="_9">
          <Blobs profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "zglass":
      return (
        <PremiumWrapper templateKey="_4">
          <ZGlass profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "o1":
      return (
        <PremiumWrapper templateKey="_2">
          <O1 profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "o2":
      return (
        <PremiumWrapper templateKey="_1">
          <O2 profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "offset":
      return (
        <PremiumWrapper templateKey="_5">
          <Offset profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "organic":
      return (
        <PremiumWrapper templateKey="_2">
          <OrganicElegance profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "pinterest":
      return (
        <PremiumWrapper templateKey={null}>
          <Pinterest profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "notes":
      return (
        <PremiumWrapper templateKey={null}>
          <Notes profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "twitter":
      return (
        <PremiumWrapper templateKey={null}>
          <Twitter profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "netflix":
      return (
        <PremiumWrapper templateKey={null}>
          <Netflix profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "discord":
      return (
        <PremiumWrapper templateKey={null}>
          <Discord profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "spotify":
      return (
        <PremiumWrapper templateKey={null}>
          <SpotifyWrapped profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "github":
      return (
        <PremiumWrapper templateKey={null}>
          <GitHub profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "airbnb":
      return (
        <PremiumWrapper templateKey={null}>
          <Airbnb profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "chatgpt":
      return (
        <PremiumWrapper templateKey={null}>
          <ChatGPT profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "arcade":
      return (
        <PremiumWrapper templateKey={null}>
          <Arcade profile={profile} links={links} />
        </PremiumWrapper>
      );
    default:
      return (
        <PremiumWrapper templateKey="_3">
          <LinkBio2 profile={profile} links={links} />
        </PremiumWrapper>
      );
  }
}

/* ───────────────────────────────────────────────────────────
   PREMIUM DYNAMIC TEMPLATE COMPONENTS (Tailwind Powered)
   ─────────────────────────────────────────────────────────── */

function O2({ profile, links }: { profile: Profile; links: Link[] }) {
  const featured = links.filter((l) => l.imageUrl);
  const standard = links.filter((l) => !l.imageUrl);

  const finalFeatured = featured.length > 0 ? featured.slice(0, 2) : links.slice(0, 2);
  const finalStandard = featured.length > 0 ? standard : links.slice(2);

  const socials = [
    { name: "Instagram", icon: "photo_camera", url: profile.socialInstagram },
    { name: "Facebook", icon: "public", url: profile.socialFacebook },
    { name: "WhatsApp", icon: "chat", url: profile.socialWhatsapp },
    { name: "Viber", icon: "call", url: profile.socialViber },
  ].filter((s) => s.url);

  return (
    <main className="max-w-2xl mx-auto px-margin-mobile py-section-gap flex flex-col gap-16">
      {/* Header */}
      <header className="flex flex-col items-center text-center gap-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border border-outline-variant shadow-sm p-1 bg-surface-container-lowest flex items-center justify-center">
          <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-surface-container">
            <Av p={profile} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
            {profile.displayName}
          </h1>
          {profile.bio && (
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto">
              {profile.bio}
            </p>
          )}
        </div>
        {socials.length > 0 && (
          <div className="flex gap-4 mt-2">
            {socials.map((s, idx) => (
              <a
                key={idx}
                href={s.url!}
                aria-label={s.name}
                className="p-2 rounded-full border border-outline-variant text-primary hover:bg-surface-container-low transition-colors duration-200"
              >
                <span className="material-symbols-outlined">{s.icon}</span>
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Featured Grid */}
      {finalFeatured.length > 0 && (
        <section className="flex flex-col gap-6">
          <h2 className="font-headline-sm text-headline-sm text-primary text-center">Любими Продукти</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {finalFeatured.map((link) => (
              <div
                key={link.id}
                className="group relative flex flex-col rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant hover:border-secondary transition-all duration-300 shadow-sm"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  {link.imageUrl ? (
                    <img
                      src={link.imageUrl}
                      alt={link.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary/30 text-4xl">shopping_bag</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full z-10">
                    <h3 className="font-headline-sm text-headline-sm text-on-tertiary mb-2">{link.title}</h3>
                    {link.description && (
                      <p className="font-label-sm text-label-sm text-on-tertiary/80 uppercase tracking-widest">
                        {link.description}
                      </p>
                    )}
                    {link.type === "EMAIL_CAPTURE" ? (
                      <div className="mt-3 relative z-20" onClick={(e) => e.stopPropagation()}>
                        <EmailCapture linkId={link.id} />
                      </div>
                    ) : (
                      <a
                        href={`/api/click/${link.id}`}
                        className="absolute inset-0 z-0"
                        aria-label={link.title}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Standard Links List */}
      {finalStandard.length > 0 && (
        <section className="flex flex-col gap-4">
          {finalStandard.map((link, idx) => {
            const icons = ["face", "spa", "local_fire_department", "content_cut", "favorite", "star"];
            const currentIcon = link.icon || icons[idx % icons.length];

            if (link.type === "EMAIL_CAPTURE") {
              return (
                <div
                  key={link.id}
                  className="p-5 bg-surface-container-lowest border border-outline-variant rounded-lg"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="material-symbols-outlined text-primary">{currentIcon}</span>
                    <span className="font-label-md text-label-md text-primary">{link.title}</span>
                  </div>
                  {link.description && (
                    <p className="text-sm text-on-surface-variant mb-4">{link.description}</p>
                  )}
                  <EmailCapture linkId={link.id} />
                </div>
              );
            }

            return (
              <a
                key={link.id}
                href={`/api/click/${link.id}`}
                className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg hover:border-secondary hover:shadow-sm transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-colors">
                    {currentIcon}
                  </span>
                  <span className="font-label-md text-label-md text-primary">{link.title}</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-secondary transition-colors">
                  chevron_right
                </span>
              </a>
            );
          })}
        </section>
      )}

      {/* Dynamic Action / Join Card */}
      {profile.donationUrl && (
        <section className="relative rounded-xl overflow-hidden border border-outline-variant group shadow-sm bg-surface-container-high">
          <div className="aspect-[16/9] w-full relative">
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] z-10"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 gap-6">
              <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-tertiary">СТАНИ ЕДНА ОТ НАС</h2>
              <a
                href={profile.donationUrl}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-secondary transition-colors border border-outline/30 shadow-sm uppercase tracking-wider"
              >
                Присъедини се сега
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="w-full mt-section-gap border-t border-outline-variant flex flex-col items-center gap-4 py-12 px-margin-mobile md:px-margin-desktop mb-24 bg-background">
        <a className="font-display-lg-mobile text-display-lg-mobile tracking-widest text-primary uppercase" href="#">
          {profile.displayName}
        </a>
        <p className="font-label-sm text-label-sm text-on-surface-variant/60">
          © {new Date().getFullYear()} {profile.displayName}. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}

function O1({ profile, links }: { profile: Profile; links: Link[] }) {
  const featured = links.filter((l) => l.imageUrl);
  const standard = links.filter((l) => !l.imageUrl);

  const finalFeatured = featured.length > 0 ? featured.slice(0, 3) : links.slice(0, 3);
  const finalStandard = featured.length > 0 ? standard : links.slice(3);

  const socials = [
    { name: "Instagram", icon: "photo_camera", url: profile.socialInstagram },
    { name: "Facebook", icon: "public", url: profile.socialFacebook },
    { name: "WhatsApp", icon: "chat", url: profile.socialWhatsapp },
    { name: "Viber", icon: "call", url: profile.socialViber },
  ].filter((s) => s.url);

  return (
    <main className="w-full max-w-[480px] px-margin-mobile py-8 flex flex-col gap-10 mx-auto">
      {/* Header */}
      <header className="flex flex-col items-center text-center gap-4 pt-4">
        <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-surface-container-high flex items-center justify-center bg-surface-container">
          <Av p={profile} />
        </div>
        <div className="space-y-2">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">
            {profile.displayName}
          </h1>
          {profile.bio && (
            <p className="font-body-md text-body-md text-on-surface-variant max-w-[280px] mx-auto leading-relaxed">
              {profile.bio}
            </p>
          )}
        </div>
        {socials.length > 0 && (
          <div className="flex gap-4 mt-2 text-primary">
            {socials.map((s, idx) => (
              <a
                key={idx}
                href={s.url!}
                aria-label={s.name}
                className="p-2 rounded-full hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-2xl">{s.icon}</span>
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Featured Bento Grid */}
      {finalFeatured.length > 0 && (
        <section className="grid grid-cols-2 gap-4">
          {finalFeatured[0] && (
            <div className="col-span-1 row-span-2 group relative rounded-xl overflow-hidden shadow-lg h-64 bg-cream-surface border border-surface-container-high">
              {finalFeatured[0].imageUrl && (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${finalFeatured[0].imageUrl})` }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 p-4 z-20 w-full">
                <h2 className="font-label-lg text-label-lg text-white mb-1 uppercase tracking-wider line-clamp-2">
                  {finalFeatured[0].title}
                </h2>
                {finalFeatured[0].type === "EMAIL_CAPTURE" ? (
                  <EmailCapture linkId={finalFeatured[0].id} />
                ) : (
                  <a href={`/api/click/${finalFeatured[0].id}`} className="absolute inset-0" />
                )}
              </div>
            </div>
          )}

          {finalFeatured[1] && (
            <div className="col-span-1 group relative rounded-xl overflow-hidden shadow-sm h-[120px] bg-cream-surface border border-surface-container-high">
              {finalFeatured[1].imageUrl && (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-80 transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${finalFeatured[1].imageUrl})` }}
                />
              )}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center z-20">
                <h3 className="font-label-md text-label-md text-white uppercase tracking-widest drop-shadow-md line-clamp-2">
                  {finalFeatured[1].title}
                </h3>
                {finalFeatured[1].type === "EMAIL_CAPTURE" ? (
                  <EmailCapture linkId={finalFeatured[1].id} />
                ) : (
                  <a href={`/api/click/${finalFeatured[1].id}`} className="absolute inset-0" />
                )}
              </div>
            </div>
          )}

          {finalFeatured[2] && (
            <div className="col-span-1 group relative rounded-xl overflow-hidden shadow-sm h-[120px] bg-cream-surface border border-surface-container-high">
              {finalFeatured[2].imageUrl && (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-80 transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${finalFeatured[2].imageUrl})` }}
                />
              )}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center z-20">
                <h3 className="font-label-md text-label-md text-white uppercase tracking-widest drop-shadow-md line-clamp-2">
                  {finalFeatured[2].title}
                </h3>
                {finalFeatured[2].type === "EMAIL_CAPTURE" ? (
                  <EmailCapture linkId={finalFeatured[2].id} />
                ) : (
                  <a href={`/api/click/${finalFeatured[2].id}`} className="absolute inset-0" />
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Standard Links */}
      {finalStandard.length > 0 && (
        <section className="flex flex-col gap-3">
          {finalStandard.map((link, idx) => {
            const icons = ["spa", "local_fire_department", "medication", "face", "favorite", "grade"];
            const currentIcon = link.icon || icons[idx % icons.length];

            if (link.type === "EMAIL_CAPTURE") {
              return (
                <div
                  key={link.id}
                  className="p-4 rounded-xl bg-cream-surface border border-surface-container"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-tertiary">{currentIcon}</span>
                    <span className="font-label-lg text-label-lg text-on-surface">{link.title}</span>
                  </div>
                  {link.description && (
                    <p className="text-xs text-on-surface-variant mb-3">{link.description}</p>
                  )}
                  <EmailCapture linkId={link.id} />
                </div>
              );
            }

            return (
              <a
                key={link.id}
                href={`/api/click/${link.id}`}
                className="flex items-center justify-between p-4 rounded-xl bg-cream-surface border border-surface-container hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary">{currentIcon}</span>
                  <span className="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors">
                    {link.title}
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">
                  chevron_right
                </span>
              </a>
            );
          })}
        </section>
      )}

      {/* Join Call to Action Banner */}
      {profile.donationUrl && (
        <section className="mt-4 w-full rounded-xl bg-primary text-on-primary p-8 text-center shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container/40 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center gap-4">
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-inverse-primary tracking-tight">
              СТАНИ ЕДНА ОТ НАС
            </h2>
            <p className="font-body-md text-body-md text-on-primary/80 mb-2">
              Присъедини се към общността за здраве и красота.
            </p>
            <a
              href={profile.donationUrl}
              className="inline-block bg-inverse-primary text-primary font-label-lg text-label-lg px-8 py-3 rounded-lg hover:bg-surface-container-lowest transition-colors shadow-sm uppercase tracking-wider"
            >
              Научи повече
            </a>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="full-width py-12 flex flex-col items-center justify-center space-y-4 mb-20 text-center px-margin-mobile mt-auto">
        <div className="font-label-md text-label-md text-on-surface-variant">
          © {new Date().getFullYear()} {profile.displayName}. Всички права запазени.
        </div>
      </footer>
    </main>
  );
}

function LinkBio2({ profile, links }: { profile: Profile; links: Link[] }) {
  const featured = links.filter((l) => l.imageUrl);
  const standard = links.filter((l) => !l.imageUrl);

  const finalFeatured = featured.length > 0 ? featured.slice(0, 3) : links.slice(0, 3);
  const finalStandard = featured.length > 0 ? standard : links.slice(3);

  const socials = [
    { name: "Instagram", url: profile.socialInstagram, img: "/socials/instagram.png" },
    { name: "Facebook", url: profile.socialFacebook, img: "/socials/facebook.png" },
    { name: "WhatsApp", url: profile.socialWhatsapp, img: "/socials/whatsapp.png" },
    { name: "Viber", url: profile.socialViber, img: "/socials/viber.png" },
  ].filter((s) => s.url);

  return (
    <main className="w-full max-w-md px-margin-mobile pt-12 pb-24 flex flex-col items-center gap-10 relative z-10 mx-auto">
      {/* Header */}
      <header className="flex flex-col items-center text-center space-y-4">
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-sm flex items-center justify-center bg-surface-container border border-surface-container-high">
          <Av p={profile} />
        </div>
        <div className="space-y-1">
          <h1 className="font-headline-lg text-headline-lg text-primary">{profile.displayName}</h1>
          {profile.bio && (
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">
              {profile.bio}
            </p>
          )}
        </div>
      </header>

      {/* Social Icons */}
      {socials.length > 0 && (
        <nav aria-label="Social Links" className="flex justify-center gap-6 text-on-surface-variant w-full">
          {socials.map((s, idx) => (
            <a
              key={idx}
              href={s.url!}
              aria-label={s.name}
              className="hover:text-primary transition-colors p-2"
            >
              <img
                src={s.img}
                alt={s.name}
                className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            </a>
          ))}
        </nav>
      )}

      {/* Large Featured Card */}
      {finalFeatured[0] && (
        <section aria-label="Featured Product" className="w-full">
          <div className="group block bg-cream-surface rounded-lg overflow-hidden shadow-[0px_4px_20px_rgba(30,15,11,0.05)] hover:shadow-[0px_8px_30px_rgba(30,15,11,0.08)] transition-all duration-300">
            <div className="aspect-video relative overflow-hidden bg-surface-container-low">
              {finalFeatured[0].imageUrl ? (
                <img
                  src={finalFeatured[0].imageUrl}
                  alt={finalFeatured[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary/30 text-4xl">grade</span>
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col items-center text-center">
              <h2 className="font-headline-md text-headline-md text-primary mb-2">
                {finalFeatured[0].title}
              </h2>
              {finalFeatured[0].description && (
                <p className="text-sm text-on-surface-variant mb-4">{finalFeatured[0].description}</p>
              )}
              {finalFeatured[0].type === "EMAIL_CAPTURE" ? (
                <EmailCapture linkId={finalFeatured[0].id} />
              ) : (
                <a
                  href={`/api/click/${finalFeatured[0].id}`}
                  className="font-label-lg text-label-lg text-tertiary flex items-center gap-1 uppercase tracking-wider"
                >
                  ВИЖ ПОВЕЧЕ <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Two Grid Products */}
      {finalFeatured.slice(1, 3).length > 0 && (
        <section aria-label="Product Grid" className="w-full grid grid-cols-2 gap-4">
          {finalFeatured.slice(1, 3).map((link) => (
            <div key={link.id} className="group flex flex-col gap-3">
              <div className="aspect-square bg-cream-surface rounded-lg overflow-hidden relative shadow-[0px_2px_10px_rgba(30,15,11,0.03)]">
                {link.imageUrl ? (
                  <img
                    src={link.imageUrl}
                    alt={link.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary/30 text-3xl">shopping_bag</span>
                  </div>
                )}
                {link.type === "EMAIL_CAPTURE" ? (
                  <div className="absolute inset-0 bg-black/60 p-3 flex flex-col justify-end">
                    <EmailCapture linkId={link.id} />
                  </div>
                ) : (
                  <a href={`/api/click/${link.id}`} className="absolute inset-0" />
                )}
              </div>
              <div className="text-center">
                <h3 className="font-body-md text-body-md text-primary">{link.title}</h3>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Link List */}
      {finalStandard.length > 0 && (
        <section aria-label="Link List" className="w-full flex flex-col gap-3">
          {finalStandard.map((link) => {
            if (link.type === "EMAIL_CAPTURE") {
              return (
                <div
                  key={link.id}
                  className="py-5 px-6 bg-cream-surface rounded-lg shadow-[0px_2px_10px_rgba(30,15,11,0.03)]"
                >
                  <strong className="font-body-lg text-body-lg text-primary block mb-2">{link.title}</strong>
                  {link.description && (
                    <p className="text-xs text-on-surface-variant mb-3">{link.description}</p>
                  )}
                  <EmailCapture linkId={link.id} />
                </div>
              );
            }

            return (
              <a
                key={link.id}
                href={`/api/click/${link.id}`}
                className="flex justify-between items-center w-full py-5 px-6 bg-cream-surface rounded-lg hover:bg-surface-container-high transition-colors shadow-[0px_2px_10px_rgba(30,15,11,0.03)]"
              >
                <span className="font-body-lg text-body-lg text-primary">{link.title}</span>
                <span className="material-symbols-outlined text-outline">arrow_forward</span>
              </a>
            );
          })}
        </section>
      )}

      {/* Join call out */}
      {profile.donationUrl && (
        <section
          aria-label="Join Our Team"
          className="w-full bg-surface-bright rounded-lg p-8 text-center border border-surface-container-low"
        >
          <h2 className="font-headline-md text-headline-md text-primary mb-3">Присъедини се сега</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Стани част от нашия красив свят и постигни целите си.
          </p>
          <a
            href={profile.donationUrl}
            className="inline-block bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider py-3 px-8 rounded-lg hover:bg-opacity-90 transition-opacity"
          >
            Научи повече
          </a>
        </section>
      )}

      {/* Footer */}
      <footer className="full-width py-12 flex flex-col items-center justify-center space-y-4 mb-20 text-center px-margin-mobile bg-transparent mt-auto relative z-10 w-full max-w-md mx-auto">
        <p className="font-label-md text-label-md text-on-surface-variant">
          © {new Date().getFullYear()} {profile.displayName}. Всички права запазени.
        </p>
      </footer>
    </main>
  );
}

function ZGlass({ profile, links }: { profile: Profile; links: Link[] }) {
  const featured = links.filter((l) => l.imageUrl);
  const standard = links.filter((l) => !l.imageUrl);

  const finalFeatured = featured.length > 0 ? featured : links.slice(0, 3);
  const finalStandard = featured.length > 0 ? standard : links.slice(3);

  const socials = [
    { name: "Instagram", icon: "photo_camera", url: profile.socialInstagram },
    { name: "Facebook", icon: "public", url: profile.socialFacebook },
    { name: "WhatsApp", icon: "chat", url: profile.socialWhatsapp },
    { name: "Viber", icon: "call", url: profile.socialViber },
  ].filter((s) => s.url);

  return (
    <main className="w-full max-w-md px-margin-mobile pt-12 pb-24 flex flex-col items-center gap-10 relative z-10 mx-auto">
      {/* Decorative dots background texture */}
      <div className="absolute top-0 inset-x-0 h-full bg-gradient-texture -z-10" />

      {/* Header */}
      <header className="flex flex-col items-center text-center space-y-4">
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-sm flex items-center justify-center bg-surface-container border border-surface-container-high">
          <Av p={profile} />
        </div>
        <div className="space-y-1">
          <h1 className="font-headline-lg text-headline-lg text-primary">{profile.displayName}</h1>
          {profile.bio && (
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">
              {profile.bio}
            </p>
          )}
        </div>
      </header>

      {/* Social Links Strip */}
      {socials.length > 0 && (
        <nav aria-label="Social Links" className="flex justify-center gap-6 text-on-surface-variant w-full">
          {socials.map((s, idx) => (
            <a
              key={idx}
              href={s.url!}
              aria-label={s.name}
              className="text-on-surface-variant hover:text-primary transition-colors p-2"
            >
              <span className="material-symbols-outlined text-2xl">{s.icon}</span>
            </a>
          ))}
        </nav>
      )}

      {/* Alternating Z-Pattern featured list */}
      {finalFeatured.length > 0 && (
        <section aria-label="Featured Section" className="w-full flex flex-col gap-8">
          {finalFeatured.map((link, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={link.id}
                className={`z-pattern-card glass-panel rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center w-full group transition-all duration-300 hover:scale-[1.02] shadow-sm`}
              >
                {link.imageUrl ? (
                  <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-sm aspect-video md:aspect-square flex-shrink-0">
                    <img
                      src={link.imageUrl}
                      alt={link.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full md:w-1/3 rounded-xl overflow-hidden aspect-video md:aspect-square flex-shrink-0 bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary/30 text-3xl">shopping_bag</span>
                  </div>
                )}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-headline-md text-headline-md text-primary mb-2">{link.title}</h2>
                  {link.description && (
                    <p className="text-sm text-on-surface-variant mb-4">{link.description}</p>
                  )}
                  {link.type === "EMAIL_CAPTURE" ? (
                    <EmailCapture linkId={link.id} />
                  ) : (
                    <a
                      href={`/api/click/${link.id}`}
                      className="inline-flex items-center gap-1 text-primary font-semibold hover:text-secondary transition-colors"
                    >
                      ВИЖ ПОВЕЧЕ <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Standard Links */}
      {finalStandard.length > 0 && (
        <section aria-label="Links List" className="w-full flex flex-col gap-3">
          {finalStandard.map((link) => {
            if (link.type === "EMAIL_CAPTURE") {
              return (
                <div key={link.id} className="glass-panel p-5 rounded-xl w-full">
                  <strong className="font-body-lg text-body-lg text-primary block mb-2">{link.title}</strong>
                  {link.description && (
                    <p className="text-xs text-on-surface-variant mb-3">{link.description}</p>
                  )}
                  <EmailCapture linkId={link.id} />
                </div>
              );
            }

            return (
              <a
                key={link.id}
                href={`/api/click/${link.id}`}
                className="glass-panel flex justify-between items-center p-5 rounded-xl hover:bg-surface-container-low/80 transition-all duration-300 w-full group"
              >
                <span className="font-body-lg text-body-lg text-primary group-hover:text-secondary transition-colors">
                  {link.title}
                </span>
                <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">
                  arrow_forward
                </span>
              </a>
            );
          })}
        </section>
      )}

      {/* Join Block */}
      {profile.donationUrl && (
        <section className="w-full glass-panel rounded-2xl p-8 text-center border border-surface-container-low shadow-sm">
          <h2 className="font-headline-md text-headline-md text-primary mb-3">Присъедини се към нас</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Заедно можем да постигнем по-големи върхове в красотата и личния растеж.
          </p>
          <a
            href={profile.donationUrl}
            className="inline-block bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider py-3 px-8 rounded-lg hover:bg-opacity-95 transition-opacity shadow-md"
          >
            Научи повече
          </a>
        </section>
      )}

      {/* Footer */}
      <footer className="full-width py-12 flex flex-col items-center justify-center space-y-4 mb-20 text-center px-margin-mobile mt-auto">
        <p className="font-label-md text-label-md text-on-surface-variant">
          © {new Date().getFullYear()} {profile.displayName}. Всички права запазени.
        </p>
      </footer>
    </main>
  );
}

function Offset({ profile, links }: { profile: Profile; links: Link[] }) {
  const featured = links.filter((l) => l.imageUrl);
  const standard = links.filter((l) => !l.imageUrl);

  const finalFeatured = featured.length > 0 ? featured : links.slice(0, 3);
  const finalStandard = featured.length > 0 ? standard : links.slice(3);

  const socials = [
    { name: "Instagram", icon: "photo_camera", url: profile.socialInstagram },
    { name: "Facebook", icon: "public", url: profile.socialFacebook },
    { name: "WhatsApp", icon: "chat", url: profile.socialWhatsapp },
    { name: "Viber", icon: "call", url: profile.socialViber },
  ].filter((s) => s.url);

  return (
    <>
      {/* Top Header Docked Bar */}
      <header className="bg-surface/80 backdrop-blur-md top-0 sticky flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 z-50 border-b border-outline-variant/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant flex items-center justify-center bg-surface-container">
            <Av p={profile} />
          </div>
          <h1 className="font-headline-md text-headline-md-mobile md:text-headline-md text-primary">
            {profile.displayName}
          </h1>
        </div>
        <button className="text-primary hover:text-soft-gold transition-colors duration-300 flex items-center justify-center p-2 rounded-full hover:bg-surface-container">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-32 pt-8">
        {/* Hero Banner with custom blur decorators */}
        <section className="relative mb-24 md:mb-32 mt-8 md:mt-16 flex flex-col items-center text-center">
          <div className="relative w-full max-w-2xl mx-auto z-10">
            <h2 className="font-display-lg text-display-lg text-primary mb-6 relative z-20 mix-blend-multiply opacity-90 leading-tight">
              {profile.bio || "Открий изкуството на релаксацията и красотата"}
            </h2>
            <div className="absolute -top-12 -left-8 w-24 h-24 bg-soft-gold/20 rounded-full blur-2xl z-0"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary-fixed-dim/30 rounded-full blur-3xl z-0"></div>
          </div>

          {/* Social Links floating glass strip */}
          {socials.length > 0 && (
            <div className="glass-panel mt-8 px-8 py-4 rounded-full flex gap-6 items-center shadow-lg relative z-20">
              {socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url!}
                  className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Dynamic Offset Card featured list */}
        {finalFeatured.length > 0 && (
          <section className="flex flex-col gap-16 mb-24 max-w-4xl mx-auto">
            {finalFeatured.map((link) => (
              <div
                key={link.id}
                className="offset-border-card border border-outline-variant bg-surface rounded-2xl overflow-hidden soft-shadow block group transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row">
                  {link.imageUrl ? (
                    <div className="w-full md:w-1/2 aspect-video md:aspect-auto md:h-96 relative overflow-hidden bg-surface-container-low flex-shrink-0">
                      <img
                        src={link.imageUrl}
                        alt={link.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-full md:w-1/2 aspect-video md:aspect-auto md:h-96 bg-surface-container flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary/30 text-5xl">shopping_bag</span>
                    </div>
                  )}
                  <div className="p-8 md:p-12 flex flex-col justify-center flex-1">
                    <h3 className="font-headline-md text-headline-md text-primary mb-4">{link.title}</h3>
                    {link.description && (
                      <p className="text-on-surface-variant font-body-md text-body-md mb-8 leading-relaxed">
                        {link.description}
                      </p>
                    )}
                    {link.type === "EMAIL_CAPTURE" ? (
                      <EmailCapture linkId={link.id} />
                    ) : (
                      <a
                        href={`/api/click/${link.id}`}
                        className="inline-flex items-center justify-center bg-primary text-on-primary font-label-lg text-label-lg px-8 py-4 rounded-xl hover:bg-soft-gold transition-colors uppercase tracking-wider w-max shadow-sm"
                      >
                        Виж повече
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Standard row links */}
        {finalStandard.length > 0 && (
          <section className="flex flex-col gap-4 max-w-2xl mx-auto mb-24">
            {finalStandard.map((link, idx) => {
              const icons = ["spa", "favorite", "bubble_chart", "grade", "public", "face"];
              const currentIcon = link.icon || icons[idx % icons.length];

              if (link.type === "EMAIL_CAPTURE") {
                return (
                  <div
                    key={link.id}
                    className="p-5 bg-surface-container-lowest border border-outline-variant rounded-xl"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <span className="material-symbols-outlined text-tertiary">{currentIcon}</span>
                      <strong className="font-label-lg text-label-lg text-primary uppercase">
                        {link.title}
                      </strong>
                    </div>
                    {link.description && (
                      <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                        {link.description}
                      </p>
                    )}
                    <EmailCapture linkId={link.id} />
                  </div>
                );
              }

              return (
                <a
                  key={link.id}
                  href={`/api/click/${link.id}`}
                  className="flex items-center justify-between p-5 bg-surface-container-lowest border border-outline-variant rounded-xl hover:border-soft-gold hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-tertiary group-hover:text-primary transition-colors">
                      {currentIcon}
                    </span>
                    <span className="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors uppercase tracking-wider">
                      {link.title}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">
                    arrow_forward
                  </span>
                </a>
              );
            })}
          </section>
        )}

        {/* CTA Section */}
        {profile.donationUrl && (
          <section className="mt-8 w-full max-w-4xl mx-auto rounded-2xl bg-primary text-on-primary p-8 md:p-12 text-center shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/40 to-transparent pointer-events-none"></div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-inverse-primary tracking-tight">
                СТАНИ ЕДНА ОТ НАС
              </h2>
              <p className="font-body-md text-body-md text-on-primary/80 mb-6 max-w-md leading-relaxed">
                Свържи се с мен днес за персонални препоръки, консултации и партньорства.
              </p>
              <a
                href={profile.donationUrl}
                className="inline-block bg-inverse-primary text-primary font-label-lg text-label-lg px-8 py-4 rounded-xl hover:bg-surface-container-lowest transition-colors shadow-sm uppercase tracking-wider"
              >
                Присъедини се сега
              </a>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-surface font-body-md text-body-md pb-24 md:pb-8 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col items-center gap-4 text-center mt-12 border-t border-outline-variant/20">
          <div className="text-primary font-headline-md mb-2">{profile.displayName}</div>
          <p className="text-on-surface-variant text-sm">
            © {new Date().getFullYear()} {profile.displayName}. All Rights Reserved.
          </p>
        </footer>
      </main>
    </>
  );
}

function Bento({ profile, links }: { profile: Profile; links: Link[] }) {
  const featured = links.filter((l) => l.imageUrl);
  const standard = links.filter((l) => !l.imageUrl);

  const hasImages = featured.length > 0;
  const featuredLinks = hasImages ? featured : links.slice(0, 3);
  const standardLinks = hasImages ? standard : links.slice(3);

  const socials = [
    { name: "Instagram", icon: "photo_camera", url: profile.socialInstagram },
    { name: "Facebook", icon: "public", url: profile.socialFacebook },
    { name: "WhatsApp", icon: "chat", url: profile.socialWhatsapp },
    { name: "Viber", icon: "call", url: profile.socialViber },
  ].filter((s) => s.url);

  return (
    <>
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant flex items-center justify-center bg-surface-container">
              <Av p={profile} />
            </div>
            <h1 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
              {profile.displayName}
            </h1>
          </div>
          <button
            aria-label="Share"
            className="p-2 rounded-full hover:bg-surface-variant transition-colors text-primary scale-95"
          >
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </header>

      <main className="pt-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        {/* Intro */}
        <section className="text-center mb-12 flex flex-col items-center">
          {profile.bio && (
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-6 italic leading-relaxed">
              {profile.bio}
            </p>
          )}

          {socials.length > 0 && (
            <div className="flex gap-4 mb-8">
              {socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url!}
                  aria-label={s.name}
                  className="w-12 h-12 rounded-full bg-cream-surface soft-shadow flex items-center justify-center text-primary hover:-translate-y-1 transition-transform duration-300 border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined">{s.icon}</span>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Bento Grid Canvas */}
        <div className="bento-grid">
          {/* Card 0: Hero Card */}
          {featuredLinks[0] && (
            <div className="col-span-2 md:col-span-4 relative h-[60vh] md:h-[70vh] rounded-[2rem] overflow-hidden group soft-shadow block">
              {featuredLinks[0].imageUrl ? (
                <img
                  src={featuredLinks[0].imageUrl}
                  alt={featuredLinks[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-primary-container/20" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent z-10"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center z-20">
                <h2 className="font-display-lg text-display-lg text-on-primary mb-4 drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 leading-tight">
                  {featuredLinks[0].title}
                </h2>
                {featuredLinks[0].description && (
                  <p className="text-on-primary/80 max-w-md line-clamp-2 mb-3">{featuredLinks[0].description}</p>
                )}
                {featuredLinks[0].type === "EMAIL_CAPTURE" ? (
                  <div className="w-full max-w-sm mt-3" onClick={(e) => e.stopPropagation()}>
                    <EmailCapture linkId={featuredLinks[0].id} />
                  </div>
                ) : (
                  <a href={`/api/click/${featuredLinks[0].id}`} className="absolute inset-0 z-0" />
                )}
              </div>
            </div>
          )}

          {/* Card 1: Feature Card 1 */}
          {featuredLinks[1] && (
            <div className="col-span-2 md:col-span-2 relative h-80 rounded-[2rem] overflow-hidden group soft-shadow block bg-cream-surface">
              {featuredLinks[1].imageUrl ? (
                <img
                  src={featuredLinks[1].imageUrl}
                  alt={featuredLinks[1].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                />
              ) : (
                <div className="absolute inset-0 bg-surface-container" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-surface/10 p-6 flex flex-col justify-end z-10">
                <h3 className="font-headline-md text-headline-md text-primary mb-3">{featuredLinks[1].title}</h3>
                {featuredLinks[1].description && (
                  <p className="text-on-surface-variant text-sm mb-3 line-clamp-2">
                    {featuredLinks[1].description}
                  </p>
                )}
                {featuredLinks[1].type === "EMAIL_CAPTURE" ? (
                  <div onClick={(e) => e.stopPropagation()}>
                    <EmailCapture linkId={featuredLinks[1].id} />
                  </div>
                ) : (
                  <a
                    href={`/api/click/${featuredLinks[1].id}`}
                    className="inline-flex items-center justify-center bg-primary text-on-primary font-label-lg text-label-lg px-6 py-3 rounded-full w-max hover:bg-primary-container transition-colors shadow-sm"
                  >
                    ВИЖ ПОВЕЧЕ
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Card 2: Feature Card 2 */}
          {featuredLinks[2] && (
            <div className="col-span-1 md:col-span-1 relative h-80 organic-shape-1 overflow-hidden group soft-shadow block bg-surface-variant flex items-center justify-center p-4">
              {featuredLinks[2].imageUrl && (
                <img
                  src={featuredLinks[2].imageUrl}
                  alt={featuredLinks[2].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 mix-blend-multiply"
                />
              )}
              <div className="relative z-10 glass-overlay p-6 rounded-full text-center aspect-square flex flex-col items-center justify-center border border-on-primary/20">
                <span className="material-symbols-outlined text-primary mb-2 text-3xl">auto_awesome</span>
                <h3 className="font-headline-md text-headline-md text-primary leading-tight line-clamp-2">
                  {featuredLinks[2].title}
                </h3>
                {featuredLinks[2].type === "EMAIL_CAPTURE" ? (
                  <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                    <EmailCapture linkId={featuredLinks[2].id} />
                  </div>
                ) : (
                  <a href={`/api/click/${featuredLinks[2].id}`} className="absolute inset-0" />
                )}
              </div>
            </div>
          )}

          {/* Subsequent rotating templates */}
          {standardLinks.map((link, idx) => {
            const layoutIdx = idx % 3;
            if (layoutIdx === 0) {
              return (
                <div
                  key={link.id}
                  className="col-span-1 md:col-span-1 relative h-80 rounded-[2rem] overflow-hidden group soft-shadow block bg-cream-surface flex flex-col"
                >
                  <div className="h-1/2 w-full relative overflow-hidden">
                    {link.imageUrl ? (
                      <img
                        src={link.imageUrl}
                        alt={link.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary/30">link</span>
                      </div>
                    )}
                  </div>
                  <div className="h-1/2 p-5 flex flex-col justify-center bg-cream-surface relative z-10">
                    <h4 className="font-label-lg text-label-lg text-primary uppercase tracking-wider mb-1 line-clamp-1">
                      {link.title}
                    </h4>
                    {link.description && (
                      <p className="text-xs text-on-surface-variant line-clamp-2">{link.description}</p>
                    )}
                    {link.type === "EMAIL_CAPTURE" ? (
                      <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                        <EmailCapture linkId={link.id} />
                      </div>
                    ) : (
                      <a href={`/api/click/${link.id}`} className="absolute inset-0" />
                    )}
                  </div>
                </div>
              );
            } else if (layoutIdx === 1) {
              return (
                <div
                  key={link.id}
                  className="col-span-2 md:col-span-2 relative h-80 rounded-[2rem] overflow-hidden group soft-shadow block bg-cream-surface flex items-center pl-8"
                >
                  <div className="flex-1 pr-6 z-10">
                    <h4 className="font-headline-md text-headline-md text-primary mb-2 line-clamp-1">
                      {link.title}
                    </h4>
                    {link.description && (
                      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                        {link.description}
                      </p>
                    )}
                    {link.type === "EMAIL_CAPTURE" ? (
                      <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                        <EmailCapture linkId={link.id} />
                      </div>
                    ) : (
                      <a href={`/api/click/${link.id}`} className="absolute inset-0 z-0" />
                    )}
                  </div>
                  {link.imageUrl && (
                    <div className="w-40 h-40 rounded-full overflow-hidden mr-8 border border-outline-variant flex-shrink-0 relative z-10">
                      <img
                        src={link.imageUrl}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  key={link.id}
                  className="col-span-2 md:col-span-2 relative h-80 organic-shape-2 overflow-hidden group soft-shadow block bg-cream-surface"
                >
                  {link.imageUrl ? (
                    <img
                      src={link.imageUrl}
                      alt={link.title}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-primary/5" />
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                    <h4 className="font-display-lg text-headline-lg text-primary mb-2 line-clamp-1">
                      {link.title}
                    </h4>
                    {link.description && (
                      <p className="font-body-md text-on-surface-variant max-w-sm line-clamp-2">
                        {link.description}
                      </p>
                    )}
                    {link.type === "EMAIL_CAPTURE" ? (
                      <div className="w-full max-w-xs mt-3" onClick={(e) => e.stopPropagation()}>
                        <EmailCapture linkId={link.id} />
                      </div>
                    ) : (
                      <a href={`/api/click/${link.id}`} className="absolute inset-0" />
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* CTA Banner */}
        {profile.donationUrl && (
          <section className="relative my-24 rounded-[3rem] overflow-hidden group soft-shadow">
            <div className="absolute inset-0 bg-primary opacity-90 mix-blend-luminosity"></div>
            <div className="relative z-10 py-24 px-8 md:px-16 text-center flex flex-col items-center glass-overlay rounded-[3rem] m-4 md:m-8 border border-surface/20">
              <h2 className="font-display-lg text-display-lg text-on-primary mb-6">СТАНИ ЕДНА ОТ НАС</h2>
              <p className="font-body-lg text-body-lg text-surface-variant max-w-lg mb-10">
                Присъедини се към нашия екип и започни своето пътешествие в света на красотата и здравето.
              </p>
              <a
                href={profile.donationUrl}
                className="bg-surface text-primary font-label-lg text-label-lg uppercase px-8 py-4 rounded-full hover:bg-surface-variant transition-colors duration-300 shadow-lg flex items-center gap-2"
              >
                Кандидатствай сега
                <span className="material-symbols-outlined">arrow_outward</span>
              </a>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

function Wellness({ profile, links }: { profile: Profile; links: Link[] }) {
  const featured = links.filter((l) => l.imageUrl);
  const standard = links.filter((l) => !l.imageUrl);

  const finalFeatured = featured.length > 0 ? featured : links.slice(0, 1);
  const finalStandard = featured.length > 0 ? standard : links.slice(1);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-transparent flex items-center justify-between px-margin-mobile md:px-margin-desktop py-4 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant flex items-center justify-center">
            <Av p={profile} />
          </div>
          <h1 className="font-display-lg text-display-lg tracking-tight text-primary dark:text-primary-fixed-dim m-0 leading-none">
            {profile.displayName}
          </h1>
        </div>
        <button
          aria-label="Share"
          className="text-primary dark:text-primary-fixed-dim hover:opacity-80 transition-opacity scale-95 duration-200 p-2 rounded-full hover:bg-surface-container-low"
        >
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 md:pt-32 pb-12 gap-12">
        {/* Brutalist Hero section */}
        {finalFeatured[0] && (
          <section className="w-full relative flex flex-col items-center justify-center mb-12">
            <div className="w-full aspect-[4/5] md:aspect-[21/9] bg-surface-container-high relative overflow-hidden flex items-center justify-center border-2 border-primary">
              {finalFeatured[0].imageUrl ? (
                <img
                  src={finalFeatured[0].imageUrl}
                  alt={finalFeatured[0].title}
                  className="w-full h-full object-cover mix-blend-multiply opacity-80 filter grayscale sepia-[.3] contrast-125"
                />
              ) : (
                <div className="absolute inset-0 bg-secondary-container/20" />
              )}
              <h2
                className="absolute inset-0 flex items-center justify-center font-display-lg text-[10vw] md:text-[6vw] leading-none text-primary uppercase mix-blend-color-burn font-bold tracking-tighter text-center z-10 px-4 pointer-events-none"
                style={{ textShadow: "2px 2px 0px #fbf9f4, -2px -2px 0px #fbf9f4" }}
              >
                {finalFeatured[0].title}
              </h2>
              {finalFeatured[0].type === "EMAIL_CAPTURE" ? (
                <div className="absolute bottom-6 inset-x-0 max-w-sm mx-auto px-4 z-20">
                  <EmailCapture linkId={finalFeatured[0].id} />
                </div>
              ) : (
                <a href={`/api/click/${finalFeatured[0].id}`} className="absolute inset-0" />
              )}
            </div>
            {profile.bio && (
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl text-center mt-8 px-4 leading-relaxed">
                {profile.bio}
              </p>
            )}
          </section>
        )}

        {/* Dynamic brutalist cards */}
        {finalStandard.length > 0 && (
          <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {finalStandard.map((link) => {
              if (link.type === "EMAIL_CAPTURE") {
                return (
                  <div
                    key={link.id}
                    className="relative w-full bg-cream-surface border-2 border-primary p-6 flex flex-col justify-between min-h-[160px]"
                  >
                    <div>
                      <h3 className="font-headline-md text-headline-md text-primary uppercase mb-2">
                        {link.title}
                      </h3>
                      {link.description && (
                        <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">
                          {link.description}
                        </p>
                      )}
                    </div>
                    <EmailCapture linkId={link.id} />
                  </div>
                );
              }

              return (
                <a
                  key={link.id}
                  href={`/api/click/${link.id}`}
                  className="group relative w-full bg-cream-surface border-2 border-primary p-6 flex flex-col justify-between min-h-[160px] hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1e0f0b] transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline-md text-headline-md text-primary uppercase group-hover:underline leading-tight line-clamp-2">
                      {link.title}
                    </h3>
                    <span className="material-symbols-outlined text-primary text-3xl">arrow_outward</span>
                  </div>
                  {link.description && (
                    <p className="font-body-md text-body-md text-on-surface-variant mt-4 line-clamp-2">
                      {link.description}
                    </p>
                  )}
                </a>
              );
            })}
          </section>
        )}

        {/* Join button */}
        {profile.donationUrl && (
          <section className="w-full max-w-4xl text-center py-12 border-y-2 border-primary mt-12 bg-surface-container-low px-4">
            <h2 className="font-display-lg text-[6vw] md:text-[3vw] text-primary uppercase font-bold tracking-tighter mb-4">
              СТАНИ ЕДНА ОТ НАС
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-md mx-auto">
              Развивай се с нас, израствай в красотата и постигай финансова свобода.
            </p>
            <a
              href={profile.donationUrl}
              className="inline-block bg-primary text-on-primary border-2 border-primary font-label-lg text-label-lg uppercase px-12 py-4 hover:bg-transparent hover:text-primary transition-colors duration-200 shadow-[4px_4px_0px_#C7B98B]"
            >
              Кандидатствай сега
            </a>
          </section>
        )}
      </main>

      <footer className="font-body-md text-body-md text-on-surface flex flex-col items-center gap-4 py-12 px-margin-mobile w-full mt-auto mb-20 md:mb-0 border-t border-primary/10">
        <div className="font-headline-md text-headline-md text-primary mb-2">{profile.displayName}</div>
        <p className="text-on-surface-variant mt-2 text-sm">
          © {new Date().getFullYear()} {profile.displayName}. All rights reserved.
        </p>
      </footer>
    </>
  );
}

function Masonry({ profile, links }: { profile: Profile; links: Link[] }) {
  const featured = links.filter((l) => l.imageUrl);
  const standard = links.filter((l) => !l.imageUrl);

  const hasImages = featured.length > 0;
  const masonryLinks = hasImages ? featured : links;
  const standardLinks = hasImages ? standard : [];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-transparent transition-all duration-300" id="main-header">
        <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop py-4 w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant flex items-center justify-center bg-surface-container">
              <Av p={profile} />
            </div>
            <span className="text-sm font-semibold tracking-wider uppercase text-primary">
              {profile.displayName}
            </span>
          </div>
          <button className="text-primary hover:opacity-80 transition-opacity p-2 rounded-full">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        {/* Title */}
        <section className="mb-16 md:mb-24 text-center mt-8">
          <h1 className="font-display-lg text-display-lg text-primary tracking-tight mb-4">
            {profile.displayName}
          </h1>
          {profile.bio && (
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed">
              {profile.bio}
            </p>
          )}
          <div className="h-px w-24 bg-outline-variant mx-auto"></div>
        </section>

        {/* Editorial Masonry Grid */}
        <div className="editorial-masonry">
          {masonryLinks.map((link) => (
            <article
              key={link.id}
              className="masonry-item relative group overflow-hidden bg-cream-surface rounded-lg shadow-[0px_4px_20px_rgba(30,15,11,0.05)] transition-all duration-300 hover:shadow-[0px_8px_30px_rgba(30,15,11,0.08)] mb-6 break-inside-avoid"
            >
              {link.imageUrl ? (
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={link.imageUrl}
                    alt={link.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="p-8 bg-surface-container flex items-center justify-center aspect-[4/3]">
                  <span className="material-symbols-outlined text-primary/30 text-4xl">grade</span>
                </div>
              )}
              <div className="p-6">
                <h3 className="font-headline-md text-headline-sm text-primary mb-2 line-clamp-1">{link.title}</h3>
                {link.description && (
                  <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">{link.description}</p>
                )}
                {link.type === "EMAIL_CAPTURE" ? (
                  <EmailCapture linkId={link.id} />
                ) : (
                  <a
                    href={`/api/click/${link.id}`}
                    className="font-label-lg text-label-lg text-primary flex items-center gap-1 uppercase tracking-wider hover:text-secondary transition-colors"
                  >
                    Виж повече <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Standard links fallback */}
        {standardLinks.length > 0 && (
          <section className="mt-16 flex flex-col gap-4 max-w-xl mx-auto">
            {standardLinks.map((link) => {
              if (link.type === "EMAIL_CAPTURE") {
                return (
                  <div key={link.id} className="p-5 bg-cream-surface border border-outline-variant rounded-lg">
                    <strong className="font-headline-sm text-primary block mb-2">{link.title}</strong>
                    {link.description && (
                      <p className="text-xs text-on-surface-variant mb-3">{link.description}</p>
                    )}
                    <EmailCapture linkId={link.id} />
                  </div>
                );
              }

              return (
                <a
                  key={link.id}
                  href={`/api/click/${link.id}`}
                  className="flex justify-between items-center p-4 bg-cream-surface border border-outline-variant rounded-lg hover:border-secondary transition-all"
                >
                  <span className="font-label-md text-primary font-semibold uppercase">{link.title}</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              );
            })}
          </section>
        )}

        {/* Join block */}
        {profile.donationUrl && (
          <section className="relative rounded-lg overflow-hidden border border-outline-variant group mt-24 max-w-4xl mx-auto">
            <div className="aspect-[16/9] w-full relative">
              <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] z-10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 gap-6">
                <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-tertiary">СТАНИ ЕДНА ОТ НАС</h2>
                <a
                  href={profile.donationUrl}
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-secondary transition-colors border border-outline/30 shadow-sm uppercase tracking-wider"
                >
                  Присъедини се сега
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="w-full relative border-t border-outline-variant flex flex-col items-center gap-4 py-12 px-margin-mobile mt-auto bg-surface pb-24 md:pb-12">
        <div className="font-headline-md text-headline-md text-primary mb-2">{profile.displayName}</div>
        <p className="text-on-surface-variant text-sm">
          © {new Date().getFullYear()} {profile.displayName}. All rights reserved.
        </p>
      </footer>
    </>
  );
}

function Blobs({ profile, links }: { profile: Profile; links: Link[] }) {
  const featured = links.filter((l) => l.imageUrl);
  const standard = links.filter((l) => !l.imageUrl);

  const finalFeatured = featured.length > 0 ? featured : links.slice(0, 3);
  const finalStandard = featured.length > 0 ? standard : links.slice(3);

  const socials = [
    { name: "Instagram", icon: "favorite", url: profile.socialInstagram },
    { name: "Facebook", icon: "spa", url: profile.socialFacebook },
    { name: "WhatsApp", icon: "chat", url: profile.socialWhatsapp },
    { name: "Viber", icon: "call", url: profile.socialViber },
  ].filter((s) => s.url);

  return (
    <>
      <header className="hidden md:flex items-center justify-between px-margin-desktop py-4 w-full fixed top-0 z-50 bg-transparent transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant flex items-center justify-center bg-surface-container">
            <Av p={profile} />
          </div>
          <h1 className="font-display-lg text-headline-lg tracking-tight text-primary">
            {profile.displayName}
          </h1>
        </div>
        <button className="text-primary hover:opacity-80 transition-opacity scale-95 duration-200">
          <span className="material-symbols-outlined text-2xl">share</span>
        </button>
      </header>

      <main className="w-full max-w-container-max px-margin-mobile md:px-margin-desktop pt-12 md:pt-32 pb-24 relative flex flex-col items-center mx-auto">
        {/* Floating background decorative blobs */}
        <div className="absolute top-20 left-[-10%] w-64 h-64 bg-secondary-container opacity-40 organic-blob-1 -z-10 blur-xl mix-blend-multiply"></div>
        <div className="absolute top-1/3 right-[-5%] w-80 h-80 bg-tertiary-container opacity-30 organic-blob-2 -z-10 blur-2xl mix-blend-multiply"></div>

        {/* Profile identity */}
        <section className="flex flex-col items-center text-center mb-16 relative w-full max-w-2xl">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-soft-gold opacity-20 rounded-full scale-110 organic-blob-1 animate-pulse" />
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden organic-blob-2 shadow-lg relative z-10 border-4 border-surface flex items-center justify-center bg-surface-container">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-2">
            {profile.displayName}
          </h1>
          {profile.bio && (
            <p className="font-body-md text-on-surface-variant max-w-md mx-auto mb-6 leading-relaxed">
              {profile.bio}
            </p>
          )}

          {/* Socials floating icons */}
          {socials.length > 0 && (
            <div className="flex gap-4">
              {socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url!}
                  aria-label={s.name}
                  className="text-outline cursor-pointer hover:text-primary transition-colors flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Dynamic products blob grid */}
        {finalFeatured.length > 0 && (
          <section className="w-full flex flex-col gap-12 max-w-4xl z-10 mb-20">
            {finalFeatured.map((link, idx) => {
              const shapes = ["organic-blob-1", "organic-blob-2", "organic-blob-1"];
              const shapeClass = shapes[idx % shapes.length];
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={link.id}
                  className={`backdrop-blur-xl bg-surface/75 rounded-3xl p-8 flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 items-center w-full shadow-lg border border-surface-container-high transition-transform duration-300 hover:scale-[1.01]`}
                >
                  {link.imageUrl ? (
                    <div
                      className={`w-full md:w-1/2 aspect-square max-w-[320px] ${shapeClass} overflow-hidden shadow-md flex-shrink-0`}
                    >
                      <img
                        src={link.imageUrl}
                        alt={link.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-full md:w-1/2 aspect-square max-w-[320px] ${shapeClass} bg-surface-container flex items-center justify-center flex-shrink-0 shadow-sm`}
                    >
                      <span className="material-symbols-outlined text-primary/30 text-5xl">spa</span>
                    </div>
                  )}
                  <div className="flex-1 text-center md:text-left flex flex-col justify-center">
                    <h2 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-3">
                      {link.title}
                    </h2>
                    {link.description && (
                      <p className="text-on-surface-variant font-body-md text-body-md mb-6 leading-relaxed">
                        {link.description}
                      </p>
                    )}
                    {link.type === "EMAIL_CAPTURE" ? (
                      <EmailCapture linkId={link.id} />
                    ) : (
                      <a
                        href={`/api/click/${link.id}`}
                        className="inline-flex items-center justify-center bg-primary text-on-primary font-label-lg text-label-lg px-8 py-3 rounded-full hover:bg-secondary transition-colors uppercase tracking-wider w-max mx-auto md:mx-0 shadow-sm"
                      >
                        Виж повече
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Standard links list */}
        {finalStandard.length > 0 && (
          <section className="w-full flex flex-col gap-4 max-w-xl z-10 mb-20">
            {finalStandard.map((link) => {
              if (link.type === "EMAIL_CAPTURE") {
                return (
                  <div
                    key={link.id}
                    className="p-5 rounded-2xl bg-surface/85 backdrop-blur-xl border border-surface-container-high shadow-sm"
                  >
                    <strong className="font-headline-sm text-primary block mb-2">{link.title}</strong>
                    {link.description && (
                      <p className="text-xs text-on-surface-variant mb-3">{link.description}</p>
                    )}
                    <EmailCapture linkId={link.id} />
                  </div>
                );
              }

              return (
                <a
                  key={link.id}
                  href={`/api/click/${link.id}`}
                  className="flex justify-between items-center w-full py-5 px-6 rounded-2xl bg-surface/85 backdrop-blur-xl hover:bg-cream-surface transition-colors shadow-sm border border-surface-container-high group"
                >
                  <span className="font-headline-sm text-primary font-semibold leading-none">
                    {link.title}
                  </span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                    arrow_forward
                  </span>
                </a>
              );
            })}
          </section>
        )}

        {/* CTA Section */}
        {profile.donationUrl && (
          <section className="relative rounded-[3rem] overflow-hidden group shadow-lg w-full max-w-4xl z-10 bg-surface-container-high border border-surface-container-high mb-16">
            <div className="absolute inset-0 bg-primary opacity-80 mix-blend-multiply pointer-events-none"></div>
            <div className="relative z-10 py-16 px-8 md:px-16 text-center flex flex-col items-center glass-overlay rounded-[3rem] m-4 md:m-8 border border-surface/20">
              <h2 className="font-headline-lg text-primary text-white mb-4">СТАНИ ЕДНА ОТ НАС</h2>
              <p className="font-body-md text-on-surface-variant text-white/90 max-w-md mb-8 leading-relaxed">
                Свържи се с мен за допълнителна информация относно членство, продукти и бизнес възможности.
              </p>
              <a
                href={profile.donationUrl}
                className="bg-surface text-primary font-label-lg text-label-lg uppercase px-8 py-3 rounded-full hover:bg-cream-surface transition-colors shadow-md inline-flex items-center gap-1"
              >
                Присъедини се сега
              </a>
            </div>
          </section>
        )}
      </main>

      <footer className="flex flex-col items-center gap-4 py-12 px-margin-mobile w-full mt-auto border-t border-outline-variant bg-surface relative z-10 mb-20 md:mb-0">
        <h2 className="font-headline-md text-primary">{profile.displayName}</h2>
        <p className="font-body-md text-on-surface-variant mt-2 text-sm opacity-70">
          © {new Date().getFullYear()} {profile.displayName}. All rights reserved.
        </p>
      </footer>
    </>
  );
}

function FullGlass({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen py-16 px-margin-mobile flex flex-col items-center justify-center relative">
      {/* Dynamic flowing gradient background overlay applied in container */}
      <div className="w-full max-w-md flex flex-col items-center gap-10 relative z-10">
        {/* Header */}
        <header className="flex flex-col items-center text-center space-y-4 w-full">
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/40">
            <Av p={profile} />
          </div>
          <div className="space-y-1">
            <h1 className="font-headline-lg text-headline-lg text-primary font-bold">{profile.displayName}</h1>
            {profile.bio && (
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto italic">
                {profile.bio}
              </p>
            )}
          </div>
        </header>

        {/* Links Grid */}
        <div className="w-full flex flex-col gap-4">
          {links.map((link) => {
            if (link.type === "EMAIL_CAPTURE") {
              return (
                <div
                  key={link.id}
                  className="w-full p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg"
                >
                  <strong className="font-headline-sm text-primary block mb-2">{link.title}</strong>
                  {link.description && (
                    <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                      {link.description}
                    </p>
                  )}
                  <EmailCapture linkId={link.id} />
                </div>
              );
            }

            return (
              <a
                key={link.id}
                href={`/api/click/${link.id}`}
                className="w-full p-5 rounded-2xl bg-white/25 hover:bg-white/35 backdrop-blur-md border border-white/45 shadow-md flex items-center gap-4 transition-all duration-300 hover:scale-[1.01]"
              >
                {link.imageUrl && (
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                    <img src={link.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <strong className="font-headline-sm text-primary text-[1.05rem] block">{link.title}</strong>
                  {link.description && (
                    <span className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">
                      {link.description}
                    </span>
                  )}
                </div>
                <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
              </a>
            );
          })}
        </div>

        {/* Optional Action Card */}
        {profile.donationUrl && (
          <a
            href={profile.donationUrl}
            className="w-full py-4 rounded-2xl bg-primary text-on-primary text-center font-label-lg text-label-lg uppercase tracking-wider shadow-lg hover:opacity-95 transition-opacity mt-4 block"
          >
            Свържи се с мен
          </a>
        )}

        {/* Footer */}
        <footer className="py-8 text-center text-xs text-on-surface-variant/80">
          © {new Date().getFullYear()} {profile.displayName}. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}

function Neumorph({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen py-16 px-margin-mobile flex flex-col items-center bg-[#eae1d9] dark:bg-background">
      <div className="w-full max-w-md flex flex-col items-center gap-10">
        {/* Header */}
        <header className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center p-1 bg-background shadow-[6px_6px_12px_#cac2ba,-6px_-6px_12px_#ffffff] border border-white/10">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-background">
              <Av p={profile} />
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="font-headline-lg text-headline-lg text-primary font-bold">{profile.displayName}</h1>
            {profile.bio && (
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">
                {profile.bio}
              </p>
            )}
          </div>
        </header>

        {/* Neumorphic lists */}
        <div className="w-full flex flex-col gap-6">
          {links.map((link) => {
            if (link.type === "EMAIL_CAPTURE") {
              return (
                <div
                  key={link.id}
                  className="w-full p-6 rounded-2xl bg-[#eae1d9] dark:bg-background shadow-[6px_6px_12px_#cac2ba,-6px_-6px_12px_#ffffff] border border-white/5"
                >
                  <strong className="font-headline-sm text-primary block mb-2">{link.title}</strong>
                  {link.description && (
                    <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                      {link.description}
                    </p>
                  )}
                  <EmailCapture linkId={link.id} />
                </div>
              );
            }

            return (
              <a
                key={link.id}
                href={`/api/click/${link.id}`}
                className="w-full p-5 rounded-2xl bg-[#eae1d9] dark:bg-background shadow-[4px_4px_8px_#cac2ba,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_5px_#cac2ba,inset_-2px_-2px_5px_#ffffff] border border-white/5 flex items-center gap-4 transition-all duration-200"
              >
                {link.imageUrl && (
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-inner border border-white/10">
                    <img src={link.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <strong className="font-headline-sm text-primary text-[1rem] block">{link.title}</strong>
                  {link.description && (
                    <span className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">
                      {link.description}
                    </span>
                  )}
                </div>
                <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        {profile.donationUrl && (
          <a
            href={profile.donationUrl}
            className="w-full py-4 rounded-2xl bg-[#eae1d9] dark:bg-background text-primary font-semibold text-center shadow-[4px_4px_8px_#cac2ba,-4px_-4px_8px_#ffffff] active:shadow-[inset_2px_2px_5px_#cac2ba,inset_-2px_-2px_5px_#ffffff] transition-all uppercase tracking-wider text-sm mt-4 block"
          >
            Свържи се с мен
          </a>
        )}

        {/* Footer */}
        <footer className="py-8 text-center text-xs text-on-surface-variant/80">
          © {new Date().getFullYear()} {profile.displayName}. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}

function LinkBio1({ profile, links }: { profile: Profile; links: Link[] }) {
  const socials = [
    { name: "Instagram", icon: "photo_camera", url: profile.socialInstagram },
    { name: "Facebook", icon: "public", url: profile.socialFacebook },
    { name: "WhatsApp", icon: "chat", url: profile.socialWhatsapp },
    { name: "Viber", icon: "call", url: profile.socialViber },
  ].filter((s) => s.url);

  return (
    <div className="min-h-screen py-16 px-margin-mobile flex flex-col items-center justify-center relative">
      {/* Layout uses top gradient flow details */}
      <div className="w-full max-w-md flex flex-col items-center gap-10 relative z-10 mx-auto">
        {/* Header */}
        <header className="flex flex-col items-center text-center space-y-4 pt-8">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white flex items-center justify-center bg-surface-container">
            <Av p={profile} />
          </div>
          <div className="space-y-1">
            <h1 className="font-headline-lg text-headline-lg text-primary font-bold">{profile.displayName}</h1>
            {profile.bio && (
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto italic">
                {profile.bio}
              </p>
            )}
          </div>
        </header>

        {/* Social Link block */}
        {socials.length > 0 && (
          <div className="flex gap-4">
            {socials.map((s, idx) => (
              <a
                key={idx}
                href={s.url!}
                className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md shadow-sm border border-white/50 flex items-center justify-center text-primary hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined">{s.icon}</span>
              </a>
            ))}
          </div>
        )}

        {/* Card Links */}
        <div className="w-full flex flex-col gap-4">
          {links.map((link) => {
            if (link.type === "EMAIL_CAPTURE") {
              return (
                <div
                  key={link.id}
                  className="w-full p-6 rounded-2xl bg-white/50 backdrop-blur-md border border-white/60 shadow-md"
                >
                  <strong className="font-headline-sm text-primary block mb-2">{link.title}</strong>
                  {link.description && (
                    <p className="text-xs text-on-surface-variant mb-4">{link.description}</p>
                  )}
                  <EmailCapture linkId={link.id} />
                </div>
              );
            }

            return (
              <a
                key={link.id}
                href={`/api/click/${link.id}`}
                className="w-full p-5 rounded-2xl bg-white/50 hover:bg-white/65 backdrop-blur-md border border-white/60 shadow-sm flex items-center gap-4 transition-all hover:scale-[1.01]"
              >
                {link.imageUrl && (
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-white/40">
                    <img src={link.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <strong className="font-headline-sm text-primary text-[1.02rem] block">{link.title}</strong>
                  {link.description && (
                    <span className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">
                      {link.description}
                    </span>
                  )}
                </div>
                <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        {profile.donationUrl && (
          <a
            href={profile.donationUrl}
            className="w-full py-4 rounded-2xl bg-primary text-on-primary text-center font-label-lg text-label-lg uppercase tracking-wider shadow-md hover:opacity-95 transition-opacity mt-4 block"
          >
            Свържи се с мен
          </a>
        )}

        {/* Footer */}
        <footer className="py-8 text-center text-xs text-on-surface-variant/80 w-full mt-auto">
          © {new Date().getFullYear()} {profile.displayName}. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}

function Clean({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <main className="min-h-screen py-16 px-margin-mobile flex flex-col items-center justify-center max-w-md mx-auto">
      {/* Header */}
      <header className="flex flex-col items-center text-center space-y-4 mb-10 w-full">
        <div className="w-16 h-16 rounded-full overflow-hidden border border-outline-variant flex items-center justify-center bg-surface-container shadow-sm">
          <Av p={profile} />
        </div>
        <div className="space-y-1">
          <h1 className="font-headline-md text-headline-md text-primary font-bold">{profile.displayName}</h1>
          {profile.bio && (
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto text-sm leading-relaxed">
              {profile.bio}
            </p>
          )}
        </div>
      </header>

      {/* Grid Links List */}
      <div className="w-full flex flex-col gap-3">
        {links.map((link) => {
          if (link.type === "EMAIL_CAPTURE") {
            return (
              <div key={link.id} className="w-full p-5 bg-white border border-outline-variant rounded-xl shadow-sm">
                <strong className="font-label-lg text-primary block mb-2">{link.title}</strong>
                {link.description && (
                  <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">{link.description}</p>
                )}
                <EmailCapture linkId={link.id} />
              </div>
            );
          }

          return (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="w-full p-4 bg-white border border-outline-variant rounded-xl shadow-sm flex items-center gap-4 hover:border-primary transition-colors hover:shadow-md"
            >
              {link.imageUrl ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-outline-variant shadow-sm">
                  <img src={link.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg flex-shrink-0 bg-surface-container flex items-center justify-center border border-outline-variant text-primary/30">
                  <span className="material-symbols-outlined text-xl">link</span>
                </div>
              )}
              <div className="flex-1">
                <strong className="text-primary text-[0.95rem] block">{link.title}</strong>
                {link.description && (
                  <span className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">{link.description}</span>
                )}
              </div>
              <span className="material-symbols-outlined text-outline-variant text-xl">chevron_right</span>
            </a>
          );
        })}
      </div>

      {/* Optional CTA */}
      {profile.donationUrl && (
        <a
          href={profile.donationUrl}
          className="w-full py-4 bg-primary text-on-primary text-center font-label-lg text-label-lg uppercase tracking-wider rounded-xl shadow-sm hover:opacity-95 transition-opacity mt-4 block"
        >
          Свържи се с мен
        </a>
      )}

      {/* Footer */}
      <footer className="py-12 text-center text-xs text-on-surface-variant/70 w-full mt-auto">
        © {new Date().getFullYear()} {profile.displayName}. All Rights Reserved.
      </footer>
    </main>
  );
}

/* ───────────────────────────────────────────────────────────
   BACKWARD COMPATIBLE & STANDALONE PLATFORM RENDERERS (Intact)
   ─────────────────────────────────────────────────────────── */

function OrganicElegance({ profile, links }: { profile: Profile; links: Link[] }) {
  const s = { boxShadow: "0 4px 20px rgba(30,15,11,0.05)" };
  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#1e0f0b] font-sans antialiased relative">
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#fbf9f4]/85 backdrop-blur-md border-b border-black/5 padding-12 px-6 py-3">
        <div className="max-w-[1200px] margin-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#d3c3bf] flex items-center justify-center bg-white">
            <Av p={profile} />
          </div>
          <h1 className="font-serif text-2xl font-bold">{profile.displayName}</h1>
        </div>
      </div>
      <div className="h-24" />
      <div className="max-w-[1200px] margin-auto px-6 py-6 flex flex-col gap-10">
        {profile.bio && (
          <div className="text-center mb-6">
            <p className="text-lg leading-relaxed text-[#4f4442] italic max-w-2xl mx-auto mb-6">{profile.bio}</p>
            <div className="flex justify-center gap-4">
              {["photo_camera", "play_arrow", "thumb_up", "chat"].map((icon) => (
                <div
                  key={icon}
                  style={s}
                  className="w-12 h-12 rounded-full bg-[#F2EFE9] flex items-center justify-center border border-[#d3c3bf]/30"
                >
                  <span className="material-symbols-outlined text-xl text-[#1e0f0b]">{icon}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {links.length > 0 && (
            <a
              href={`/api/click/${links[0].id}`}
              style={s}
              className="md:col-span-3 block relative min-h-[50vh] rounded-[2rem] overflow-hidden"
            >
              {links[0].imageUrl && (
                <img
                  src={links[0].imageUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e0f0b]/80 via-[#1e0f0b]/20 to-transparent flex flex-col justify-end items-center p-8 text-center">
                <h2 className="font-serif text-4xl md:text-5xl text-white mb-2 leading-tight">
                  {links[0].title}
                </h2>
              </div>
            </a>
          )}
          {links.length > 1 && (
            <a
              href={`/api/click/${links[1].id}`}
              style={s}
              className="md:col-span-2 block relative h-80 rounded-[2rem] overflow-hidden bg-[#F2EFE9]"
            >
              {links[1].imageUrl && (
                <img
                  src={links[1].imageUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#fbf9f4]/90 to-transparent flex flex-col justify-end p-6">
                <h3 className="font-serif text-2xl text-[#1e0f0b] mb-4">{links[1].title}</h3>
                <span className="inline-flex justify-center bg-[#1e0f0b] text-white px-6 py-3 rounded-full w-max text-xs font-bold uppercase tracking-wider">
                  ВИЖ ПОВЕЧЕ
                </span>
              </div>
            </a>
          )}
          {links.length > 2 && (
            <a
              href={`/api/click/${links[2].id}`}
              style={s}
              className="block relative h-80 organic-shape-1 overflow-hidden bg-[#F2EFE9]"
            >
              {links[2].imageUrl && (
                <img
                  src={links[2].imageUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
              )}
              <div className="relative z-10 bg-[#fbf9f4]/40 backdrop-blur-md rounded-full p-6 text-center w-[80%] h-[80%] m-[10%] flex flex-col items-center justify-center border border-[#1e0f0b]/15">
                <span className="material-symbols-outlined text-3xl mb-2 text-[#1e0f0b]">auto_awesome</span>
                <h3 className="font-serif text-xl text-[#1e0f0b] leading-snug">{links[2].title}</h3>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Pinterest({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-white font-sans antialiased pb-24">
      <div className="padding-24 py-8 text-center flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center bg-gray-50 mb-2">
          <Av p={profile} />
        </div>
        <h1 className="text-xl font-bold text-gray-900">{profile.displayName}</h1>
        {profile.bio && <p className="text-gray-500 text-sm">{profile.bio}</p>}
      </div>
      <div className="max-w-2xl mx-auto px-3 columns-2 md:columns-3 gap-3">
        {links.map((link) => (
          <a
            key={link.id}
            href={`/api/click/${link.id}`}
            className="block break-inside-avoid mb-3 rounded-2xl overflow-hidden relative bg-gray-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            {link.imageUrl && <img src={link.imageUrl} alt="" className="w-full display-block" />}
            <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white text-base">
              ♡
            </div>
            {!link.imageUrl && (
              <div className="p-4 min-h-[80px]">
                <strong className="text-xs text-gray-950 font-bold uppercase tracking-wider">{link.title}</strong>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

function Notes({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#fffef2] font-serif py-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl text-gray-800 font-bold mb-2">📝 {profile.displayName}</h1>
          {profile.bio && <p className="text-gray-500 italic text-sm">{profile.bio}</p>}
        </div>
        <div className="flex flex-col gap-1 border-t border-dashed border-gray-300">
          {links.map((link, i) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="flex items-start gap-3 py-4 border-b border-dashed border-gray-300 hover:bg-black/5 px-2 transition-all"
            >
              <span className="text-xl leading-none">{i % 3 === 0 ? "☐" : i % 3 === 1 ? "★" : "•"}</span>
              <div className="flex-1">
                <strong className="text-base text-gray-800 block font-bold leading-tight">{link.title}</strong>
                {link.description && <small className="text-gray-500 text-xs mt-1 block">{link.description}</small>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Twitter({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-black text-[#e7e9ea] font-sans">
      <div className="max-w-2xl mx-auto border-x border-[#2f3336] min-h-screen">
        <div className="flex items-start gap-4 p-4 border-b border-[#2f3336]">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1d9bf0] flex items-center justify-center bg-gray-800 flex-shrink-0">
            <Av p={profile} />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <strong className="font-bold text-base">{profile.displayName}</strong>
              <span className="bg-[#1d9bf0] text-white rounded-full w-[16px] h-[16px] flex items-center justify-center text-[9px] font-bold">
                ✓
              </span>
              <span className="text-[#71767b] text-sm ml-2">@{profile.displayName.toLowerCase().replace(/\s/g, "")}</span>
            </div>
            {profile.bio && <p className="text-[#e7e9ea] text-sm mt-1">{profile.bio}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-px bg-[#2f3336]">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="block p-4 bg-black hover:bg-white/5 transition-all text-[#e7e9ea]"
            >
              <div className="flex justify-between items-center">
                <strong className="font-bold text-base block">{link.title}</strong>
                <div className="flex gap-4 text-[#71767b] text-xs">
                  <span>💬 {Math.floor(Math.random() * 20)}</span>
                  <span>🔄 {Math.floor(Math.random() * 50)}</span>
                  <span>❤️ {Math.floor(Math.random() * 150)}</span>
                </div>
              </div>
              {link.description && <p className="text-[#71767b] text-xs mt-1">{link.description}</p>}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Netflix({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans pb-16">
      <div className="p-4 flex items-center gap-3 border-b border-white/5">
        <div className="w-10 h-10 rounded overflow-hidden flex items-center justify-center bg-[#e50914] flex-shrink-0 font-bold">
          <Av p={profile} />
        </div>
        <h1 className="text-xl font-black tracking-tight">{profile.displayName}</h1>
      </div>
      <div className="p-4 mt-4">
        {profile.bio && <p className="text-gray-400 text-sm mb-6 max-w-md">{profile.bio}</p>}
        <h2 className="text-lg font-bold mb-4">Препоръчано за Вас</h2>
        <div className="overflow-x-auto flex gap-4 pb-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="flex-shrink-0 w-44 rounded overflow-hidden bg-[#2f2f2f] hover:scale-105 transition-transform relative group block"
            >
              <div className="relative aspect-[2/3] bg-gray-800 flex items-center justify-center text-center">
                {link.imageUrl ? (
                  <img src={link.imageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <strong className="p-2 text-xs text-white">{link.title}</strong>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-[#e50914] flex items-center justify-center text-white text-xl">
                    ▶
                  </div>
                </div>
              </div>
              <p className="p-3 text-xs font-bold leading-tight line-clamp-2">{link.title}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Discord({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#313338] text-[#dbdee1] font-sans">
      <div className="max-w-2xl mx-auto border-x border-[#1e1f22] min-h-screen flex flex-col">
        <div className="p-4 border-b border-[#1e1f22] flex items-center gap-2">
          <span className="text-[#80848e] text-2xl font-bold">#</span>
          <h1 className="text-base font-bold text-white uppercase tracking-wider">
            {profile.displayName.toLowerCase().replace(/\s/g, "-")}
          </h1>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-4">
          {profile.bio && (
            <div className="flex items-start gap-4 pb-4 border-b border-[#1e1f22]">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#5865f2] flex items-center justify-center flex-shrink-0 text-white font-bold">
                <Av p={profile} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-white text-sm font-semibold">{profile.displayName}</strong>
                  <span className="text-[#80848e] text-xs">днес в {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, "0")}</span>
                </div>
                <p className="text-sm mt-1 leading-relaxed text-[#dbdee1]">{profile.bio}</p>
              </div>
            </div>
          )}
          {links.map((link, idx) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="flex items-start gap-4 p-2 rounded hover:bg-white/5 transition-colors group"
            >
              <span className="text-[#80848e] text-xs w-10 text-right pt-1 flex-shrink-0">
                {String(new Date().getHours()).padStart(2, "0")}:{String(Math.min(new Date().getMinutes() + idx * 3, 59)).padStart(2, "0")}
              </span>
              <div>
                <strong className="text-white text-sm font-semibold group-hover:underline block">{link.title}</strong>
                {link.imageUrl && (
                  <img src={link.imageUrl} alt="" className="max-w-[280px] rounded mt-2 border border-black/20" />
                )}
                {link.description && <p className="text-xs text-[#80848e] mt-1">{link.description}</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpotifyWrapped({ profile, links }: { profile: Profile; links: Link[] }) {
  const gradients = [
    "linear-gradient(135deg, #1db954 0%, #191414 100%)",
    "linear-gradient(135deg, #e91e63 0%, #ff9800 100%)",
    "linear-gradient(135deg, #3f51b5 0%, #00bcd4 100%)",
    "linear-gradient(135deg, #ff5722 0%, #ffc107 100%)",
  ];
  return (
    <div className="min-h-screen bg-[#191414] text-white font-sans pb-24">
      <div className="text-center py-16 px-4">
        <h1 className="text-xs tracking-[0.25em] text-white/50 uppercase font-black mb-4">Моят Топ Списък 2024</h1>
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#1db954] mx-auto mb-4 flex items-center justify-center bg-gray-900 shadow-md">
          <Av p={profile} />
        </div>
        <h2 className="text-3xl font-black tracking-tight">{profile.displayName}</h2>
        {profile.bio && <p className="text-white/60 text-sm mt-2">{profile.bio}</p>}
      </div>
      <div className="max-w-md mx-auto px-4 flex flex-col gap-4">
        {links.map((link, i) => (
          <a
            key={link.id}
            href={`/api/click/${link.id}`}
            style={{ background: gradients[i % gradients.length] }}
            className="block p-6 rounded-2xl relative overflow-hidden shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <div className="text-[10px] tracking-widest text-white/70 uppercase font-bold mb-1">№{i + 1} в моя списък</div>
            <strong className="text-2xl font-black block tracking-tight leading-tight">{link.title}</strong>
            {link.description && <p className="text-white/80 text-xs mt-2">{link.description}</p>}
            <div className="absolute right-[-10px] bottom-[-20px] text-white/10 text-9xl font-black select-none pointer-events-none">
              {i + 1}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function GitHub({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[#30363d] bg-gray-900 flex items-center justify-center flex-shrink-0">
            <Av p={profile} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">{profile.displayName}</h1>
            {profile.bio && <p className="text-[#8b949e] text-xs mt-0.5">{profile.bio}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="block p-4 rounded-md border border-[#30363d] bg-[#161b22] hover:border-[#8b949e] transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#8b949e] text-sm">📁</span>
                <strong className="text-[#58a6ff] text-sm font-semibold">{link.title}</strong>
                <span className="ml-auto border border-[#30363d] rounded-full px-2 py-0.5 text-[10px] text-[#8b949e] uppercase">
                  Public
                </span>
              </div>
              {link.description && <p className="text-[#8b949e] text-[11px] leading-relaxed line-clamp-3">{link.description}</p>}
              <div className="flex gap-4 mt-4 text-[10px] text-[#8b949e]">
                <span>⭐ {Math.floor(Math.random() * 500)}</span>
                <span>⑂ {Math.floor(Math.random() * 50)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Airbnb({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-white text-[#222222] font-sans pb-24">
      <div className="p-6 text-center border-b border-gray-100 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold">{profile.displayName}</h1>
        {profile.bio && <p className="text-gray-500 text-sm mt-1">{profile.bio}</p>}
      </div>
      <div className="max-w-2xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {links.map((link) => (
          <a key={link.id} href={`/api/click/${link.id}`} className="block group">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
              {link.imageUrl ? (
                <img src={link.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs font-bold p-3 text-center">{link.title}</div>
              )}
              <div className="absolute top-3 right-3 text-white text-2xl drop-shadow-md">♡</div>
            </div>
            {link.imageUrl && (
              <div className="py-2">
                <strong className="text-sm text-gray-900 block font-bold leading-snug">{link.title}</strong>
                {link.description && <span className="text-xs text-gray-500 mt-0.5 block">{link.description}</span>}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

function ChatGPT({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#343541] text-[#ececf1] font-sans">
      <div className="max-w-2xl mx-auto p-4 flex flex-col min-h-screen justify-between">
        <div className="flex-1">
          <div className="p-4 rounded-xl bg-[#444654] border border-white/5 flex gap-4 items-start mb-6">
            <div className="w-8 h-8 rounded bg-[#19c37d] flex items-center justify-center text-white text-base flex-shrink-0 shadow-sm font-bold">
              🤖
            </div>
            <div>
              <p className="text-sm leading-relaxed">
                Здравей! Аз съм дигиталният асистент на <strong className="text-[#19c37d] font-bold">{profile.displayName}</strong>. 
                Тук са събрани всички важни препратки и информация. Кликни на бутоните по-долу, за да разгледаш:
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <div key={link.id} className="p-4 rounded-xl bg-[#3e3f4b] hover:bg-[#4a4b57] transition-all border border-white/5 shadow-sm">
                <a href={`/api/click/${link.id}`} className="flex items-start gap-3">
                  <span className="text-[#19c37d] text-base leading-none">▸</span>
                  <div>
                    <strong className="text-sm text-[#ececf1] font-bold block">{link.title}</strong>
                    {link.description && <p className="text-xs text-[#8e8ea0] mt-1 leading-relaxed">{link.description}</p>}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="py-6 opacity-30 text-center text-xs tracking-wider flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-3 bg-[#ececf1] inline-block animate-pulse" /> Генериране на съдържание...
        </div>
      </div>
    </div>
  );
}

function Arcade({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#0a0a2e] text-[#0ff] font-mono py-12 px-4 select-none">
      <div className="max-w-lg mx-auto text-center border-4 border-[#f0f] bg-black/80 p-8 rounded-lg shadow-[0_0_20px_#f0f] relative overflow-hidden">
        {/* Retro scanlines effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-20" />
        
        <header className="mb-8 relative z-10">
          <div className="w-20 h-20 rounded-none border-4 border-[#f0f] mx-auto mb-4 p-1 bg-black shadow-[0_0_10px_#f0f] flex items-center justify-center">
            <div className="w-full h-full border-2 border-[#0ff] flex items-center justify-center overflow-hidden bg-gray-900">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-2xl font-black text-[#f0f] tracking-widest uppercase [text-shadow:3px_3px_0_#0ff] mb-2">
            {profile.displayName}
          </h1>
          {profile.bio && <p className="text-[#0ff] text-xs uppercase tracking-wider">{profile.bio}</p>}
          <div className="inline-block border-2 border-[#0ff] px-4 py-1 text-xs text-[#f0f] font-bold mt-4 [text-shadow:1px_1px_0_#0ff] tracking-widest">
            SCORE: {links.length.toString().padStart(6, "0")}
          </div>
        </header>

        <nav className="flex flex-col gap-3 relative z-10">
          {links.map((link, idx) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="flex items-center gap-3 p-4 border-2 border-[#f0f] bg-[#f0f]/5 hover:bg-[#0ff]/10 hover:border-[#0ff] transition-all text-[#0ff] [text-shadow:1px_1px_0_#000]"
            >
              <span className="text-xl">
                {idx % 5 === 0 ? "💎" : idx % 5 === 1 ? "👾" : idx % 5 === 2 ? "🕹" : idx % 5 === 3 ? "⭐" : "🎯"}
              </span>
              <div className="flex-1 text-left">
                <strong className="text-xs uppercase tracking-widest text-[#f0f] group-hover:text-[#0ff] block font-bold leading-tight">
                  {link.title}
                </strong>
                {link.description && <p className="text-[10px] text-[#0ff] lowercase mt-0.5">{link.description}</p>}
              </div>
              <span className="text-base">▶</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
