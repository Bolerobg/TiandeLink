// Template renderer that uses exact Stitch HTML from designs folder

const tailwindConfigs: Record<string, any> = {};

// All 14 designs share the same core tailwind config
// We load the full Tailwind CDN with proper config per template

export function StitchTemplate({
  template,
  profile,
  links,
}: {
  template: string;
  profile: { displayName: string; bio?: string | null; avatarUrl?: string | null };
  links: { id: string; title: string; url: string; description?: string | null; imageUrl?: string | null; icon?: string | null }[];
}) {  // Pick the right layout based on template name
  switch (template) {
    case "bento":
      return <BentoGrid profile={profile} links={links} />;
    case "wellness":
      return <WellnessBrutalism profile={profile} links={links} />;
    case "fullglass":
      return <FullGlass profile={profile} links={links} />;
    case "neumorph":
      return <Neumorphism profile={profile} links={links} />;
    case "masonry":
      return <Masonry profile={profile} links={links} />;
    case "linkbio1":
      return <LinkBio1 profile={profile} links={links} />;
    case "clean":
      return <CleanGallery profile={profile} links={links} />;
    default:
      return <BentoGrid profile={profile} links={links} />;
  }
}

// === BENTO GRID (from _6) ===
function BentoGrid({
  profile,
  links,
}: {
  profile: { displayName: string; bio?: string | null; avatarUrl?: string | null };
  links: { id: string; title: string; url: string; description?: string | null; imageUrl?: string | null }[];
}) {
  return (
    <div className="min-h-screen bg-[#fbf9f4] font-['Hanken_Grotesk'] antialiased pb-24">
      <header className="flex items-center justify-center pt-12 pb-6 px-4">
        <div className="flex flex-col items-center gap-3">
          {profile.avatarUrl ? (
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C7B98B]">
              <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#F2EFE9] border-2 border-[#C7B98B] flex items-center justify-center text-2xl font-bold text-[#1e0f0b]">
              {profile.displayName[0]}
            </div>
          )}
          <h1 className="text-3xl font-['EB_Garamond'] font-semibold text-[#1e0f0b] tracking-tight">{profile.displayName}</h1>
          {profile.bio ? <p className="text-[#4f4442] italic text-center max-w-md">{profile.bio}</p> : null}
        </div>
      </header>

      <div className="bento-grid max-w-[580px] mx-auto px-4" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {links.map((link, i) => {
          const isHero = i === 0;
          return (
            <a
              key={link.id}
              href={`/api/click/${link.id}`}
              className={`soft-shadow block relative overflow-hidden bg-white rounded-[2rem] transition-transform hover:-translate-y-0.5 ${isHero ? "col-span-2" : ""}`}
              style={{
                gridColumn: isHero ? "1 / -1" : undefined,
                minHeight: isHero ? 220 : 140,
                boxShadow: "0 4px 20px rgba(30,15,11,0.05)",
                border: "none",
              }}
            >
              {link.imageUrl ? (
                <img src={link.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
              ) : null}
              <div className={`absolute inset-0 flex flex-col justify-end p-5 ${link.imageUrl ? "bg-gradient-to-t from-black/60 to-transparent" : ""}`}>
                <strong className={link.imageUrl ? "text-white" : "text-[#1e0f0b]"} style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.1rem" }}>
                  {link.title}
                </strong>
                {link.description ? (
                  <small className="text-sm mt-1 opacity-70" style={{ color: link.imageUrl ? "rgba(255,255,255,0.8)" : "#4f4442" }}>
                    {link.description}
                  </small>
                ) : null}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// === WELLNESS BRUTALISM (from _7) ===
function WellnessBrutalism({
  profile,
  links,
}: {
  profile: { displayName: string; bio?: string | null; avatarUrl?: string | null };
  links: { id: string; title: string; url: string; description?: string | null; imageUrl?: string | null }[];
}) {
  return (
    <div className="min-h-screen bg-[#fbf9f4] font-['Hanken_Grotesk'] antialiased pb-24">
      <header className="flex items-center justify-center pt-16 pb-8 px-4">
        <div className="flex flex-col items-center gap-4">
          {profile.avatarUrl ? (
            <div className="w-20 h-20 border-2 border-[#1e0f0b] flex items-center justify-center">
              <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-20 h-20 border-2 border-[#1e0f0b] flex items-center justify-center text-3xl font-bold text-[#1e0f0b] uppercase">
              {profile.displayName[0]}
            </div>
          )}
          <h1 className="text-4xl uppercase font-bold text-[#1e0f0b] tracking-tighter">{profile.displayName}</h1>
          {profile.bio ? <p className="text-[#4f4442] uppercase text-sm tracking-wider">{profile.bio}</p> : null}
        </div>
      </header>

      <div className="max-w-[520px] mx-auto px-4 grid gap-4">
        {links.map((link) => (
          <a
            key={link.id}
            href={`/api/click/${link.id}`}
            className="block border-2 border-[#1e0f0b] bg-white p-5 uppercase font-bold text-sm tracking-wide hover:shadow-[4px_4px_0px_0px_#1e0f0b] transition-shadow"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            {link.imageUrl ? (
              <img src={link.imageUrl} alt="" className="w-full h-40 object-cover mb-3" />
            ) : null}
            <span className="text-[#1e0f0b]">{link.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// === FULL GLASSMORPHISM (from glassmorphism/) ===
function FullGlass({
  profile,
  links,
}: {
  profile: { displayName: string; bio?: string | null; avatarUrl?: string | null };
  links: { id: string; title: string; url: string; description?: string | null; imageUrl?: string | null }[];
}) {
  return (
    <div
      className="min-h-screen font-['Hanken_Grotesk'] antialiased pb-24"
      style={{ background: "linear-gradient(135deg, #fbf9f4 0%, #eae8e3 100%)" }}
    >
      <header className="flex items-center justify-center pt-12 pb-6 px-4">
        <div className="flex flex-col items-center gap-3">
          {profile.avatarUrl ? (
            <div className="w-16 h-16 rounded-full overflow-hidden border border-white/50 bg-white/30 backdrop-blur-md">
              <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-2xl font-bold text-[#1e0f0b]">
              {profile.displayName[0]}
            </div>
          )}
          <h1 className="text-2xl font-['EB_Garamond'] font-semibold text-[#1e0f0b]">{profile.displayName}</h1>
          {profile.bio ? <p className="text-[#4f4442] italic text-center max-w-sm">{profile.bio}</p> : null}
        </div>
      </header>

      <div className="max-w-[520px] mx-auto px-4 grid gap-3">
        {links.map((link) => (
          <a
            key={link.id}
            href={`/api/click/${link.id}`}
            className="glass-card block p-4 rounded-2xl transition-transform hover:scale-[1.01]"
            style={{
              background: "rgba(255,255,255,0.4)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 8px 32px -8px rgba(30,15,11,0.06)",
            }}
          >
            {link.imageUrl ? (
              <img src={link.imageUrl} alt="" className="w-full h-44 object-cover rounded-xl mb-3" />
            ) : null}
            <strong className="text-[#1e0f0b] font-['EB_Garamond'] text-lg">{link.title}</strong>
          </a>
        ))}
      </div>
    </div>
  );
}

// === NEUMORPHISM (from soft_ui/) ===
function Neumorphism({
  profile,
  links,
}: {
  profile: { displayName: string; bio?: string | null; avatarUrl?: string | null };
  links: { id: string; title: string; url: string; description?: string | null; imageUrl?: string | null }[];
}) {
  return (
    <div className="min-h-screen bg-[#fbf9f4] font-['Hanken_Grotesk'] antialiased pb-24">
      <header className="flex items-center justify-center pt-12 pb-6 px-4">
        <div className="flex flex-col items-center gap-3">
          {profile.avatarUrl ? (
            <div className="w-20 h-20 rounded-full overflow-hidden" style={{ boxShadow: "4px 4px 10px rgba(30,15,11,0.04), -4px -4px 10px rgba(255,255,255,0.8)" }}>
              <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-[#1e0f0b]" style={{ background: "linear-gradient(145deg, #ffffff, #e6e3dd)", boxShadow: "4px 4px 10px rgba(30,15,11,0.04), -4px -4px 10px rgba(255,255,255,0.8)" }}>
              {profile.displayName[0]}
            </div>
          )}
          <h1 className="text-2xl font-['EB_Garamond'] font-semibold text-[#1e0f0b]">{profile.displayName}</h1>
          {profile.bio ? <p className="text-[#4f4442] italic text-center max-w-sm">{profile.bio}</p> : null}
        </div>
      </header>

      <div className="max-w-[480px] mx-auto px-4 grid gap-4">
        {links.map((link) => (
          <a
            key={link.id}
            href={`/api/click/${link.id}`}
            className="block p-5 rounded-xl transition-all active:scale-[0.98]"
            style={{
              background: "linear-gradient(145deg, #ffffff, #e6e3dd)",
              boxShadow: "4px 4px 10px rgba(30,15,11,0.04), -4px -4px 10px rgba(255,255,255,0.8)",
            }}
          >
            {link.imageUrl ? (
              <img src={link.imageUrl} alt="" className="w-full h-40 object-cover rounded-lg mb-3" />
            ) : null}
            <strong className="text-[#1e0f0b] font-['EB_Garamond'] text-lg">{link.title}</strong>
            {link.description ? <p className="text-[#4f4442] text-sm mt-1 opacity-70">{link.description}</p> : null}
          </a>
        ))}
      </div>
    </div>
  );
}

// === MASONRY EDITORIAL (from _8) ===
function Masonry({
  profile,
  links,
}: {
  profile: { displayName: string; bio?: string | null; avatarUrl?: string | null };
  links: { id: string; title: string; url: string; description?: string | null; imageUrl?: string | null }[];
}) {
  return (
    <div className="min-h-screen bg-[#fafaf9] font-['EB_Garamond'] antialiased pb-24">
      <header className="flex flex-col items-center pt-12 pb-8 px-4">
        <h1 className="text-5xl font-bold text-[#1e0f0b] border-b-2 border-[#e7e5e4] pb-4 mb-3">{profile.displayName}</h1>
        {profile.bio ? <p className="text-[#4f4442] italic text-lg max-w-md text-center">{profile.bio}</p> : null}
      </header>

      <div className="max-w-[640px] mx-auto px-4" style={{ columns: 2, columnGap: 12 }}>
        {links.map((link) => (
          <a
            key={link.id}
            href={`/api/click/${link.id}`}
            className="block break-inside-avoid mb-3 bg-white border border-[#e7e5e4] rounded overflow-hidden"
            style={{ boxShadow: "0 2px 12px rgba(30,15,11,0.03)" }}
          >
            {link.imageUrl ? (
              <img src={link.imageUrl} alt="" className="w-full object-cover" style={{ height: link.imageUrl ? "auto" : "0" }} />
            ) : null}
            <div className="p-4">
              <strong className="text-[#1e0f0b] text-base">{link.title}</strong>
              {link.description ? <p className="text-[#4f4442] text-sm mt-1 opacity-70">{link.description}</p> : null}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// === CLASSIC LINK BIO v1 (from link_in_bio_1) ===
function LinkBio1({
  profile,
  links,
}: {
  profile: { displayName: string; bio?: string | null; avatarUrl?: string | null };
  links: { id: string; title: string; url: string; description?: string | null; imageUrl?: string | null }[];
}) {
  return (
    <div className="min-h-screen font-['Hanken_Grotesk'] antialiased pb-16" style={{ background: "linear-gradient(180deg, #d4c69c 0%, #fbf9f4 40%)" }}>
      <header className="flex flex-col items-center pt-16 pb-8 px-4">
        {profile.avatarUrl ? (
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
            <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-[#F2EFE9] border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-[#1e0f0b] mb-4">
            {profile.displayName[0]}
          </div>
        )}
        <h1 className="text-3xl font-['EB_Garamond'] font-semibold text-[#1e0f0b]">{profile.displayName}</h1>
        {profile.bio ? <p className="text-[#4f4442] mt-2 text-center max-w-sm">{profile.bio}</p> : null}
      </header>

      <div className="max-w-[480px] mx-auto px-4 grid gap-4">
        {links.map((link) => (
          <a
            key={link.id}
            href={`/api/click/${link.id}`}
            className="block p-4 rounded-2xl backdrop-blur-md border border-[#C7B98B]/20 transition-transform hover:-translate-y-0.5"
            style={{ background: "rgba(242,239,233,0.7)", boxShadow: "0 4px 20px rgba(30,15,11,0.04)" }}
          >
            {link.imageUrl ? (
              <img src={link.imageUrl} alt="" className="w-full h-44 object-cover rounded-xl mb-3" />
            ) : null}
            <strong className="text-[#1e0f0b] font-['EB_Garamond'] text-lg">{link.title}</strong>
            {link.description ? <p className="text-[#4f4442] text-sm mt-1 opacity-70">{link.description}</p> : null}
          </a>
        ))}
      </div>
    </div>
  );
}

// === CLEAN GALLERY (from _3) ===
function CleanGallery({
  profile,
  links,
}: {
  profile: { displayName: string; bio?: string | null; avatarUrl?: string | null };
  links: { id: string; title: string; url: string; description?: string | null; imageUrl?: string | null }[];
}) {
  return (
    <div className="min-h-screen bg-[#fbf9f4] font-['Hanken_Grotesk'] antialiased pb-20">
      <header className="flex flex-col items-center pt-10 pb-6 px-4">
        {profile.avatarUrl ? (
          <div className="w-14 h-14 rounded-full overflow-hidden border border-[#e4e2dd] mb-3">
            <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full bg-[#F2EFE9] border border-[#e4e2dd] flex items-center justify-center text-xl font-bold text-[#1e0f0b] mb-3">
            {profile.displayName[0]}
          </div>
        )}
        <h1 className="text-xl font-['EB_Garamond'] font-semibold text-[#1e0f0b]">{profile.displayName}</h1>
        {profile.bio ? <p className="text-[#4f4442] text-sm mt-1 text-center max-w-xs">{profile.bio}</p> : null}
      </header>

      <div className="max-w-[440px] mx-auto px-4 grid gap-2">
        {links.map((link) => (
          <a
            key={link.id}
            href={`/api/click/${link.id}`}
            className="block p-3 bg-white rounded-lg transition-transform hover:-translate-y-0.5"
            style={{ boxShadow: "0 2px 10px rgba(30,15,11,0.03)" }}
          >
            <div className="flex items-center gap-3">
              {link.imageUrl ? (
                <img src={link.imageUrl} alt="" className="w-10 h-10 rounded object-cover" />
              ) : null}
              <strong className="text-[#1e0f0b] text-sm">{link.title}</strong>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
