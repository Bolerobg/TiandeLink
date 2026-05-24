"use client";

import React, { useState, useEffect } from "react";
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
  theme?: any;
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

      {/* 2. Inject Tailwind CDN script (served locally to bypass adblockers) */}
      <script src="/tailwind.js"></script>

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

export function StitchTemplate({ template, profile: rawProfile, links }: { template: string; profile: Profile; links: Link[] }) {
  const normalizeViber = (viber: string | null | undefined): string => {
    if (!viber) return "";
    let val = viber.trim();
    if (val.startsWith("viber://")) return val;
    if (val.startsWith("http")) return val;
    let digits = val.replace(/\D/g, "");
    if (digits.startsWith("0") && digits.length === 10) {
      digits = "359" + digits.slice(1);
    }
    return `viber://chat?number=${digits}`;
  };

  const normalizeWhatsapp = (whatsapp: string | null | undefined): string => {
    if (!whatsapp) return "";
    let val = whatsapp.trim();
    if (val.startsWith("http")) return val;
    let digits = val.replace(/\D/g, "");
    if (digits.startsWith("0") && digits.length === 10) {
      digits = "359" + digits.slice(1);
    }
    return `https://wa.me/${digits}?text=${encodeURIComponent("Здравейте! Пиша Ви от SaasLink.")}`;
  };

  const normalizeInstagram = (instagram: string | null | undefined): string => {
    if (!instagram) return "";
    let val = instagram.trim();
    if (val.startsWith("http") || val.startsWith("//")) return val;
    if (val.startsWith("@")) val = val.slice(1);
    return `https://instagram.com/${val}`;
  };

  const normalizeFacebook = (facebook: string | null | undefined): string => {
    if (!facebook) return "";
    let val = facebook.trim();
    if (val.startsWith("http") || val.startsWith("//")) return val;
    return `https://facebook.com/${val}`;
  };

  const profile: Profile = {
    ...rawProfile,
    socialViber: normalizeViber(rawProfile.socialViber),
    socialWhatsapp: normalizeWhatsapp(rawProfile.socialWhatsapp),
    socialInstagram: normalizeInstagram(rawProfile.socialInstagram),
    socialFacebook: normalizeFacebook(rawProfile.socialFacebook),
  };

  const renderTemplate = () => {
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
    case "aurora_glow":
      return (
        <PremiumWrapper templateKey={null}>
          <AuroraGlow profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "clay_soft":
      return (
        <PremiumWrapper templateKey={null}>
          <ClaySoft profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "neo_brutal":
      return (
        <PremiumWrapper templateKey={null}>
          <NeoBrutal profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "vintage_paper":
      return (
        <PremiumWrapper templateKey={null}>
          <VintagePaper profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "cyber_hud":
      return (
        <PremiumWrapper templateKey={null}>
          <CyberHud profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "glass_obsidian":
      return (
        <PremiumWrapper templateKey={null}>
          <GlassObsidian profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "luxury_slate":
      return (
        <PremiumWrapper templateKey={null}>
          <LuxurySlate profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "synth_grid":
      return (
        <PremiumWrapper templateKey={null}>
          <SynthGrid profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "zen_linen":
      return (
        <PremiumWrapper templateKey={null}>
          <ZenLinen profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "halftone_pop":
      return (
        <PremiumWrapper templateKey={null}>
          <HalftonePop profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "metro_tiles":
      return (
        <PremiumWrapper templateKey={null}>
          <MetroTiles profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "frosted_ice":
      return (
        <PremiumWrapper templateKey={null}>
          <FrostedIce profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "neon_pulse":
      return (
        <PremiumWrapper templateKey={null}>
          <NeonPulse profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "polaroid_stack":
      return (
        <PremiumWrapper templateKey={null}>
          <PolaroidStack profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "notebook_doodle":
      return (
        <PremiumWrapper templateKey={null}>
          <NotebookDoodle profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "hologram_3d":
      return (
        <PremiumWrapper templateKey={null}>
          <Hologram3D profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "galaxy_cosmic":
      return (
        <PremiumWrapper templateKey={null}>
          <GalaxyCosmic profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "pop_comic":
      return (
        <PremiumWrapper templateKey={null}>
          <PopComic profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "avant_garde":
      return (
        <PremiumWrapper templateKey={null}>
          <AvantGarde profile={profile} links={links} />
        </PremiumWrapper>
      );
    case "minimal_luxury":
      return (
        <PremiumWrapper templateKey={null}>
          <MinimalLuxury profile={profile} links={links} />
        </PremiumWrapper>
      );
    default:
      return (
        <PremiumWrapper templateKey="_3">
          <LinkBio2 profile={profile} links={links} />
        </PremiumWrapper>
      );
    }
  };

  return (
    <>
      {renderTemplate()}
      <PremiumInteractiveEnhancer profile={profile} links={links} />
      <PremiumFloatingChatWidget profile={profile} />
    </>
  );
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

// ─────────────────────────────────────────────────────────────────────────────
// 20 NEW PREMIUM REACT TEMPLATES (HIGH-FIDELITY, MODERN WEB AESTHETICS)
// ─────────────────────────────────────────────────────────────────────────────

// 1. ✨ Aurora Glow
function AuroraGlow({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#07070d] text-white overflow-hidden relative py-16 px-4">
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .aurora-bg {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          mix-blend-mode: screen;
          animation: float-aurora 15s ease-in-out infinite alternate;
        }
        @keyframes float-aurora {
          0% { transform: translate(-50px, -50px) rotate(0deg); }
          100% { transform: translate(100px, 100px) rotate(360deg); }
        }
      ` }} />
      <div className="aurora-bg bg-[#a3e635] top-[-100px] left-[-100px]" />
      <div className="aurora-bg bg-[#06b6d4] bottom-[-100px] right-[-100px] [animation-delay:-5s]" />
      
      <div className="max-w-lg mx-auto relative z-10 font-['Outfit']">
        <header className="text-center mb-10">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border border-white/20 p-1 bg-white/5 backdrop-blur-md">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-zinc-900">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{profile.displayName}</h1>
          {profile.bio && <p className="text-zinc-400 text-sm font-light max-w-sm mx-auto">{profile.bio}</p>}
        </header>

        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#a3e635]/60 hover:bg-white/10 hover:scale-[1.01] transition-all duration-300 backdrop-blur-xl shadow-lg"
            >
              {link.imageUrl ? (
                <img src={link.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-xl">✨</div>
              )}
              <div className="flex-grow text-left">
                <strong className="block text-sm font-semibold text-white group-hover:text-[#a3e635] transition-colors">{link.title}</strong>
                {link.description && <p className="text-xs text-zinc-400 mt-0.5 font-light">{link.description}</p>}
              </div>
              <span className="text-[#a3e635] text-lg opacity-40 group-hover:opacity-100 transition-opacity">→</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 2. 🏺 Soft Claymorphism
function ClaySoft({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#f0f7ff] text-[#3b2314] py-16 px-4">
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .clay-card {
          background: #ffffff;
          border-radius: 28px;
          box-shadow: inset 3px 3px 6px #ffffff, inset -3px -3px 6px rgba(0,0,0,0.03), 8px 8px 24px rgba(0,0,0,0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .clay-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: inset 1px 1px 3px #ffffff, inset -1px -1px 3px rgba(0,0,0,0.03), 12px 12px 30px rgba(0,0,0,0.08);
        }
      ` }} />
      <div className="max-w-lg mx-auto font-['Quicksand']">
        <header className="text-center mb-12">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-[0_8px_16px_rgba(0,0,0,0.06)] flex items-center justify-center bg-white p-1">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#f0f7ff]">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">{profile.displayName}</h1>
          {profile.bio && <p className="text-[#3b2314]/70 text-sm max-w-sm mx-auto">{profile.bio}</p>}
        </header>

        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="clay-card p-5 flex items-center gap-4"
            >
              {link.imageUrl ? (
                <img src={link.imageUrl} alt="" className="w-14 h-14 rounded-2xl object-cover shadow-inner" />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-[#ffebf0] flex items-center justify-center text-2xl shadow-inner">🍭</div>
              )}
              <div className="flex-grow text-left">
                <strong className="block text-base font-bold text-[#3b2314]">{link.title}</strong>
                {link.description && <p className="text-xs text-[#3b2314]/65 mt-0.5 font-medium">{link.description}</p>}
              </div>
              <span className="text-[#ff6b6b] text-xl">➔</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 3. ⚡ Neo-Brutalism Retro
function NeoBrutal({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#fef08a] text-black py-16 px-4">
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;900&display=swap" rel="stylesheet" />
      <div className="max-w-lg mx-auto font-['Space+Grotesk']">
        <header className="text-center mb-12">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-[3px] border-black shadow-[4px_4px_0_0_#000] p-1 bg-white flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-yellow-100">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2 [text-shadow:2px_2px_0_#ff007f]">{profile.displayName}</h1>
          {profile.bio && (
            <div className="inline-block bg-white border-2 border-black px-4 py-1 shadow-[2px_2px_0_0_#000] text-xs font-semibold max-w-sm mx-auto">
              {profile.bio}
            </div>
          )}
        </header>

        <nav className="flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="flex items-center gap-4 p-4 border-[3px] border-black bg-white rounded-lg shadow-[5px_5px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#ff007f] transition-all duration-200"
            >
              {link.imageUrl ? (
                <img src={link.imageUrl} alt="" className="w-12 h-12 border-2 border-black object-cover" />
              ) : (
                <div className="w-12 h-12 border-2 border-black bg-[#ff007f] flex items-center justify-center text-xl font-bold">🏁</div>
              )}
              <div className="flex-grow text-left">
                <strong className="block text-base font-black uppercase tracking-wide">{link.title}</strong>
                {link.description && <p className="text-xs text-zinc-700 font-medium mt-0.5">{link.description}</p>}
              </div>
              <span className="font-black text-lg">▶</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 4. 📜 Vintage Journal
function VintagePaper({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#f5ece1] text-[#2c1d11] py-16 px-4">
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      <div className="max-w-lg mx-auto font-['EB_Garamond'] border border-[#2c1d11]/15 p-8 rounded-lg bg-[#fffbf7]/50 shadow-sm">
        <header className="text-center mb-12 border-b border-[#2c1d11]/10 pb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border border-[#2c1d11]/20 p-1 bg-white/30 flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#f5ece1]">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight italic mb-2">{profile.displayName}</h1>
          {profile.bio && <p className="text-[#2c1d11]/80 text-base italic max-w-sm mx-auto">{profile.bio}</p>}
        </header>

        <nav className="flex flex-col gap-6">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="group flex gap-4 border-b border-[#2c1d11]/20 pb-5 hover:border-[#1e3f20] transition-colors"
            >
              {link.imageUrl && (
                <img src={link.imageUrl} alt="" className="w-16 h-20 object-cover border border-[#2c1d11]/10 filter sepia-[0.25]" />
              )}
              <div className="flex-grow text-left">
                <strong className="block text-lg font-semibold group-hover:text-[#1e3f20] transition-colors leading-tight">{link.title}</strong>
                {link.description && <p className="text-sm text-[#2c1d11]/70 mt-1 italic leading-relaxed">{link.description}</p>}
              </div>
              <span className="self-center text-xs opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Виж</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 5. 📡 Cyber HUD
function CyberHud({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#030712] text-[#00f2fe] py-16 px-4 relative overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .scanlines {
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.25) 50%
          ), linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.06),
            rgba(0, 255, 0, 0.02),
            rgba(0, 0, 255, 0.06)
          );
          background-size: 100% 4px, 6px 100%;
        }
      ` }} />
      <div className="absolute inset-0 scanlines pointer-events-none opacity-50 z-20" />
      
      <div className="max-w-lg mx-auto font-['Share_Tech_Mono'] border border-[#00f2fe]/20 p-6 bg-black/60 shadow-[0_0_15px_rgba(0,242,254,0.1)] relative">
        <header className="text-center mb-8 border-b border-[#00f2fe]/20 pb-6">
          <div className="w-20 h-20 border border-[#00f2fe]/30 mx-auto mb-4 p-1 bg-black flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center overflow-hidden bg-cyan-950/20">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-wider text-white">[ {profile.displayName} ]</h1>
          {profile.bio && <p className="text-[#00f2fe]/60 text-xs mt-2 uppercase">{profile.bio}</p>}
        </header>

        <div className="text-xs uppercase tracking-widest text-[#00f2fe]/40 mb-4 flex justify-between">
          <span>// SYSTEM ACTIVE</span>
          <span>LINK_COUNT: {links.length}</span>
        </div>

        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="flex items-center gap-4 p-3 border border-[#00f2fe]/20 bg-[#00f2fe]/5 hover:bg-[#00f2fe]/10 hover:border-[#00f2fe] transition-all duration-200"
            >
              <div className="w-8 h-8 border border-[#00f2fe]/30 flex items-center justify-center text-sm">▶</div>
              <div className="flex-grow text-left">
                <strong className="block text-sm uppercase tracking-wide font-bold">{link.title}</strong>
                {link.description && <p className="text-[10px] text-[#00f2fe]/50 mt-0.5">{link.description}</p>}
              </div>
              <span className="text-[10px] opacity-40">GO//</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 6. 💎 Glass Obsidian
function GlassObsidian({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#020205] text-white py-16 px-4 relative overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@500;700;800&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .obsidian-card {
          background: rgba(10, 10, 20, 0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        .obsidian-card:hover {
          border-color: rgba(217, 70, 239, 0.4);
          transform: translateY(-2px);
        }
      ` }} />
      
      {/* Dark moving glow */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-indigo-900/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-fuchsia-900/10 blur-[90px] pointer-events-none" />

      <div className="max-w-lg mx-auto font-['Syne']">
        <header className="text-center mb-12">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border border-white/10 p-1 bg-white/5 backdrop-blur-md flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-zinc-950">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">{profile.displayName}</h1>
          {profile.bio && <p className="text-zinc-400 text-sm max-w-sm mx-auto font-light">{profile.bio}</p>}
        </header>

        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="obsidian-card p-5 flex items-center gap-4 rounded-2xl transition-all duration-300"
            >
              {link.imageUrl ? (
                <img src={link.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover filter brightness-95" />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center justify-center text-xl">🪐</div>
              )}
              <div className="flex-grow text-left">
                <strong className="block text-base font-bold text-white group-hover:text-fuchsia-400">{link.title}</strong>
                {link.description && <p className="text-xs text-zinc-400 mt-0.5">{link.description}</p>}
              </div>
              <span className="text-fuchsia-500 font-bold">→</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 7. ⚜️ Luxury Slate
function LuxurySlate({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#0f1115] text-[#dfcfbe] py-16 px-4">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;500&display=swap" rel="stylesheet" />
      <div className="max-w-lg mx-auto font-['Cormorant_Garamond'] border border-[#d4af37]/20 p-8 rounded-none bg-[#15181f] shadow-2xl relative">
        <div className="absolute inset-2 border border-[#d4af37]/10 pointer-events-none" />
        
        <header className="text-center mb-12">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border border-[#d4af37]/30 p-1 flex items-center justify-center bg-black/20">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-zinc-900">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-3xl font-medium tracking-widest uppercase text-white mb-2">{profile.displayName}</h1>
          {profile.bio && <p className="font-['Montserrat'] text-[10px] text-[#dfcfbe]/60 tracking-[0.2em] uppercase max-w-xs mx-auto mt-2 leading-relaxed">{profile.bio}</p>}
        </header>

        <nav className="flex flex-col gap-6">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="group flex gap-5 border-b border-[#d4af37]/10 pb-5 hover:border-[#d4af37] transition-all"
            >
              {link.imageUrl && (
                <img src={link.imageUrl} alt="" className="w-14 h-14 object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all border border-[#d4af37]/20" />
              )}
              <div className="flex-grow text-left">
                <strong className="block text-xl font-medium text-white group-hover:text-[#d4af37] transition-colors leading-tight">{link.title}</strong>
                {link.description && <p className="font-['Montserrat'] text-[10px] text-[#dfcfbe]/50 mt-1 tracking-wider">{link.description}</p>}
              </div>
              <span className="self-center text-sm font-light text-[#d4af37] opacity-60 group-hover:opacity-100 transition-opacity">✧</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 8. 👾 Synthwave Grid
function SynthGrid({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#0c011a] text-white py-16 px-4 relative overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .retro-grid {
          background-image: 
            linear-gradient(rgba(255, 0, 127, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 127, 0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          perspective: 200px;
          transform: rotateX(60deg);
        }
        .text-glow {
          text-shadow: 0 0 10px rgba(255, 0, 127, 0.6), 0 0 20px rgba(255, 0, 127, 0.3);
        }
      ` }} />
      
      {/* 3D Grid floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] retro-grid pointer-events-none z-0" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-t from-yellow-500 to-[#ff007f] opacity-20 filter blur-xl pointer-events-none" />

      <div className="max-w-lg mx-auto font-['Orbitron'] relative z-10">
        <header className="text-center mb-12">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-[#00ffff] p-1 bg-black/40 shadow-[0_0_15px_rgba(0,255,255,0.4)] flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-purple-950">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-3xl font-black uppercase text-white tracking-widest text-glow mb-2">{profile.displayName}</h1>
          {profile.bio && <p className="text-[#00ffff] text-xs uppercase tracking-wider">{profile.bio}</p>}
        </header>

        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="flex items-center gap-4 p-4 border border-[#ff007f] bg-purple-950/20 hover:bg-[#ff007f]/10 rounded-lg shadow-[0_0_10px_rgba(255,0,127,0.2)] hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:border-[#00ffff] transition-all duration-300"
            >
              <div className="text-2xl text-[#00ffff] group-hover:text-white">🚀</div>
              <div className="flex-grow text-left">
                <strong className="block text-sm font-bold uppercase tracking-wider text-white group-hover:text-[#00ffff]">{link.title}</strong>
                {link.description && <p className="text-[10px] text-zinc-400 mt-1 uppercase">{link.description}</p>}
              </div>
              <span className="text-[#ff007f] text-sm">&gt;&gt;</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 9. 🎋 Japanese Zen Sage
function ZenLinen({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#f2f0eb] text-[#2b2f29] py-16 px-4">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;500;600;700&family=Noto+Serif:ital,wght@1,400&display=swap" rel="stylesheet" />
      <div className="max-w-lg mx-auto font-['Plus_Jakarta_Sans']">
        <header className="text-center mb-16">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-5 border border-[#708238]/20 p-0.5 bg-white shadow-sm flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#f2f0eb]">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-wide text-zinc-800 mb-1">{profile.displayName}</h1>
          {profile.bio && <p className="font-['Noto_Serif'] text-sm text-zinc-500 italic max-w-sm mx-auto">{profile.bio}</p>}
        </header>

        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="flex items-center justify-between p-4 bg-white border border-[#2b2f29]/10 rounded-xl hover:border-[#708238] hover:bg-neutral-50/50 transition-all duration-300 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#708238]" />
                <div className="text-left">
                  <strong className="block text-sm font-semibold text-zinc-800">{link.title}</strong>
                  {link.description && <p className="text-xs text-zinc-500 mt-0.5">{link.description}</p>}
                </div>
              </div>
              <span className="text-[#708238] text-xs font-light">→</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 10. 🎨 Pop Art Halftone
function HalftonePop({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#1d4ed8] text-black py-16 px-4 relative overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .halftone-dots {
          background-image: radial-gradient(rgba(255,255,255,0.15) 15%, transparent 16%);
          background-size: 16px 16px;
        }
      ` }} />
      <div className="absolute inset-0 halftone-dots pointer-events-none" />
      
      <div className="max-w-lg mx-auto font-['Bangers'] relative z-10">
        <header className="text-center mb-12">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-black p-1 bg-yellow-400 shadow-[4px_4px_0_0_#ef4444] flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-blue-100">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-4xl tracking-widest text-yellow-400 uppercase [text-shadow:3px_3px_0_#000] mb-2">{profile.displayName}</h1>
          {profile.bio && (
            <span className="inline-block bg-white text-black border-3 border-black text-sm uppercase px-4 py-1.5 shadow-[3px_3px_0_0_#000] tracking-wide rotate-[-1deg]">
              {profile.bio}
            </span>
          )}
        </header>

        <nav className="flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="flex items-center gap-4 p-4 border-4 border-black bg-yellow-400 rounded-2xl shadow-[5px_5px_0_0_#ef4444] hover:bg-[#ef4444] hover:shadow-[5px_5px_0_0_#000] hover:text-white transition-all rotate-[1deg] hover:rotate-0"
            >
              {link.imageUrl ? (
                <img src={link.imageUrl} alt="" className="w-12 h-12 border-3 border-black object-cover" />
              ) : (
                <div className="w-12 h-12 border-3 border-black bg-[#ef4444] flex items-center justify-center text-xl font-bold">⭐</div>
              )}
              <div className="flex-grow text-left">
                <strong className="block text-xl uppercase tracking-wider leading-none mb-1">{link.title}</strong>
                {link.description && <p className="text-xs font-sans font-semibold text-black/80">{link.description}</p>}
              </div>
              <span className="text-2xl font-black uppercase">!</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 11. 🧱 Metro Tiles
function MetroTiles({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-black py-16 px-4">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      <div className="max-w-lg mx-auto font-['Inter']">
        <header className="text-left mb-10 pl-2">
          <div className="w-20 h-20 rounded-none overflow-hidden mb-4 border border-zinc-300 p-0.5 bg-white flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center overflow-hidden bg-zinc-200">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#2563eb]">{profile.displayName}</h1>
          {profile.bio && <p className="text-zinc-500 text-sm mt-1">{profile.bio}</p>}
        </header>

        <div className="grid grid-cols-2 gap-3">
          {links.map((link, idx) => {
            const bgClass = idx % 4 === 0 ? "bg-[#2563eb] text-white" : idx % 4 === 1 ? "bg-[#10b981] text-white" : idx % 4 === 2 ? "bg-[#f59e0b] text-white" : "bg-[#ec4899] text-white";
            return (
              <a
                key={link.id}
                href={`/api/click/${link.id}`}
                className={`group p-6 flex flex-col justify-between aspect-square ${bgClass} hover:opacity-95 hover:scale-[0.99] transition-all duration-200`}
              >
                <div className="text-2xl opacity-80 group-hover:scale-110 transition-transform w-8">📦</div>
                <div className="text-left mt-auto">
                  <strong className="block text-base font-extrabold uppercase tracking-wide leading-tight">{link.title}</strong>
                  {link.description && <p className="text-[10px] opacity-75 mt-1 font-medium line-clamp-2">{link.description}</p>}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 12. 🍧 Frosted Ice
function FrostedIce({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#e0f2fe] to-[#f3e8ff] text-slate-800 py-16 px-4 relative overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .frosted-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.04);
        }
        .frosted-card:hover {
          background: rgba(255, 255, 255, 0.6);
          border-color: rgba(219, 39, 119, 0.3);
          transform: scale(1.01);
        }
      ` }} />
      
      {/* Soft fluid circles */}
      <div className="absolute top-[10%] left-[-5%] w-80 h-80 rounded-full bg-pink-300/20 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 rounded-full bg-sky-300/20 filter blur-3xl pointer-events-none" />

      <div className="max-w-lg mx-auto font-['Outfit'] relative z-10">
        <header className="text-center mb-12">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border border-white p-1 bg-white/40 shadow-sm flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-sky-50">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-1">{profile.displayName}</h1>
          {profile.bio && <p className="text-slate-500 text-sm font-light max-w-sm mx-auto">{profile.bio}</p>}
        </header>

        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="frosted-card p-5 flex items-center gap-4 rounded-3xl transition-all duration-300"
            >
              {link.imageUrl ? (
                <img src={link.imageUrl} alt="" className="w-12 h-12 rounded-2xl object-cover border border-white" />
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-xl">🍧</div>
              )}
              <div className="flex-grow text-left">
                <strong className="block text-base font-semibold text-slate-800">{link.title}</strong>
                {link.description && <p className="text-xs text-slate-500 mt-0.5">{link.description}</p>}
              </div>
              <span className="text-[#db2777] font-semibold text-xl">›</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 13. 🔴 Neon Pulse
function NeonPulse({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white py-16 px-4">
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .neon-glow {
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.4), 0 0 20px rgba(239, 68, 68, 0.2);
        }
        .neon-border:hover {
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.7), 0 0 30px rgba(239, 68, 68, 0.4);
          border-color: #ef4444;
        }
      ` }} />
      <div className="max-w-lg mx-auto font-['Space_Mono']">
        <header className="text-center mb-12">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-red-500 p-1 bg-black shadow-[0_0_15px_rgba(239,68,68,0.5)] flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-neutral-900">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-white mb-2">{profile.displayName}</h1>
          {profile.bio && <p className="text-red-500 text-xs uppercase tracking-wide">{profile.bio}</p>}
        </header>

        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="neon-border flex items-center gap-4 p-4 border border-red-950 bg-black/60 rounded-xl transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-full border border-red-950 flex items-center justify-center text-red-500 animate-pulse font-bold">!</div>
              <div className="flex-grow text-left">
                <strong className="block text-sm uppercase font-bold tracking-wider">{link.title}</strong>
                {link.description && <p className="text-[10px] text-zinc-500 lowercase mt-0.5">{link.description}</p>}
              </div>
              <span className="text-red-500 font-bold">&gt;&gt;</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 14. 📸 Polaroid Stack
function PolaroidStack({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#eae3d2] text-[#1a1f2c] py-16 px-4 relative">
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .polaroid {
          background: #ffffff;
          padding: 10px 10px 24px 10px;
          box-shadow: 0px 4px 15px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.03);
          transition: all 0.3s ease;
        }
        .polaroid:nth-child(even) {
          transform: rotate(2deg);
        }
        .polaroid:nth-child(odd) {
          transform: rotate(-2deg);
        }
        .polaroid:hover {
          transform: scale(1.02) rotate(0deg);
          box-shadow: 0px 10px 25px rgba(0,0,0,0.1);
          z-index: 10;
        }
      ` }} />
      <div className="max-w-lg mx-auto font-['Caveat']">
        <header className="text-center mb-12">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border border-zinc-300 p-1 bg-white shadow-sm flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-zinc-100">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-1">{profile.displayName}</h1>
          {profile.bio && <p className="text-zinc-600 text-lg max-w-sm mx-auto leading-tight">{profile.bio}</p>}
        </header>

        <nav className="flex flex-col gap-6">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="polaroid block"
            >
              {link.imageUrl ? (
                <img src={link.imageUrl} alt="" className="w-full aspect-[4/3] object-cover filter brightness-[0.98] border border-zinc-100 mb-4" />
              ) : (
                <div className="w-full aspect-[16/9] bg-[#f8f9fa] border border-zinc-100 mb-4 flex items-center justify-center text-3xl">📷</div>
              )}
              <div className="text-center px-2">
                <strong className="block text-2xl font-bold tracking-wide leading-none mb-1 text-zinc-800">{link.title}</strong>
                {link.description && <p className="text-lg text-zinc-500">{link.description}</p>}
              </div>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 15. ✏️ Notebook Doodle
function NotebookDoodle({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#fcfcf7] text-[#1e3a8a] py-16 px-4 relative">
      <link href="https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .notebook-page {
          background-image: 
            linear-gradient(rgba(30,58,138,0.06) 1px, transparent 1px);
          background-size: 100% 28px;
          border-left: 2px solid rgba(220,38,38,0.2);
          padding-left: 20px;
        }
      ` }} />
      <div className="max-w-lg mx-auto font-['Architects_Daughter'] notebook-page relative min-h-[500px]">
        <header className="text-left mb-10 pt-4">
          <div className="w-20 h-20 rounded-xl overflow-hidden mb-4 border border-[#1e3a8a]/20 p-1 flex items-center justify-center bg-white">
            <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-sky-50">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-wide mb-1">~ {profile.displayName}</h1>
          {profile.bio && <p className="text-[#1e3a8a]/75 text-base max-w-sm mt-1 leading-relaxed">{profile.bio}</p>}
        </header>

        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="flex items-center gap-3 p-3 border border-[#1e3a8a]/20 rounded-xl bg-white hover:bg-neutral-50/50 hover:border-[#dc2626] transition-all hover:scale-[1.01] shadow-sm"
            >
              <div className="text-2xl text-[#dc2626]">✏️</div>
              <div className="flex-grow text-left">
                <strong className="block text-lg font-bold leading-tight">{link.title}</strong>
                {link.description && <p className="text-sm text-[#1e3a8a]/70 font-medium mt-0.5">{link.description}</p>}
              </div>
              <span className="text-xs opacity-50">#</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 16. 🌐 Hologram 3D
function Hologram3D({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#040c16] text-[#22d3ee] py-16 px-4 relative overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Teko:wght@400;600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .hologram-glow {
          text-shadow: 0 0 10px rgba(6,182,212,0.6), 0 0 20px rgba(6,182,212,0.3);
        }
        .holo-card {
          border: 1px solid rgba(34, 211, 238, 0.2);
          background: rgba(6, 182, 212, 0.03);
          box-shadow: inset 0 0 15px rgba(6, 182, 212, 0.05);
          transition: all 0.3s ease;
        }
        .holo-card:hover {
          border-color: rgba(34, 211, 238, 0.6);
          background: rgba(6, 182, 212, 0.08);
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.15);
          transform: translateY(-2px);
        }
      ` }} />
      
      {/* Sci-Fi horizontal scanline sweep */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-500/20 animate-[pulse_3s_infinite] pointer-events-none" />

      <div className="max-w-lg mx-auto font-['Teko'] relative z-10">
        <header className="text-center mb-10">
          <div className="w-20 h-20 border border-cyan-500/30 mx-auto mb-4 p-1 bg-black/60 shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center overflow-hidden bg-cyan-950/20">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-4xl font-bold uppercase tracking-wider text-white hologram-glow mb-1">{profile.displayName}</h1>
          {profile.bio && <p className="text-[#22d3ee]/60 text-lg uppercase tracking-widest">{profile.bio}</p>}
        </header>

        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="holo-card p-4 rounded flex items-center gap-4"
            >
              <div className="w-8 h-8 rounded border border-cyan-500/30 flex items-center justify-center text-lg hologram-glow">▲</div>
              <div className="flex-grow text-left font-sans tracking-wide">
                <strong className="block text-sm font-semibold uppercase text-white tracking-widest leading-none mb-1">{link.title}</strong>
                {link.description && <p className="text-[10px] text-cyan-400 font-medium">{link.description}</p>}
              </div>
              <span className="text-[#22d3ee] font-bold text-lg">&gt;</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 17. 🌌 Galaxy Cosmic
function GalaxyCosmic({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03001e] via-[#7303c0] to-[#ec38bc] text-white py-16 px-4 relative overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;800&family=Montserrat:wght@300;400&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .galaxy-glass {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 25px rgba(236, 56, 188, 0.15);
          transition: all 0.4s ease;
        }
        .galaxy-glass:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
        }
      ` }} />
      
      <div className="max-w-lg mx-auto font-['Montserrat'] relative z-10">
        <header className="text-center mb-14">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border border-white/20 p-1 bg-white/5 backdrop-blur-md flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-black/40">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="font-['Cinzel'] text-3xl font-bold tracking-widest text-white mb-2">{profile.displayName}</h1>
          {profile.bio && <p className="text-[#f472b6] text-xs uppercase tracking-widest mt-1 font-semibold">{profile.bio}</p>}
        </header>

        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="galaxy-glass p-5 rounded-[30px] flex items-center gap-4"
            >
              {link.imageUrl ? (
                <img src={link.imageUrl} alt="" className="w-12 h-12 rounded-full object-cover border border-white/20" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl">💫</div>
              )}
              <div className="flex-grow text-left">
                <strong className="font-['Cinzel'] block text-sm font-semibold text-white tracking-widest">{link.title}</strong>
                {link.description && <p className="text-[10px] text-pink-200 mt-1 font-light tracking-wide">{link.description}</p>}
              </div>
              <span className="text-white text-lg opacity-60 group-hover:opacity-100 transition-opacity">✦</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 18. 💥 Pop Comic
function PopComic({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#fcd34d] text-black py-16 px-4 relative overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .burst-badge {
          background: #e11d48;
          color: white;
          border: 3px solid black;
          transform: rotate(-5deg);
        }
        .pop-card {
          border: 4px solid black;
          box-shadow: 6px 6px 0px #000;
          transition: all 0.2s ease;
        }
        .pop-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 9px 9px 0px #e11d48;
        }
      ` }} />
      
      <div className="max-w-lg mx-auto font-['Bangers']">
        <header className="text-center mb-12">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-black p-1 bg-white shadow-[4px_4px_0_0_#000] flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-yellow-100">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-4xl tracking-widest text-[#e11d48] uppercase [text-shadow:3px_3px_0_#000] mb-2">{profile.displayName}</h1>
          {profile.bio && (
            <span className="burst-badge inline-block text-base uppercase px-5 py-1.5 shadow-[3px_3px_0_0_#000] tracking-widest font-black">
              💥 {profile.bio}
            </span>
          )}
        </header>

        <nav className="flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="pop-card flex items-center gap-4 p-4 bg-white rounded-none"
            >
              {link.imageUrl ? (
                <img src={link.imageUrl} alt="" className="w-12 h-12 border-3 border-black object-cover" />
              ) : (
                <div className="w-12 h-12 border-3 border-black bg-[#e11d48] flex items-center justify-center text-xl font-bold">🔥</div>
              )}
              <div className="flex-grow text-left">
                <strong className="block text-2xl uppercase tracking-wider mb-0.5 leading-none">{link.title}</strong>
                {link.description && <p className="text-xs font-sans font-semibold text-neutral-600">{link.description}</p>}
              </div>
              <span className="text-2xl font-black uppercase">!</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 19. 📐 Avant-Garde
function AvantGarde({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#edeae4] text-[#2a2d24] py-16 px-4">
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
      <div className="max-w-lg mx-auto font-['EB_Garamond']">
        <header className="text-left mb-16 pl-2">
          <div className="w-20 h-20 rounded-none overflow-hidden mb-6 border border-[#2a2d24] p-1 flex items-center justify-center bg-white shadow-sm">
            <div className="w-full h-full rounded-none overflow-hidden flex items-center justify-center bg-[#edeae4]">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#2a2d24] leading-none">{profile.displayName}</h1>
          {profile.bio && <p className="font-['Montserrat'] text-[10px] text-[#d97706] tracking-[0.25em] uppercase font-bold mt-3">{profile.bio}</p>}
        </header>

        <nav className="flex flex-col gap-6">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="flex gap-5 border border-[#2a2d24] p-5 bg-white hover:bg-[#2a2d24] hover:text-[#edeae4] transition-all duration-300 shadow-[-6px_6px_0px_rgba(42,45,36,0.1)] hover:shadow-[-8px_8px_0px_#d97706]"
            >
              {link.imageUrl && (
                <img src={link.imageUrl} alt="" className="w-14 h-16 object-cover border border-[#2a2d24]" />
              )}
              <div className="flex-grow text-left">
                <strong className="block text-xl font-bold tracking-tight leading-tight mb-1">{link.title}</strong>
                {link.description && <p className="font-['Montserrat'] text-[10px] tracking-wide opacity-70 leading-relaxed">{link.description}</p>}
              </div>
              <span className="self-center font-bold text-lg">➔</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// 20. 🏆 Minimal Luxury Gold
function MinimalLuxury({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1c1917] py-16 px-4 relative overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;500&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .gold-shimmer {
          background: linear-gradient(135deg, #b89047 0%, #eac775 50%, #b89047 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .luxury-card {
          border: 1px solid rgba(184, 144, 71, 0.15);
          background: #ffffff;
          box-shadow: 0 4px 30px rgba(184,144,71,0.03);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .luxury-card:hover {
          border-color: #b89047;
          box-shadow: 0 8px 30px rgba(184,144,71,0.08);
          transform: translateY(-2px);
        }
      ` }} />
      
      <div className="max-w-lg mx-auto font-['Playfair_Display']">
        <header className="text-center mb-16">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border border-[#b89047]/30 p-0.5 bg-white shadow-sm flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-zinc-50">
              <Av p={profile} />
            </div>
          </div>
          <h1 className="text-4xl font-normal italic text-[#b89047] font-['Great_Vibes'] leading-none mb-2">{profile.displayName}</h1>
          {profile.bio && <p className="font-['Montserrat'] text-[9px] text-[#1c1917]/60 tracking-[0.25em] uppercase max-w-xs mx-auto leading-relaxed mt-3">{profile.bio}</p>}
        </header>

        <nav className="flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className="luxury-card p-5 rounded-[24px] flex items-center gap-4"
            >
              {link.imageUrl ? (
                <img src={link.imageUrl} alt="" className="w-12 h-12 rounded-full object-cover border border-[#b89047]/20" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-lg text-[#b89047]">✧</div>
              )}
              <div className="flex-grow text-left">
                <strong className="block text-base font-medium text-zinc-950 hover:text-[#b89047] transition-colors leading-tight">{link.title}</strong>
                {link.description && <p className="font-['Montserrat'] text-[9px] text-stone-500 mt-1 font-light tracking-wide">{link.description}</p>}
              </div>
              <span className="text-[#b89047] text-lg font-light">✧</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   PREMIUM CLIENT-SIDE INTERACTIVE INTERCEPTORS
   ─────────────────────────────────────────────────────────── */

export function PremiumInteractiveEnhancer({ profile, links }: { profile: Profile; links: Link[] }) {
  useEffect(() => {
    // 1. Interactive Media Players (YouTube, Spotify, SoundCloud, Calendly)
    // 2. Reviews & Social Proof / Testimonials
    const anchorTags = document.querySelectorAll('a[href^="/api/click/"]');
    
    anchorTags.forEach((a) => {
      const href = a.getAttribute("href") || "";
      const match = href.match(/\/api\/click\/([a-zA-Z0-9_-]+)/);
      if (!match) return;
      
      const linkId = match[1];
      const link = links.find((l) => l.id === linkId);
      if (!link) return;
      
      // A. If it is an Embed
      const isSpotify = link.url.includes("spotify.com");
      const isYoutube = link.url.includes("youtube.com") || link.url.includes("youtu.be");
      const isSoundcloud = link.url.includes("soundcloud.com");
      const isCalendly = link.url.includes("calendly.com");
      
      if (isSpotify || isYoutube || isSoundcloud || isCalendly) {
        const div = document.createElement("div");
        div.className = "w-full my-4 rounded-3xl overflow-hidden shadow-xl border border-white/10 p-1 bg-white/5 backdrop-blur-md";
        
        let iframeSrc = "";
        let height = "152";
        
        if (isSpotify) {
          const spotifyMatch = link.url.match(/spotify\.com\/(?:embed\/)?(\w+)\/([\w]+)/);
          if (spotifyMatch) {
            iframeSrc = `https://open.spotify.com/embed/${spotifyMatch[1]}/${spotifyMatch[2]}`;
          } else {
            iframeSrc = link.url;
          }
        } else if (isYoutube) {
          const ytMatch = link.url.match(/youtu\.be\/([\w-]+)/) || link.url.match(/youtube\.com\/watch\?v=([\w-]+)/) || link.url.match(/youtube\.com\/embed\/([\w-]+)/) || link.url.match(/youtube\.com\/shorts\/([\w-]+)/);
          if (ytMatch) {
            iframeSrc = `https://www.youtube.com/embed/${ytMatch[1]}`;
            height = "240";
          }
        } else if (isSoundcloud) {
          iframeSrc = `https://w.soundcloud.com/player/?url=${encodeURIComponent(link.url)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
          height = "166";
        } else if (isCalendly) {
          iframeSrc = link.url;
          height = "480";
        }
        
        if (iframeSrc) {
          div.innerHTML = `
            <div class="text-xs font-semibold px-4 py-2.5 text-left opacity-80 flex items-center gap-2 border-b border-white/5 bg-white/5 text-white">
              <span>${isSpotify ? "🎵 Spotify" : isYoutube ? "🎥 YouTube" : isSoundcloud ? "☁️ SoundCloud" : "📅 Calendly"}</span>
              <span class="opacity-40">•</span>
              <span class="truncate flex-1">${link.title}</span>
            </div>
            <iframe 
              src="${iframeSrc}" 
              width="100%" 
              height="${height}" 
              frameborder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy" 
              class="w-full rounded-b-2xl"
              style="border: 0;"
            ></iframe>
          `;
          a.parentNode?.replaceChild(div, a);
        }
      }
      
      // B. If it's a Testimonial (type === 'TEXT')
      else if (link.type === "TEXT") {
        const div = document.createElement("div");
        const urlVal = link.url.trim();

        // 1. IMAGE GALLERY / SLIDER
        if (urlVal.startsWith("gallery:")) {
          const imageUrls = urlVal.substring(8).split(",").map(s => s.trim()).filter(Boolean);
          if (imageUrls.length === 0) {
            imageUrls.push(
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80"
            );
          }

          let dotsHtml = "";
          imageUrls.forEach((_, idx) => {
            dotsHtml += `
              <button data-slide="${idx}" class="w-2.5 h-2.5 rounded-full bg-white/${idx === 0 ? "80" : "30"} transition-all duration-300 hover:bg-white/60 focus:outline-none"></button>
            `;
          });

          div.className = "w-full my-4 p-4 rounded-[2rem] text-left border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg flex flex-col gap-3 relative overflow-hidden transition-all duration-300 hover:border-white/20";
          div.innerHTML = `
            ${link.title ? `<h3 class="text-sm font-semibold text-white/90 px-1 truncate">${link.title}</h3>` : ""}
            ${link.description ? `<p class="text-xs text-white/60 px-1 -mt-1 font-light leading-relaxed">${link.description}</p>` : ""}
            
            <div class="relative w-full overflow-hidden rounded-2xl bg-black/20" style="height: 12rem;">
              <!-- Slides Viewport Container -->
              <div class="slides-container flex w-full h-full transition-transform duration-500 ease-out" style="transform: translateX(0%);">
                ${imageUrls.map((img, idx) => `
                  <div class="w-full h-full flex-shrink-0 relative">
                    <img src="${img}" class="w-full h-full object-cover" alt="Slide ${idx + 1}" loading="lazy" />
                  </div>
                `).join("")}
              </div>
              
              <!-- Navigation Arrows -->
              <button class="prev-btn absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white/80 transition-all focus:outline-none">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button class="next-btn absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white/80 transition-all focus:outline-none">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            
            <!-- Dots Indicators -->
            <div class="dots-container flex justify-center gap-1.5 py-1">
              ${dotsHtml}
            </div>
          `;

          let activeIndex = 0;
          const container = div.querySelector(".slides-container") as HTMLElement;
          const dots = div.querySelectorAll("[data-slide]") as NodeListOf<HTMLElement>;
          const prevBtn = div.querySelector(".prev-btn") as HTMLElement;
          const nextBtn = div.querySelector(".next-btn") as HTMLElement;

          const updateSlider = (newIdx: number) => {
            activeIndex = (newIdx + imageUrls.length) % imageUrls.length;
            if (container) {
              container.style.transform = `translateX(-${activeIndex * 100}%)`;
            }
            dots.forEach((dot, idx) => {
              if (idx === activeIndex) {
                dot.className = "w-5 h-2.5 rounded-full bg-lime-400 transition-all duration-300 focus:outline-none";
              } else {
                dot.className = "w-2.5 h-2.5 rounded-full bg-white/30 transition-all duration-300 hover:bg-white/60 focus:outline-none";
              }
            });
          };

          if (prevBtn) prevBtn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); updateSlider(activeIndex - 1); });
          if (nextBtn) nextBtn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); updateSlider(activeIndex + 1); });
          dots.forEach((dot) => {
            dot.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              const idx = parseInt(dot.getAttribute("data-slide") || "0");
              updateSlider(idx);
            });
          });

          // Auto-advance
          let interval = setInterval(() => updateSlider(activeIndex + 1), 4000);
          div.addEventListener("mouseenter", () => clearInterval(interval));
          div.addEventListener("mouseleave", () => {
            clearInterval(interval);
            interval = setInterval(() => updateSlider(activeIndex + 1), 4000);
          });

          a.parentNode?.replaceChild(div, a);
        }

        // 2. COUNTDOWN TIMER
        else if (urlVal.startsWith("timer:")) {
          const targetDateStr = urlVal.substring(6).trim();
          const targetDate = new Date(targetDateStr).getTime();

          div.className = "w-full my-4 p-5 rounded-[2rem] text-center border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg flex flex-col gap-3 relative overflow-hidden transition-all duration-300 hover:border-white/20";
          div.innerHTML = `
            <div class="text-sm font-semibold text-white/95 truncate px-2">${link.title || "⏳ ОГРАНИЧЕНА ОФЕРТА"}</div>
            ${link.description ? `<p class="text-xs text-white/60 -mt-1 px-2 leading-relaxed font-light">${link.description}</p>` : ""}
            
            <div class="flex justify-center items-center gap-3 mt-1.5">
              <div class="flex flex-col items-center min-w-[50px] p-2 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                <span class="days-val text-xl md:text-2xl font-bold text-lime-400 font-mono tracking-tight">00</span>
                <span class="text-[9px] uppercase tracking-wider text-white/50 mt-1">дни</span>
              </div>
              <span class="text-xl font-bold text-white/30 -mt-4">:</span>
              <div class="flex flex-col items-center min-w-[50px] p-2 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                <span class="hours-val text-xl md:text-2xl font-bold text-lime-400 font-mono tracking-tight">00</span>
                <span class="text-[9px] uppercase tracking-wider text-white/50 mt-1">часа</span>
              </div>
              <span class="text-xl font-bold text-white/30 -mt-4">:</span>
              <div class="flex flex-col items-center min-w-[50px] p-2 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                <span class="minutes-val text-xl md:text-2xl font-bold text-lime-400 font-mono tracking-tight">00</span>
                <span class="text-[9px] uppercase tracking-wider text-white/50 mt-1">мин</span>
              </div>
              <span class="text-xl font-bold text-white/30 -mt-4">:</span>
              <div class="flex flex-col items-center min-w-[50px] p-2 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                <span class="seconds-val text-xl md:text-2xl font-bold text-rose-450 font-mono tracking-tight animate-pulse">00</span>
                <span class="text-[9px] uppercase tracking-wider text-white/50 mt-1">сек</span>
              </div>
            </div>
            
            <div class="expired-msg hidden text-xs font-semibold text-rose-450 uppercase tracking-widest mt-1 bg-rose-500/10 py-2.5 rounded-xl border border-rose-500/20">
              ⚠️ Офертата изтече!
            </div>
          `;

          const daysVal = div.querySelector(".days-val") as HTMLElement;
          const hoursVal = div.querySelector(".hours-val") as HTMLElement;
          const minutesVal = div.querySelector(".minutes-val") as HTMLElement;
          const secondsVal = div.querySelector(".seconds-val") as HTMLElement;
          const expiredMsg = div.querySelector(".expired-msg") as HTMLElement;
          const timerBox = div.querySelector(".flex.justify-center.items-center.gap-3") as HTMLElement;

          const updateTimer = () => {
            const now = new Date().getTime();
            const diff = targetDate - now;
            
            if (isNaN(targetDate) || diff <= 0) {
              if (expiredMsg) expiredMsg.classList.remove("hidden");
              if (timerBox) timerBox.classList.add("hidden");
              clearInterval(timerInterval);
              return;
            }
            
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            
            if (daysVal) daysVal.innerText = String(d).padStart(2, "0");
            if (hoursVal) hoursVal.innerText = String(h).padStart(2, "0");
            if (minutesVal) minutesVal.innerText = String(m).padStart(2, "0");
            if (secondsVal) secondsVal.innerText = String(s).padStart(2, "0");
          };

          updateTimer();
          const timerInterval = setInterval(updateTimer, 1000);

          // Cleanup interval when elements are removed
          const observer = new MutationObserver(() => {
            if (!document.body.contains(div)) {
              clearInterval(timerInterval);
              observer.disconnect();
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });

          a.parentNode?.replaceChild(div, a);
        }

        // 3. INTERACTIVE POLL / SURVEY
        else if (urlVal.startsWith("poll:")) {
          const rawOptions = urlVal.substring(5).split(/[|]/).map(s => s.trim()).filter(Boolean);
          const options = rawOptions.length > 0 ? rawOptions : ["Да, супер е!", "Добре е", "Има какво да се желае"];
          const seedVotes = options.map((opt) => (opt.length * 7 + 13) % 47 + 5);
          const storageKey = `saaslink_poll_${link.id}`;

          div.className = "w-full my-4 p-5 rounded-[2rem] text-left border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg flex flex-col gap-4 transition-all duration-300 hover:border-white/20";

          const renderPollUI = () => {
            const votedIdx = localStorage.getItem(storageKey);
            const isVoted = votedIdx !== null;
            const activeVoteIdx = isVoted ? parseInt(votedIdx as string) : -1;
            
            const currentVotes = [...seedVotes];
            if (isVoted && activeVoteIdx >= 0 && activeVoteIdx < currentVotes.length) {
              currentVotes[activeVoteIdx] += 1;
            }
            const totalVotes = currentVotes.reduce((x, y) => x + y, 0);
            
            let optionsHtml = "";
            options.forEach((opt, idx) => {
              const percent = totalVotes > 0 ? Math.round((currentVotes[idx] / totalVotes) * 100) : 0;
              const isSelected = idx === activeVoteIdx;
              
              if (isVoted) {
                optionsHtml += `
                  <div class="relative w-full p-3.5 rounded-2xl bg-white/5 border border-white/5 overflow-hidden flex justify-between items-center text-sm text-white/90">
                    <div class="absolute inset-y-0 left-0 bg-lime-400/20 transition-all duration-1000 ease-out" style="width: ${percent}%;"></div>
                    <span class="relative font-medium flex items-center gap-2">
                      ${isSelected ? `<span class="text-lime-400">✓</span>` : ""}
                      ${opt}
                    </span>
                    <span class="relative font-mono font-bold opacity-80">${percent}%</span>
                  </div>
                `;
              } else {
                optionsHtml += `
                  <button data-poll-opt="${idx}" class="w-full p-3.5 text-left text-sm font-medium rounded-2xl bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 hover:border-lime-400/50 hover:text-white transition-all duration-200 active:scale-[0.99] flex items-center justify-between focus:outline-none">
                    <span>${opt}</span>
                    <span class="text-xs text-lime-400 opacity-60">гласувай →</span>
                  </button>
                `;
              }
            });
            
            div.innerHTML = `
              <div class="flex justify-between items-center w-full px-1">
                <h3 class="text-sm font-semibold text-white/95 truncate pr-2">${link.title || "📊 Бърза анкета"}</h3>
                <span class="text-[10px] text-white/40 uppercase tracking-widest font-mono shrink-0">${totalVotes} гласа</span>
              </div>
              ${link.description ? `<p class="text-xs text-white/60 -mt-2 px-1 font-light leading-relaxed">${link.description}</p>` : ""}
              <div class="flex flex-col gap-2">
                ${optionsHtml}
              </div>
            `;
            
            if (!isVoted) {
              const buttons = div.querySelectorAll("[data-poll-opt]") as NodeListOf<HTMLElement>;
              buttons.forEach(btn => {
                btn.addEventListener("click", (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const idx = btn.getAttribute("data-poll-opt");
                  if (idx !== null) {
                    localStorage.setItem(storageKey, idx);
                    renderPollUI();
                  }
                });
              });
            }
          };

          renderPollUI();
          a.parentNode?.replaceChild(div, a);
        }

        // 4. FAQ ACCORDION
        else if (urlVal.toLowerCase().startsWith("faq") || urlVal.toLowerCase() === "faq") {
          div.className = "w-full my-3 p-4 rounded-[1.5rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-md flex flex-col text-left transition-all duration-300 hover:border-white/20";
          div.innerHTML = `
            <button class="faq-trigger w-full flex justify-between items-center gap-4 text-sm font-semibold text-white/90 hover:text-white py-1 focus:outline-none">
              <span class="text-left">${link.title || "Въпрос?"}</span>
              <svg class="faq-icon w-4 h-4 text-white/60 transition-transform duration-300 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="faq-answer-container max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
              <p class="faq-answer text-xs text-white/70 leading-relaxed font-light mt-3 pt-3 border-t border-white/5">
                ${link.description || "Няма предоставен отговор."}
              </p>
            </div>
          `;

          const trigger = div.querySelector(".faq-trigger") as HTMLElement;
          const answerContainer = div.querySelector(".faq-answer-container") as HTMLElement;
          const icon = div.querySelector(".faq-icon") as HTMLElement;

          trigger.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isExpanded = answerContainer.style.maxHeight !== "0px" && answerContainer.style.maxHeight !== "";
            
            if (isExpanded) {
              answerContainer.style.maxHeight = "0px";
              icon.style.transform = "rotate(0deg)";
            } else {
              const answerEl = div.querySelector(".faq-answer") as HTMLElement;
              const height = answerEl.offsetHeight + 24; 
              answerContainer.style.maxHeight = `${height}px`;
              icon.style.transform = "rotate(180deg)";
            }
          });

          a.parentNode?.replaceChild(div, a);
        }

        // 5. SOCIAL PROOF TOAST NOTIFICATIONS
        else if (urlVal.startsWith("toast:")) {
          const toastEvents = urlVal.substring(6).split(",").map(s => s.trim()).filter(Boolean);
          
          // Hide standard block in the profile grid
          div.style.display = "none";
          a.parentNode?.replaceChild(div, a);

          if (toastEvents.length > 0) {
            let toastContainer = document.getElementById("saaslink-toast-container");
            if (!toastContainer) {
              toastContainer = document.createElement("div");
              toastContainer.id = "saaslink-toast-container";
              document.body.appendChild(toastContainer);
            }

            let toastIdx = 0;
            const showNextToast = () => {
              if (toastEvents.length === 0 || !toastContainer) return;
              
              const eventText = toastEvents[toastIdx];
              toastIdx = (toastIdx + 1) % toastEvents.length;
              
              const toastCard = document.createElement("div");
              toastCard.className = "saaslink-live-toast-card";
              
              const icons = ["🛍️", "✅", "🔥", "✨", "❤️"];
              const activeIcon = icons[Math.floor(Math.random() * icons.length)];
              
              toastCard.innerHTML = `
                <div class="saaslink-live-toast-icon-wrapper">
                  ${activeIcon}
                </div>
                <div class="saaslink-live-toast-content">
                  <span class="saaslink-live-toast-title">${link.title || "Активност на живо"}</span>
                  <span class="saaslink-live-toast-desc">${eventText}</span>
                </div>
              `;
              
              toastContainer.appendChild(toastCard);
              
              setTimeout(() => {
                toastCard.classList.add("show");
              }, 100);
              
              setTimeout(() => {
                toastCard.classList.remove("show");
                setTimeout(() => {
                  toastCard.remove();
                }, 500);
              }, 5000);
            };

            const initialDelay = setTimeout(showNextToast, 2000);
            const interval = setInterval(showNextToast, 12000);

            // MutationObserver cleanup on unmount
            const observer = new MutationObserver(() => {
              if (!document.body.contains(div)) {
                clearInterval(interval);
                clearTimeout(initialDelay);
                observer.disconnect();
              }
            });
            observer.observe(document.body, { childList: true, subtree: true });
          }
        }

        // FALLBACK: ORIGINAL TESTIMONIAL (STAR REVIEW) CARD
        else {
          let rating = 5;
          if (/^[1-5]$/.test(urlVal)) {
            rating = parseInt(urlVal);
          } else if (/^[1-5]\.[0-9]$/.test(urlVal)) {
            rating = parseFloat(urlVal);
          }
          
          let starsHtml = "";
          for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
              starsHtml += `<span style="color: #fbbf24; font-size: 1.25rem; margin-right: 2px;">★</span>`;
            } else {
              starsHtml += `<span style="color: #4b5563; font-size: 1.25rem; margin-right: 2px;">★</span>`;
            }
          }
          
          div.className = "w-full my-4 p-6 rounded-[2rem] text-left border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg flex flex-col gap-3 transition-all duration-300 hover:scale-[1.01] hover:border-white/20";
          div.innerHTML = `
            <div class="flex justify-between items-start w-full">
              <div class="flex">${starsHtml}</div>
              <span class="text-3xl opacity-20 font-serif leading-none text-white">“</span>
            </div>
            <p class="text-sm opacity-90 leading-relaxed italic font-light text-white">
              "${link.description || 'Изключително доволен съм от обслужването и резултатите!'}"
            </p>
            <div class="flex items-center gap-3 mt-2">
              ${link.imageUrl ? `
                <img src="${link.imageUrl}" alt="${link.title}" class="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm" />
              ` : `
                <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-lime-400 to-emerald-500 flex items-center justify-center font-bold text-white text-sm shadow-sm">
                  ${link.title.slice(0, 1).toUpperCase()}
                </div>
              `}
              <div class="flex flex-col">
                <span class="text-sm font-semibold opacity-95 text-white">${link.title}</span>
                ${link.url && !/^[0-5](\.[0-9])?$/.test(urlVal) ? `
                  <a href="${link.url}" target="_blank" class="text-xs text-lime-400 hover:underline truncate max-w-[150px]">${urlVal.replace(/^https?:\/\/(www\.)?/, "")}</a>
                ` : `
                  <span class="text-xs opacity-60 text-white/80">Доволен клиент</span>
                `}
              </div>
            </div>
          `;
          
          a.parentNode?.replaceChild(div, a);
        }
      }
    });
  }, [links]);

  useEffect(() => {
    const buyableLinks = links.filter((l) => {
      const type = l.type || "URL";
      if (type === "TEXT" || type === "EMAIL_CAPTURE") return false;
      
      const urlVal = (l.url || "").trim().toLowerCase();
      if (
        urlVal.startsWith("gallery:") ||
        urlVal.startsWith("timer:") ||
        urlVal.startsWith("poll:") ||
        urlVal.startsWith("faq") ||
        urlVal.startsWith("toast:")
      ) {
        return false;
      }
      return true;
    });

    if (buyableLinks.length === 0) return;

    // Parse intervals from theme
    const theme = (profile as any).theme;
    let toastMinInterval = 30;
    let toastMaxInterval = 180;
    if (theme && typeof theme === "object") {
      if (typeof theme.toastMinInterval === "number") toastMinInterval = theme.toastMinInterval;
      else if (typeof theme.toastMinInterval === "string" && !isNaN(Number(theme.toastMinInterval))) toastMinInterval = Number(theme.toastMinInterval);
      
      if (typeof theme.toastMaxInterval === "number") toastMaxInterval = theme.toastMaxInterval;
      else if (typeof theme.toastMaxInterval === "string" && !isNaN(Number(theme.toastMaxInterval))) toastMaxInterval = Number(theme.toastMaxInterval);
    }

    const minIntervalMs = toastMinInterval * 1000;
    const maxIntervalMs = toastMaxInterval * 1000;

    const randomBuyers = [
      { name: "Светлана Г.", city: "Пловдив", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" },
      { name: "Ивелина П.", city: "София", avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=150&h=150&q=80" },
      { name: "Мария К.", city: "Варна", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80" },
      { name: "Гергана Д.", city: "Бургас", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&h=150&q=80" },
      { name: "Елена В.", city: "Русе", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80" },
      { name: "Даниела С.", city: "Стара Загора", avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=150&h=150&q=80" },
      { name: "Александра И.", city: "Плевен", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=150&h=150&q=80" },
      { name: "Николета Т.", city: "Благоевград", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&h=150&q=80" },
      { name: "Десислава Р.", city: "Велико Търново", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" },
      { name: "Петя Б.", city: "Хасково", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80" },
    ];

    const showOrderToast = () => {
      const buyer = randomBuyers[Math.floor(Math.random() * randomBuyers.length)];
      const linkItem = buyableLinks[Math.floor(Math.random() * buyableLinks.length)];
      
      let toastContainer = document.getElementById("saaslink-order-toast-container");
      if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "saaslink-order-toast-container";
        document.body.appendChild(toastContainer);
      }
      
      const toastCard = document.createElement("div");
      toastCard.className = "saaslink-toast-card";
      
      toastCard.onclick = () => {
        window.open(`/api/click/${linkItem.id}`, '_blank');
      };

      toastCard.innerHTML = `
        <div class="saaslink-toast-avatar-wrapper">
          <img src="${buyer.avatar}" class="saaslink-toast-avatar" alt="${buyer.name}" />
          <span class="saaslink-toast-badge">✓</span>
        </div>
        <div class="saaslink-toast-content">
          <div class="saaslink-toast-header">
            <span class="saaslink-toast-buyer">${buyer.name} <span class="saaslink-toast-city">от ${buyer.city}</span></span>
            <span class="saaslink-toast-live">
              <span class="saaslink-toast-ping"></span> на живо
            </span>
          </div>
          <div class="saaslink-toast-buy-text">
            току-що си купи <span class="saaslink-toast-product">${linkItem.title}</span>
          </div>
          <div class="saaslink-toast-footer">
            <span>преди 3 сек</span>
            <span>•</span>
            <span style="display: inline-flex; align-items: center; gap: 2px; color: rgba(255, 255, 255, 0.5);">🛒 Сигурно плащане</span>
          </div>
        </div>
        <button class="saaslink-toast-close">
          <svg style="width: 12px; height: 12px;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      `;
      
      const closeBtn = toastCard.querySelector(".saaslink-toast-close") as HTMLElement;
      if (closeBtn) {
        closeBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          toastCard.classList.remove("show");
          setTimeout(() => toastCard.remove(), 700);
        };
      }
      
      toastContainer.appendChild(toastCard);
      
      setTimeout(() => {
        toastCard.classList.add("show");
      }, 100);
      
      setTimeout(() => {
        if (document.body.contains(toastCard)) {
          toastCard.classList.remove("show");
          setTimeout(() => {
            if (document.body.contains(toastCard)) toastCard.remove();
          }, 700);
        }
      }, 6000);
    };

    // First toast: 6s delay
    const initialTimeout = setTimeout(showOrderToast, 6000);
    
    // Looping recursive logic
    let loopTimeout: NodeJS.Timeout;
    const scheduleNext = () => {
      const delay = Math.random() * (maxIntervalMs - minIntervalMs) + minIntervalMs;
      loopTimeout = setTimeout(() => {
        showOrderToast();
        scheduleNext();
      }, delay);
    };

    // Start scheduling loop (after initial toast delay)
    const startLoopTimeout = setTimeout(scheduleNext, 6000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(startLoopTimeout);
      clearTimeout(loopTimeout);
      const container = document.getElementById("saaslink-order-toast-container");
      if (container) container.remove();
    };
  }, [links, profile]);

  return (
    <style dangerouslySetInnerHTML={{ __html: `
      #saaslink-toast-container {
        position: fixed;
        bottom: 96px;
        left: 16px;
        right: 16px;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        gap: 8px;
        pointer-events: none;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
      @media (min-width: 768px) {
        #saaslink-toast-container {
          bottom: 24px;
          left: 24px;
          right: auto;
          width: 320px;
        }
      }
      .saaslink-live-toast-card {
        width: 100%;
        padding: 14px;
        border-radius: 16px;
        background-color: rgba(9, 9, 11, 0.9);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        gap: 12px;
        text-align: left;
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        transform: translateX(-120%);
        opacity: 0;
        pointer-events: auto;
        color: #ffffff;
        box-sizing: border-box;
      }
      .saaslink-live-toast-card.show {
        transform: translateX(0);
        opacity: 1;
      }
      .saaslink-live-toast-card:hover {
        border-color: rgba(163, 230, 53, 0.3);
      }
      .saaslink-live-toast-icon-wrapper {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1);
        flex-shrink: 0;
        box-sizing: border-box;
      }
      .saaslink-live-toast-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0;
      }
      .saaslink-live-toast-title {
        font-size: 11px;
        font-weight: 600;
        color: #ffffff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .saaslink-live-toast-desc {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 300;
        line-height: 1.4;
        margin-top: 2px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      #saaslink-order-toast-container {
        position: fixed;
        bottom: 96px;
        left: 16px;
        right: 16px;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        gap: 8px;
        pointer-events: none;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
      @media (min-width: 768px) {
        #saaslink-order-toast-container {
          bottom: 24px;
          left: 24px;
          right: auto;
          width: 340px;
        }
      }
      .saaslink-toast-card {
        width: 100%;
        padding: 14px;
        border-radius: 18px;
        background-color: rgba(9, 9, 11, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        gap: 14px;
        text-align: left;
        transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        transform: translateY(150%);
        opacity: 0;
        pointer-events: auto;
        cursor: pointer;
        position: relative;
        color: #ffffff;
        box-sizing: border-box;
      }
      .saaslink-toast-card.show {
        transform: translateY(0);
        opacity: 1;
      }
      .saaslink-toast-card:hover {
        border-color: rgba(163, 230, 53, 0.4);
      }
      .saaslink-toast-avatar-wrapper {
        position: relative;
        width: 44px;
        height: 44px;
        flex-shrink: 0;
      }
      .saaslink-toast-avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: block;
        box-sizing: border-box;
      }
      .saaslink-toast-badge {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 16px;
        height: 16px;
        background-color: #10b981;
        border-radius: 50%;
        border: 1px solid #09090b;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8px;
        font-weight: bold;
        color: #ffffff;
        box-sizing: border-box;
      }
      .saaslink-toast-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0;
        padding-right: 8px;
      }
      .saaslink-toast-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .saaslink-toast-buyer {
        font-size: 11px;
        font-weight: bold;
        color: #ffffff;
      }
      .saaslink-toast-city {
        color: rgba(255, 255, 255, 0.6);
        font-weight: normal;
      }
      .saaslink-toast-live {
        font-size: 9px;
        color: #34d399;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
      }
      .saaslink-toast-ping {
        width: 6px;
        height: 6px;
        background-color: #34d399;
        border-radius: 50%;
        display: inline-block;
        animation: saaslink-ping 1.5s infinite;
      }
      .saaslink-toast-buy-text {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.4;
        margin-top: 2px;
        font-weight: 300;
      }
      .saaslink-toast-product {
        color: #a3e635;
        font-weight: 600;
        display: block;
        margin-top: 2px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .saaslink-toast-product:hover {
        text-decoration: underline;
      }
      .saaslink-toast-footer {
        font-size: 9px;
        color: rgba(255, 255, 255, 0.4);
        margin-top: 4px;
        font-weight: 300;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .saaslink-toast-close {
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.4);
        cursor: pointer;
        padding: 4px;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s ease;
      }
      .saaslink-toast-close:hover {
        color: rgba(255, 255, 255, 0.8);
      }
      @keyframes saaslink-ping {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(2.5); opacity: 0; }
      }
    `}} />
  );
}

export function PremiumFloatingChatWidget({ profile }: { profile: Profile }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const hasSocials = !!(profile.socialInstagram || profile.socialFacebook || profile.socialWhatsapp || profile.socialViber);
  
  if (!hasSocials) return null;
  
  let viberLink = profile.socialViber || "";
  if (viberLink) {
    let digits = "";
    if (viberLink.startsWith("viber://")) {
      const match = viberLink.match(/number=([^&]+)/);
      if (match) {
        digits = decodeURIComponent(match[1]).replace(/\D/g, "");
      }
    } else {
      digits = viberLink.replace(/\D/g, "");
    }
    if (digits) {
      if (digits.startsWith("0") && digits.length === 10) {
        digits = "359" + digits.slice(1);
      }
      viberLink = `viber://chat?number=${digits}`;
    }
  }
  
  let whatsappLink = profile.socialWhatsapp || "";
  if (whatsappLink) {
    let digits = "";
    if (whatsappLink.includes("wa.me/")) {
      const parts = whatsappLink.split("wa.me/");
      if (parts[1]) digits = parts[1].split(/[?&]/)[0].replace(/\D/g, "");
    } else if (whatsappLink.includes("whatsapp.com/")) {
      const match = whatsappLink.match(/phone=([^&]+)/);
      if (match) {
        digits = match[1].replace(/\D/g, "");
      }
    } else {
      digits = whatsappLink.replace(/\D/g, "");
    }
    if (digits) {
      if (digits.startsWith("0") && digits.length === 10) {
        digits = "359" + digits.slice(1);
      }
      whatsappLink = `https://wa.me/${digits}?text=${encodeURIComponent("Здравейте! Пиша Ви от SaasLink.")}`;
    }
  }
  
  return (
    <div className="saaslink-chat-container">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes saaslink-chat-fade-in {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .saaslink-chat-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 99999;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          color: #ffffff;
          display: block;
          box-sizing: border-box;
        }
        .saaslink-chat-glow {
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 50%;
          background: rgba(163, 230, 53, 0.35);
          filter: blur(8px);
          animation: saaslink-chat-pulse 2s infinite;
          pointer-events: none;
          z-index: 1;
        }
        .saaslink-chat-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a3e635, #10b981);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          border: none;
          cursor: pointer;
          outline: none;
          position: relative;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          padding: 0;
        }
        .saaslink-chat-btn:hover {
          transform: scale(1.08);
        }
        .saaslink-chat-btn:active {
          transform: scale(0.92);
        }
        .saaslink-chat-icon {
          font-family: 'Material Symbols Outlined' !important;
          font-size: 24px !important;
          color: #ffffff !important;
          position: relative;
          z-index: 2;
          display: inline-block;
          font-style: normal;
          font-weight: normal;
        }
        .saaslink-chat-btn-badge {
          position: absolute;
          top: 0;
          right: 0;
          width: 14px;
          height: 14px;
          background-color: #22c55e;
          border: 2px solid #ffffff;
          border-radius: 50%;
          z-index: 3;
          box-sizing: border-box;
        }
        .saaslink-chat-card {
          position: absolute;
          bottom: 76px;
          right: 0;
          width: 320px;
          max-width: calc(100vw - 2rem);
          border-radius: 24px;
          background-color: rgba(9, 9, 11, 0.96);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
          overflow: hidden;
          transform-origin: bottom right;
          z-index: 10;
          animation: saaslink-chat-fade-in 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          box-sizing: border-box;
        }
        .saaslink-chat-header {
          padding: 16px;
          background-color: rgba(255, 255, 255, 0.05);
          border-b: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          gap: 12px;
          box-sizing: border-box;
        }
        .saaslink-chat-avatar-wrapper {
          position: relative;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
        }
        .saaslink-chat-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.25);
          display: block;
          box-sizing: border-box;
        }
        .saaslink-chat-avatar-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #a3e635;
          color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          box-sizing: border-box;
        }
        .saaslink-chat-avatar-status {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 12px;
          height: 12px;
          background-color: #22c55e;
          border: 2px solid #09090b;
          border-radius: 50%;
          box-sizing: border-box;
        }
        .saaslink-chat-header-info {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .saaslink-chat-name {
          font-weight: 600;
          font-size: 14px;
          line-height: 1.2;
          color: #ffffff;
        }
        .saaslink-chat-status-text {
          font-size: 10px;
          color: #4ade80;
          font-weight: 500;
          margin-top: 2px;
        }
        .saaslink-chat-message-area {
          padding: 16px;
          text-align: left;
          box-sizing: border-box;
        }
        .saaslink-chat-bubble {
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 12px;
          font-size: 12px;
          line-height: 1.5;
          max-width: 85%;
          color: rgba(255, 255, 255, 0.9);
          box-sizing: border-box;
        }
        .saaslink-chat-channels {
          padding: 0 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          box-sizing: border-box;
        }
        .saaslink-chat-btn-channel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          border-radius: 16px;
          font-weight: 500;
          font-size: 12px;
          transition: all 0.28s ease;
          text-decoration: none;
          color: #ffffff;
          box-sizing: border-box;
        }
        .saaslink-chat-btn-whatsapp {
          background-color: rgba(37, 211, 102, 0.1);
          border: 1px solid rgba(37, 211, 102, 0.2);
        }
        .saaslink-chat-btn-whatsapp:hover {
          background-color: rgba(37, 211, 102, 0.2);
        }
        .saaslink-chat-btn-viber {
          background-color: rgba(115, 96, 242, 0.1);
          border: 1px solid rgba(115, 96, 242, 0.2);
        }
        .saaslink-chat-btn-viber:hover {
          background-color: rgba(115, 96, 242, 0.2);
        }
        .saaslink-chat-btn-instagram {
          background-color: rgba(225, 48, 108, 0.1);
          border: 1px solid rgba(225, 48, 108, 0.2);
        }
        .saaslink-chat-btn-instagram:hover {
          background-color: rgba(225, 48, 108, 0.2);
        }
        .saaslink-chat-btn-facebook {
          background-color: rgba(24, 119, 242, 0.1);
          border: 1px solid rgba(24, 119, 242, 0.2);
        }
        .saaslink-chat-btn-facebook:hover {
          background-color: rgba(24, 119, 242, 0.2);
        }
        .saaslink-chat-channel-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .saaslink-chat-channel-icon {
          width: 24px;
          height: 24px;
          object-fit: contain;
          display: block;
        }
        .saaslink-chat-arrow {
          font-size: 12px;
          opacity: 0.6;
          transition: transform 0.2s ease;
        }
        .saaslink-chat-btn-channel:hover .saaslink-chat-arrow {
          transform: translateX(3px);
        }
        @keyframes saaslink-chat-pulse {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.6; }
          100% { transform: scale(1); opacity: 0.3; }
        }
      `}} />

      {/* Floating Badge Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="saaslink-chat-btn"
        aria-label="Chat"
      >
        <span className="saaslink-chat-glow"></span>
        <span className="saaslink-chat-icon">
          {isOpen ? "close" : "chat"}
        </span>
        <span className="saaslink-chat-btn-badge"></span>
      </button>
      
      {/* Premium Chat Card */}
      {isOpen && (
        <div className="saaslink-chat-card">
          {/* Header */}
          <div className="saaslink-chat-header">
            <div className="saaslink-chat-avatar-wrapper">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="" className="saaslink-chat-avatar" />
              ) : (
                <div className="saaslink-chat-avatar-placeholder">
                  {profile.displayName.slice(0, 1).toUpperCase()}
                </div>
              )}
              <span className="saaslink-chat-avatar-status"></span>
            </div>
            <div className="saaslink-chat-header-info">
              <span className="saaslink-chat-name">{profile.displayName}</span>
              <span className="saaslink-chat-status-text">На линия съм • Свържи се с мен</span>
            </div>
          </div>
          
          {/* Message Area */}
          <div className="saaslink-chat-message-area">
            <div className="saaslink-chat-bubble">
              Здравейте! 👋 С какво мога да Ви помогна? Изберете предпочитания от Вас чат канал по-долу:
            </div>
          </div>
          
          {/* Action Channels */}
          <div className="saaslink-chat-channels">
            {profile.socialWhatsapp && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="nofollow noopener"
                className="saaslink-chat-btn-channel saaslink-chat-btn-whatsapp"
              >
                <div className="saaslink-chat-channel-left">
                  <img src="/socials/whatsapp.png" alt="WhatsApp" className="saaslink-chat-channel-icon" />
                  <span>WhatsApp</span>
                </div>
                <span className="saaslink-chat-arrow">➔</span>
              </a>
            )}
            
            {profile.socialViber && (
              <a
                href={viberLink}
                target="_blank"
                rel="nofollow noopener"
                className="saaslink-chat-btn-channel saaslink-chat-btn-viber"
              >
                <div className="saaslink-chat-channel-left">
                  <img src="/socials/viber.png" alt="Viber" className="saaslink-chat-channel-icon" />
                  <span>Viber Chat</span>
                </div>
                <span className="saaslink-chat-arrow">➔</span>
              </a>
            )}
            
            {profile.socialInstagram && (
              <a
                href={profile.socialInstagram}
                target="_blank"
                rel="nofollow noopener"
                className="saaslink-chat-btn-channel saaslink-chat-btn-instagram"
              >
                <div className="saaslink-chat-channel-left">
                  <img src="/socials/instagram.png" alt="Instagram" className="saaslink-chat-channel-icon" />
                  <span>Instagram Direct</span>
                </div>
                <span className="saaslink-chat-arrow">➔</span>
              </a>
            )}
            
            {profile.socialFacebook && (
              <a
                href={profile.socialFacebook}
                target="_blank"
                rel="nofollow noopener"
                className="saaslink-chat-btn-channel saaslink-chat-btn-facebook"
              >
                <div className="saaslink-chat-channel-left">
                  <img src="/socials/facebook.png" alt="Facebook" className="saaslink-chat-channel-icon" />
                  <span>Messenger</span>
                </div>
                <span className="saaslink-chat-arrow">➔</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

