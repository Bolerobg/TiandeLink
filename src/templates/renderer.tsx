type Link = { id: string; title: string; url: string; description?: string | null; imageUrl?: string | null };
type Profile = { displayName: string; bio?: string | null; avatarUrl?: string | null };

function Av({ p }: { p: Profile }) {
  return p.avatarUrl
    ? <img src={p.avatarUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    : <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>{p.displayName[0]}</span>;
}

export function StitchTemplate({ template, profile, links }: { template: string; profile: Profile; links: Link[] }) {
  switch (template) {
    case "bento": return <Bento profile={profile} links={links} />;
    case "wellness": return <Wellness profile={profile} links={links} />;
    case "fullglass": return <FullGlass profile={profile} links={links} />;
    case "neumorph": return <Neumorph profile={profile} links={links} />;
    case "masonry": return <Masonry profile={profile} links={links} />;
    case "linkbio1": return <LinkBio1 profile={profile} links={links} />;
    case "linkbio2": return <LinkBio2 profile={profile} links={links} />;
    case "clean": return <Clean profile={profile} links={links} />;
    case "blobs": return <Blobs profile={profile} links={links} />;
    case "zglass": return <ZGlass profile={profile} links={links} />;
    case "o1": return <O1 profile={profile} links={links} />;
    case "o2": return <O2 profile={profile} links={links} />;
    case "organic": return <OrganicElegance profile={profile} links={links} />;
    case "pinterest": return <Pinterest profile={profile} links={links} />;
    case "notes": return <Notes profile={profile} links={links} />;
    case "twitter": return <Twitter profile={profile} links={links} />;
    case "netflix": return <Netflix profile={profile} links={links} />;
    case "discord": return <Discord profile={profile} links={links} />;
    case "spotify": return <SpotifyWrapped profile={profile} links={links} />;
    case "github": return <GitHub profile={profile} links={links} />;
    case "airbnb": return <Airbnb profile={profile} links={links} />;
    case "chatgpt": return <ChatGPT profile={profile} links={links} />;
    case "arcade": return <Arcade profile={profile} links={links} />;
    default: return <LinkBio2 profile={profile} links={links} />;
  }
}

const T = { p: "#1e0f0b", m: "#4f4442", gold: "#C7B98B", cream: "#fbf9f4", crd: "#F2EFE9" };

function Bento({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: T.cream, fontFamily: "Hanken Grotesk, sans-serif", paddingBottom: 96 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 16px 32px" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", border: `2px solid ${T.gold}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Av p={profile} />
        </div>
        <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: "2rem", fontWeight: 600, color: T.p, marginTop: 16, letterSpacing: "-0.02em" }}>{profile.displayName}</h1>
        {profile.bio && <p style={{ color: T.m, fontStyle: "italic", textAlign: "center", marginTop: 8, maxWidth: 400 }}>{profile.bio}</p>}
      </div>
      <div style={{ maxWidth: 580, margin: "0 auto", padding: "0 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {links.map((link, i) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{
            display: "block", borderRadius: 16, overflow: "hidden", position: "relative",
            gridColumn: i === 0 ? "1 / -1" : "auto", minHeight: i === 0 ? 220 : 140,
            boxShadow: "0 4px 20px rgba(30,15,11,0.05)", border: "none", textDecoration: "none",
          }}>
            {link.imageUrl && <img src={link.imageUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 16, background: link.imageUrl ? "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" : "#fff" }}>
              <strong style={{ fontFamily: "EB Garamond, serif", fontSize: "1.1rem", color: link.imageUrl ? "#fff" : T.p }}>{link.title}</strong>
              {link.description && <small style={{ fontSize: "0.85rem", marginTop: 4, opacity: 0.7, color: link.imageUrl ? "rgba(255,255,255,0.8)" : T.m }}>{link.description}</small>}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function Wellness({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f0e6", fontFamily: "Hanken Grotesk, sans-serif", paddingBottom: 96 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 16px 32px" }}>
        <div style={{ width: 80, height: 80, border: "2px solid #1e0f0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Av p={profile} />
        </div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: T.p, textTransform: "uppercase", letterSpacing: "-0.03em", marginTop: 16 }}>{profile.displayName}</h1>
        {profile.bio && <p style={{ color: T.m, textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: 1, marginTop: 8 }}>{profile.bio}</p>}
      </div>
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 16px", display: "grid", gap: 16 }}>
        {links.map((link) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{
            display: "block", border: "2px solid #1e0f0b", background: "#fff", padding: 20,
            fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", textDecoration: "none", color: T.p, letterSpacing: 1,
          }}>
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
}

function FullGlass({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #fbf9f4 0%, #eae8e3 100%)", fontFamily: "Hanken Grotesk, sans-serif", paddingBottom: 96 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 16px 32px" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", background: "rgba(255,255,255,0.3)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Av p={profile} />
        </div>
        <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: "2rem", fontWeight: 600, color: T.p, marginTop: 16 }}>{profile.displayName}</h1>
        {profile.bio && <p style={{ color: T.m, fontStyle: "italic", textAlign: "center", marginTop: 8, maxWidth: 360 }}>{profile.bio}</p>}
      </div>
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 16px", display: "grid", gap: 12 }}>
        {links.map((link) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{
            display: "block", padding: 20, borderRadius: 16, textDecoration: "none",
            background: "rgba(255,255,255,0.4)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 8px 32px -8px rgba(30,15,11,0.06)",
          }}>
            <strong style={{ fontFamily: "EB Garamond, serif", fontSize: "1.1rem", color: T.p }}>{link.title}</strong>
          </a>
        ))}
      </div>
    </div>
  );
}

function Neumorph({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: T.cream, fontFamily: "Hanken Grotesk, sans-serif", paddingBottom: 96 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 16px 32px" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(145deg, #ffffff, #e6e3dd)",
          boxShadow: "4px 4px 10px rgba(30,15,11,0.04), -4px -4px 10px rgba(255,255,255,0.8)",
        }}>
          <Av p={profile} />
        </div>
        <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: "2rem", fontWeight: 600, color: T.p, marginTop: 16 }}>{profile.displayName}</h1>
        {profile.bio && <p style={{ color: T.m, fontStyle: "italic", textAlign: "center", marginTop: 8, maxWidth: 360 }}>{profile.bio}</p>}
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px", display: "grid", gap: 16 }}>
        {links.map((link) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{
            display: "block", padding: 20, borderRadius: 12, textDecoration: "none",
            background: "linear-gradient(145deg, #ffffff, #e6e3dd)",
            boxShadow: "4px 4px 10px rgba(30,15,11,0.04), -4px -4px 10px rgba(255,255,255,0.8)",
          }}>
            <strong style={{ fontFamily: "EB Garamond, serif", fontSize: "1.1rem", color: T.p }}>{link.title}</strong>
          </a>
        ))}
      </div>
    </div>
  );
}

function Masonry({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fafaf9", fontFamily: "EB Garamond, serif", paddingBottom: 96 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 16px 32px" }}>
        <h1 style={{ fontSize: "2.8rem", fontWeight: 700, color: T.p, borderBottom: "2px solid #e7e5e4", paddingBottom: 16, marginBottom: 12 }}>{profile.displayName}</h1>
        {profile.bio && <p style={{ color: T.m, fontStyle: "italic", fontSize: "1.1rem", textAlign: "center", maxWidth: 400 }}>{profile.bio}</p>}
      </div>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px", columns: "2 240px", columnGap: 12 }}>
        {links.map((link) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{
            display: "block", breakInside: "avoid", marginBottom: 12, background: "#fff", borderRadius: 4, overflow: "hidden",
            border: "1px solid #e7e5e4", boxShadow: "0 2px 12px rgba(30,15,11,0.03)", textDecoration: "none",
          }}>
            {link.imageUrl && <img src={link.imageUrl} alt="" style={{ width: "100%" }} />}
            <div style={{ padding: 16 }}>
              <strong style={{ color: T.p, fontSize: "1rem" }}>{link.title}</strong>
              {link.description && <p style={{ color: T.m, fontSize: "0.85rem", marginTop: 4, opacity: 0.7 }}>{link.description}</p>}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function LinkBio1({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #d4c69c 0%, #fbf9f4 40%)", fontFamily: "Hanken Grotesk, sans-serif", paddingBottom: 64 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 16px 32px" }}>
        <div style={{ width: 96, height: 96, borderRadius: "50%", overflow: "hidden", border: "4px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", background: T.crd }}>
          <Av p={profile} />
        </div>
        <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: "2rem", fontWeight: 600, color: T.p, marginTop: 16 }}>{profile.displayName}</h1>
        {profile.bio && <p style={{ color: T.m, marginTop: 8, textAlign: "center", maxWidth: 360 }}>{profile.bio}</p>}
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px", display: "grid", gap: 16 }}>
        {links.map((link) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{
            display: "block", padding: 16, borderRadius: 16, textDecoration: "none",
            background: "rgba(242,239,233,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(199,185,139,0.2)", boxShadow: "0 4px 20px rgba(30,15,11,0.04)",
          }}>
            <strong style={{ fontFamily: "EB Garamond, serif", fontSize: "1.1rem", color: T.p }}>{link.title}</strong>
          </a>
        ))}
      </div>
    </div>
  );
}

function LinkBio2({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: T.cream, fontFamily: "Hanken Grotesk, sans-serif", paddingBottom: 64 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 16px 32px" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", border: `2px solid ${T.gold}`, display: "flex", alignItems: "center", justifyContent: "center", background: T.crd }}>
          <Av p={profile} />
        </div>
        <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: "1.8rem", fontWeight: 600, color: T.p, marginTop: 16 }}>{profile.displayName}</h1>
        {profile.bio && <p style={{ color: T.m, marginTop: 8, textAlign: "center", maxWidth: 360 }}>{profile.bio}</p>}
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px", display: "grid", gap: 12 }}>
        {links.map((link) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{
            display: "block", padding: 16, borderRadius: 16, textDecoration: "none",
            background: "#f0eee9", boxShadow: "0 2px 12px rgba(30,15,11,0.04)",
          }}>
            <strong style={{ fontFamily: "EB Garamond, serif", fontSize: "1.1rem", color: T.p }}>{link.title}</strong>
          </a>
        ))}
      </div>
    </div>
  );
}

function Clean({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: T.cream, fontFamily: "Hanken Grotesk, sans-serif", paddingBottom: 80 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 16px 24px" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", border: "1px solid #e4e2dd", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Av p={profile} />
        </div>
        <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: "1.3rem", fontWeight: 600, color: T.p, marginTop: 12 }}>{profile.displayName}</h1>
        {profile.bio && <p style={{ color: T.m, fontSize: "0.85rem", marginTop: 4, textAlign: "center", maxWidth: 280 }}>{profile.bio}</p>}
      </div>
      <div style={{ maxWidth: 440, margin: "0 auto", padding: "0 16px", display: "grid", gap: 8 }}>
        {links.map((link) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#fff", borderRadius: 8, textDecoration: "none",
            boxShadow: "0 2px 10px rgba(30,15,11,0.03)",
          }}>
            {link.imageUrl && <img src={link.imageUrl} alt="" style={{ width: 40, height: 40, borderRadius: 4, objectFit: "cover" }} />}
            <strong style={{ color: T.p, fontSize: "0.9rem" }}>{link.title}</strong>
          </a>
        ))}
      </div>
    </div>
  );
}

function Blobs({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: T.cream, fontFamily: "Hanken Grotesk, sans-serif", paddingBottom: 96 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 16px 32px" }}>
        <div style={{ width: 80, height: 80, borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", overflow: "hidden", border: `2px solid ${T.gold}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Av p={profile} />
        </div>
        <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: "2rem", fontWeight: 600, color: T.p, marginTop: 16 }}>{profile.displayName}</h1>
        {profile.bio && <p style={{ color: T.m, fontStyle: "italic", textAlign: "center", marginTop: 8, maxWidth: 360 }}>{profile.bio}</p>}
      </div>
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 16px", display: "grid", gap: 16 }}>
        {links.map((link, i) => {
          const shapes = ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "50% 50% 45% 55% / 55% 45% 55% 45%"];
          return (
            <a key={link.id} href={`/api/click/${link.id}`} style={{
              display: "block", padding: 20, borderRadius: shapes[i % 3], textDecoration: "none",
              background: "#fff", boxShadow: "0 4px 20px rgba(30,15,11,0.04)",
            }}>
              <strong style={{ fontFamily: "EB Garamond, serif", fontSize: "1.1rem", color: T.p }}>{link.title}</strong>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function ZGlass({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: T.cream, fontFamily: "Hanken Grotesk, sans-serif", paddingBottom: 96 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 16px 32px" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", border: `2px solid ${T.gold}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Av p={profile} />
        </div>
        <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: "2rem", fontWeight: 600, color: T.p, marginTop: 16 }}>{profile.displayName}</h1>
        {profile.bio && <p style={{ color: T.m, fontStyle: "italic", textAlign: "center", marginTop: 8, maxWidth: 360 }}>{profile.bio}</p>}
      </div>
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 16px", display: "grid", gap: 16 }}>
        {links.map((link, i) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{
            display: "block", padding: 16, borderRadius: 16, textDecoration: "none", transform: i % 2 === 0 ? "translateX(-4px)" : "translateX(4px)",
            background: "rgba(242,239,233,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(199,185,139,0.15)", boxShadow: "0 10px 40px -8px rgba(30,15,11,0.08)",
          }}>
            <strong style={{ fontFamily: "EB Garamond, serif", fontSize: "1.1rem", color: T.p }}>{link.title}</strong>
          </a>
        ))}
      </div>
    </div>
  );
}

function O1({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fff8f3", fontFamily: "DM Sans, sans-serif", paddingBottom: 96 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 16px 32px" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(119,90,25,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Av p={profile} />
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 400, color: "#181512", marginTop: 16 }}>{profile.displayName}</h1>
        {profile.bio && <p style={{ color: "rgba(24,21,18,0.6)", textAlign: "center", marginTop: 8, maxWidth: 360 }}>{profile.bio}</p>}
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px", display: "grid", gap: 12 }}>
        {links.map((link) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{
            display: "block", padding: 20, borderRadius: 8, textDecoration: "none",
            background: "#fffaf5", border: "1px solid rgba(119,90,25,0.15)", boxShadow: "0 2px 16px -2px rgba(0,0,0,0.04)",
          }}>
            <strong style={{ color: "#181512", fontSize: "1rem" }}>{link.title}</strong>
          </a>
        ))}
      </div>
    </div>
  );
}

function O2({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "#FFF8F3", fontFamily: "DM Sans, sans-serif", paddingBottom: 96 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 16px 32px" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(119,90,25,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Av p={profile} />
        </div>
        <h1 style={{ fontSize: "2.4rem", fontWeight: 500, color: "#181512", letterSpacing: "-0.02em", marginTop: 16 }}>{profile.displayName}</h1>
        {profile.bio && <p style={{ color: "rgba(24,21,18,0.6)", textAlign: "center", marginTop: 8, maxWidth: 360, lineHeight: 1.7 }}>{profile.bio}</p>}
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px", display: "grid", gap: 16 }}>
        {links.map((link) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{
            display: "block", padding: "16px 20px", borderRadius: 4, textDecoration: "none",
            background: "#fffaf5", border: "1px solid rgba(119,90,25,0.1)", transition: "box-shadow 0.2s",
          }}>
            <strong style={{ color: "#181512", fontSize: "1rem" }}>{link.title}</strong>
          </a>
        ))}
      </div>
    </div>
  );
}

function OrganicElegance({ profile, links }: { profile: Profile; links: Link[] }) {
  const s = { boxShadow: "0 4px 20px rgba(30,15,11,0.05)" };
  return (
    <div style={{ minHeight: "100vh", background: "#fbf9f4", color: "#1e0f0b", fontFamily: "Hanken Grotesk, sans-serif" }}>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(251,249,244,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.05)", padding: "12px 16px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", border: "1px solid #d3c3bf", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Av p={profile} />
          </div>
          <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>{profile.displayName}</h1>
        </div>
      </div>
      <div style={{ height: 96 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px" }}>
        {profile.bio && (
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.75, color: "#4f4442", fontStyle: "italic", maxWidth: 640, margin: "0 auto 24px" }}>{profile.bio}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              {["photo_camera","play_arrow","thumb_up","chat"].map((icon) => (
                <div key={icon} style={{ width: 48, height: 48, borderRadius: "50%", background: "#F2EFE9", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(211,195,191,0.3)", ...s }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#1e0f0b" }}>{icon}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24, marginBottom: 96 }}>
          {links.length > 0 && (
            <a href={`/api/click/${links[0].id}`} style={{ gridColumn: "1/-1", display: "block", position: "relative", minHeight: "55vh", borderRadius: "2rem", overflow: "hidden", ...s }}>
              {links[0].imageUrl && <img src={links[0].imageUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
              <div style={{ position: "absolute", inset: 0, background: links[0].imageUrl ? "linear-gradient(to top, rgba(30,15,11,0.8), rgba(30,15,11,0.2), transparent)" : "#F2EFE9", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", padding: 32, textAlign: "center" }}>
                <h2 style={{ fontFamily: "EB Garamond, serif", fontSize: "3rem", fontWeight: 500, color: links[0].imageUrl ? "#fff" : "#1e0f0b", letterSpacing: "-0.02em", textShadow: links[0].imageUrl ? "0 2px 8px rgba(0,0,0,0.3)" : "none" }}>{links[0].title}</h2>
              </div>
            </a>
          )}
          {links.length > 1 && (
            <a href={`/api/click/${links[1].id}`} style={{ gridColumn: "span 2", display: "block", position: "relative", height: 320, borderRadius: "2rem", overflow: "hidden", ...s, background: "#F2EFE9" }}>
              {links[1].imageUrl && <img src={links[1].imageUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }} />}
              <div style={{ position: "absolute", inset: 0, background: links[1].imageUrl ? "linear-gradient(to top, rgba(251,249,244,0.9), rgba(251,249,244,0.1))" : "transparent", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 24 }}>
                <h3 style={{ fontFamily: "EB Garamond, serif", fontSize: "1.5rem", fontWeight: 500, color: "#1e0f0b", marginBottom: 12 }}>{links[1].title}</h3>
                <span style={{ display: "inline-flex", justifyContent: "center", background: "#1e0f0b", color: "#fff", padding: "12px 24px", borderRadius: 999, maxWidth: 160, fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>ВИЖ ПОВЕЧЕ</span>
              </div>
            </a>
          )}
          {links.length > 2 && (
            <a href={`/api/click/${links[2].id}`} style={{ display: "block", position: "relative", height: 320, borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%", overflow: "hidden", ...s, background: "#F2EFE9" }}>
              {links[2].imageUrl && <img src={links[2].imageUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />}
              <div style={{ position: "relative", zIndex: 10, background: "rgba(242,239,233,0.4)", backdropFilter: "blur(12px)", borderRadius: "50%", padding: 24, textAlign: "center", width: "80%", height: "80%", margin: "10% auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid rgba(30,15,11,0.15)" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 32, color: "#1e0f0b", marginBottom: 8 }}>auto_awesome</span>
                <h3 style={{ fontFamily: "EB Garamond, serif", fontSize: "1.5rem", fontWeight: 500, color: "#1e0f0b", lineHeight: 1.3 }}>{links[2].title}</h3>
              </div>
            </a>
          )}
          {links.slice(3).map((link, i) => {
            const layouts = [
              { dir: "column" as const, r: "2rem", col: "span 1", bg: "#F2EFE9", c: "#1e0f0b" },
              { dir: "row" as const, r: "50%", col: "span 2", bg: "#F2EFE9", c: "#1e0f0b" },
              { dir: "column" as const, r: "60% 40% 30% 70% / 60% 30% 70% 40%", col: "span 2", bg: "#b8ab83", c: "#483f20", badge: true },
            ];
            const lt = layouts[i % 3];
            return (
              <a key={link.id} href={`/api/click/${link.id}`} style={{
                display: "flex", flexDirection: lt.dir, position: "relative", height: 256, overflow: "hidden",
                borderRadius: lt.r, ...s, background: lt.bg, color: lt.c,
                gridColumn: lt.col, alignItems: lt.dir === "row" ? "center" : "stretch",
                paddingLeft: lt.dir === "row" ? 32 : 0, paddingRight: lt.dir === "row" ? 16 : 0,
              }}>
                {link.imageUrl && (
                  <div style={{ overflow: "hidden", flexShrink: 0,
                    width: lt.dir === "row" ? 160 : "100%", height: lt.dir === "row" ? 160 : "50%",
                    borderRadius: lt.dir === "row" ? "50%" : "0", border: lt.dir === "row" ? "4px solid #fbf9f4" : "none",
                    ...(lt.badge ? { position: "absolute", inset: 0 } : {}),
                  }}>{<img src={link.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: lt.badge ? 0.4 : 1 }} />}</div>
                )}
                <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", zIndex: lt.badge ? 10 : "auto", position: lt.badge ? "relative" : "static" }}>
                  {lt.badge && <span style={{ padding: "4px 12px", background: "rgba(251,249,244,0.5)", borderRadius: 999, fontSize: "0.75rem", fontWeight: 500, marginBottom: 12, backdropFilter: "blur(4px)", display: "inline-block", width: "fit-content" }}>Ново</span>}
                  <h4 style={{ fontFamily: "EB Garamond, serif", fontSize: "1.2rem", fontWeight: 500 }}>{link.title}</h4>
                  {link.description && <p style={{ fontSize: "0.9rem", opacity: 0.7, marginTop: 8, lineHeight: 1.5 }}>{link.description}</p>}
                </div>
              </a>
            );
          })}
        </div>
        {profile.bio && (
          <div style={{ marginBottom: 48, borderRadius: "3rem", overflow: "hidden", position: "relative", ...s }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(30,15,11,0.9)", zIndex: 0 }} />
            <div style={{ position: "relative", zIndex: 10, padding: "80px 32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(242,239,233,0.4)", backdropFilter: "blur(12px)", borderRadius: "3rem", margin: 16, border: "1px solid rgba(251,249,244,0.2)" }}>
              <h2 style={{ fontFamily: "EB Garamond, serif", fontSize: "3rem", fontWeight: 500, color: "#fff", letterSpacing: "-0.02em", marginBottom: 24 }}>СТАНИ ЕДНА ОТ НАС</h2>
              <p style={{ fontSize: "1.1rem", color: "#e4e2dd", maxWidth: 480, marginBottom: 40 }}>{profile.bio}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── PINTEREST MASONRY ─── */
function Pinterest({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "-apple-system, sans-serif" }}>
      <div style={{ padding: "24px 16px", textAlign: "center" }}>
        {profile.avatarUrl && (
          <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", margin: "0 auto 8px" }}>
            <Av p={profile} />
          </div>
        )}
        <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111" }}>{profile.displayName}</h1>
        {profile.bio && <p style={{ color: "#767676", fontSize: "0.85rem", marginTop: 4 }}>{profile.bio}</p>}
      </div>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 12px", columns: "2 150px", columnGap: 12 }}>
        {links.map((link) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{
            display: "block", breakInside: "avoid", marginBottom: 12, borderRadius: 16, overflow: "hidden",
            position: "relative", background: "#f0f0f0", textDecoration: "none",
          }}>
            {link.imageUrl && <img src={link.imageUrl} alt="" style={{ width: "100%", display: "block" }} />}
            <div style={{ position: "absolute", top: 8, right: 8, width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1rem" }}>
              ♡
            </div>
            {!link.imageUrl && (
              <div style={{ padding: 16, minHeight: 80 }}>
                <strong style={{ fontSize: "0.85rem", color: "#111" }}>{link.title}</strong>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── APPLE NOTES ─── */
function Notes({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fffef2", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "32px 16px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 400, color: "#2c2c2c", marginBottom: 4 }}>📝 {profile.displayName}</h1>
          {profile.bio && <p style={{ color: "#888", fontSize: "0.9rem", fontStyle: "italic" }}>{profile.bio}</p>}
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {links.map((link, i) => (
            <a key={link.id} href={`/api/click/${link.id}`} style={{
              display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 0",
              borderBottom: "1px dashed #ddd", textDecoration: "none", color: "#2c2c2c",
            }}>
              <span style={{ fontSize: "1.2rem", lineHeight: 1.4 }}>{i % 3 === 0 ? "☐" : i % 3 === 1 ? "★" : "•"}</span>
              <div>
                <strong style={{ fontSize: "0.95rem", display: "block" }}>{link.title}</strong>
                {link.description && <small style={{ color: "#888", fontSize: "0.8rem" }}>{link.description}</small>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── TWITTER/X FEED ─── */
function Twitter({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#e7e9ea", fontFamily: "-apple-system, sans-serif" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "12px 16px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "16px 0", borderBottom: "1px solid #2f3336" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid #1d9bf0" }}>
            <Av p={profile} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <strong style={{ fontSize: "0.95rem" }}>{profile.displayName}</strong>
              <span style={{ background: "#1d9bf0", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700 }}>✓</span>
              <span style={{ color: "#71767b", fontSize: "0.85rem", marginLeft: 4 }}>@{(profile.displayName || "").toLowerCase().replace(/\s/g,"")}</span>
            </div>
            {profile.bio && <p style={{ color: "#e7e9ea", fontSize: "0.9rem", marginTop: 4 }}>{profile.bio}</p>}
          </div>
        </div>
        <div style={{ display: "grid", gap: 1, background: "#16181c", borderRadius: 16, overflow: "hidden", marginTop: 8 }}>
          {links.map((link, i) => (
            <a key={link.id} href={`/api/click/${link.id}`} style={{
              display: "block", padding: "14px 16px", background: "#000", textDecoration: "none", color: "#e7e9ea",
              borderBottom: i < links.length - 1 ? "1px solid #2f3336" : "none",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: "0.9rem" }}>{link.title}</strong>
                <div style={{ display: "flex", gap: 20, color: "#71767b", fontSize: "0.8rem" }}>
                  <span>💬 {Math.floor(Math.random()*99)}</span>
                  <span>🔄 {Math.floor(Math.random()*99)}</span>
                  <span>❤️ {Math.floor(Math.random()*999)}</span>
                </div>
              </div>
              {link.description && <p style={{ color: "#71767b", fontSize: "0.8rem", marginTop: 4 }}>{link.description}</p>}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── NETFLIX CARD ROW ─── */
function Netflix({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "#141414", color: "#fff", fontFamily: "-apple-system, sans-serif" }}>
      <div style={{ padding: "16px 16px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {profile.avatarUrl && (
            <div style={{ width: 36, height: 36, borderRadius: 4, overflow: "hidden" }}>
              <Av p={profile} />
            </div>
          )}
          <h1 style={{ fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{profile.displayName}</h1>
        </div>
        {profile.bio && <p style={{ color: "#b3b3b3", fontSize: "0.85rem", marginTop: 8 }}>{profile.bio}</p>}
      </div>
      <div style={{ overflowX: "auto", padding: "8px 16px", display: "flex", gap: 8 }}>
        {links.map((link) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{
            flexShrink: 0, width: 200, borderRadius: 6, overflow: "hidden", textDecoration: "none",
            position: "relative", transition: "transform 0.2s",
          }}>
            <div style={{ position: "relative", height: 280, background: link.imageUrl ? "transparent" : "#333" }}>
              {link.imageUrl ? <img src={link.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}><strong style={{ fontSize: "0.9rem" }}>{link.title}</strong></div>
              }
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 48, height: 48, borderRadius: "50%", background: "rgba(229,9,20,0.9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                ▶
              </div>
            </div>
            {link.imageUrl && <p style={{ marginTop: 6, fontSize: "0.8rem", color: "#b3b3b3" }}>{link.title}</p>}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── DISCORD CHANNEL ─── */
function Discord({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "#313338", color: "#dbdee1", fontFamily: "-apple-system, sans-serif" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ padding: "16px", borderBottom: "1px solid #1e1f22", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#80848e", fontSize: "1.3rem" }}>#</span>
          <h1 style={{ fontFamily: "monospace", fontSize: "1rem", fontWeight: 700, margin: 0 }}>{profile.displayName.toLowerCase().replace(/\s/g,"-")}</h1>
        </div>
        <div style={{ padding: "16px" }}>
          {profile.bio && (
            <div style={{ padding: "12px 0", marginBottom: 8, borderBottom: "1px solid #1e1f22" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", background: "#5865f2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Av p={profile} /></span>
                <div>
                  <strong style={{ fontSize: "0.9rem" }}>{profile.displayName}</strong>
                  <span style={{ color: "#80848e", fontSize: "0.75rem", marginLeft: 6 }}>днес в {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2,'0')}</span>
                </div>
              </div>
              <p style={{ color: "#dbdee1", fontSize: "0.85rem", marginLeft: 48, lineHeight: 1.5 }}>{profile.bio}</p>
            </div>
          )}
          {links.map((link, i) => (
            <a key={link.id} href={`/api/click/${link.id}`} style={{
              display: "flex", padding: "4px 8px", borderRadius: 4, textDecoration: "none", color: "#dbdee1",
            }}>
              <span style={{ color: "#80848e", fontSize: "0.75rem", width: 48, flexShrink: 0, textAlign: "right", paddingRight: 8, paddingTop: 4 }}>
                {String(new Date().getHours()).padStart(2,'0')}:{String(Math.min(new Date().getMinutes()+i*3, 59)).padStart(2,'0')}
              </span>
              <div>
                <strong style={{ fontSize: "0.82rem" }}>{link.title}</strong>
                {link.imageUrl && <img src={link.imageUrl} alt="" style={{ maxWidth: 300, borderRadius: 4, marginTop: 4, display: "block" }} />}
                {link.description && <p style={{ color: "#80848e", fontSize: "0.78rem", marginTop: 2 }}>{link.description}</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SPOTIFY WRAPPED ─── */
function SpotifyWrapped({ profile, links }: { profile: Profile; links: Link[] }) {
  const gradients = ["linear-gradient(135deg, #1db954, #191414)", "linear-gradient(135deg, #e91e63, #ff9800)", "linear-gradient(135deg, #3f51b5, #00bcd4)", "linear-gradient(135deg, #ff5722, #ffc107)"];
  return (
    <div style={{ minHeight: "100vh", background: "#191414", color: "#fff", fontFamily: "-apple-system, sans-serif", paddingBottom: 48 }}>
      <div style={{ textAlign: "center", padding: "48px 16px 32px" }}>
        <h1 style={{ fontSize: "0.75rem", letterSpacing: 4, textTransform: "uppercase", opacity: 0.6, marginBottom: 8 }}>2024 Wrapped</h1>
        <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", margin: "0 auto 12px", border: "3px solid #1db954" }}>
          <Av p={profile} />
        </div>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.04em" }}>{profile.displayName}</h2>
        {profile.bio && <p style={{ opacity: 0.5, fontSize: "0.9rem", marginTop: 4 }}>{profile.bio}</p>}
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px", display: "grid", gap: 12 }}>
        {links.map((link, i) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{
            display: "block", padding: 24, borderRadius: 16, textDecoration: "none", color: "#fff",
            background: gradients[i % gradients.length], position: "relative", overflow: "hidden",
          }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: 3, textTransform: "uppercase", opacity: 0.7, marginBottom: 4 }}>TOP {i+1}</div>
            <strong style={{ fontSize: "1.4rem", fontWeight: 800 }}>{link.title}</strong>
            {link.description && <p style={{ opacity: 0.6, fontSize: "0.8rem", marginTop: 4 }}>{link.description}</p>}
            <div style={{ position: "absolute", right: -20, bottom: -10, fontSize: "8rem", fontWeight: 900, opacity: 0.1 }}>{i+1}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── GITHUB REPO CARDS ─── */
function GitHub({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", color: "#c9d1d9", fontFamily: "monospace" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", border: "1px solid #30363d" }}>
            <Av p={profile} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.2rem", fontWeight: 600, margin: 0 }}>{profile.displayName}</h1>
            {profile.bio && <p style={{ color: "#8b949e", fontSize: "0.8rem", margin: 0 }}>{profile.bio}</p>}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {links.map((link) => (
            <a key={link.id} href={`/api/click/${link.id}`} style={{
              display: "block", padding: 16, borderRadius: 6, textDecoration: "none", color: "#c9d1d9",
              border: "1px solid #30363d", background: "#161b22",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ color: "#8b949e", fontSize: "0.9rem" }}>📁</span>
                <strong style={{ color: "#58a6ff", fontSize: "0.85rem" }}>{link.title}</strong>
                <span style={{ marginLeft: "auto", border: "1px solid #30363d", borderRadius: 12, padding: "0 8px", fontSize: "0.7rem", color: "#8b949e" }}>Public</span>
              </div>
              {link.description && <p style={{ color: "#8b949e", fontSize: "0.75rem", lineHeight: 1.4 }}>{link.description}</p>}
              <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: "0.72rem", color: "#8b949e" }}>
                <span>⭐ {Math.floor(Math.random()*999)}</span>
                <span>⑂ {Math.floor(Math.random()*99)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── AIRBNB CARDS ─── */
function Airbnb({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "-apple-system, sans-serif" }}>
      <div style={{ padding: "24px 16px 8px", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#222" }}>{profile.displayName}</h1>
        {profile.bio && <p style={{ color: "#717171", fontSize: "0.85rem", marginTop: 4 }}>{profile.bio}</p>}
      </div>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {links.map((link) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{ textDecoration: "none", color: "#222" }}>
            <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: "1", background: link.imageUrl ? "transparent" : "#f7f7f7" }}>
              {link.imageUrl ? <img src={link.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}><strong>{link.title}</strong></div>}
              <div style={{ position: "absolute", top: 12, right: 12, fontSize: "1.4rem" }}>♡</div>
            </div>
            {link.imageUrl && (
              <div style={{ padding: "8px 0" }}>
                <strong style={{ fontSize: "0.85rem", display: "block" }}>{link.title}</strong>
                {link.description && <span style={{ color: "#717171", fontSize: "0.78rem" }}>{link.description}</span>}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── CHATGPT-STYLE ─── */
function ChatGPT({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "#343541", color: "#ececf1", fontFamily: "-apple-system, sans-serif" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px" }}>
        <div style={{ padding: "16px", borderRadius: 12, background: "#444654", marginBottom: 16, display: "flex", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 4, background: "#19c37d", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem", color: "#fff" }}>🤖</div>
          <div>
            <p style={{ margin: 0, lineHeight: 1.6, fontSize: "0.9rem" }}>Здравей! Аз съм профилът на <strong style={{ color: "#19c37d" }}>{profile.displayName}</strong>. Ето какво мога да ти покажа:</p>
          </div>
        </div>
        {links.map((link, i) => (
          <div key={link.id} style={{ padding: "12px 16px", borderRadius: 12, background: "#3e3f4b", marginBottom: 8 }}>
            <a href={`/api/click/${link.id}`} style={{ textDecoration: "none", color: "#ececf1", display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ color: "#19c37d", fontSize: "0.9rem", flexShrink: 0 }}>▸</span>
              <div>
                <strong style={{ fontSize: "0.9rem", display: "block" }}>{link.title}</strong>
                {link.description && <p style={{ color: "#8e8ea0", fontSize: "0.78rem", marginTop: 2, lineHeight: 1.4 }}>{link.description}</p>}
              </div>
            </a>
          </div>
        ))}
        <div style={{ padding: "8px", opacity: 0.3, textAlign: "center", fontSize: "0.75rem" }}>
          <span style={{ animation: "blink 1s infinite" }}>▌</span> Генериране...
        </div>
      </div>
    </div>
  );
}

/* ─── ARCADE / RETRO GAME ─── */
function Arcade({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a2e", color: "#0ff", fontFamily: "monospace", imageRendering: "pixelated", paddingBottom: 48 }}>
      <div style={{ textAlign: "center", padding: "32px 16px 16px" }}>
        <div style={{ width: 80, height: 80, margin: "0 auto 12px", border: "4px solid #f0f", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 56, height: 56, border: "4px solid #0ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Av p={profile} />
          </div>
        </div>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#f0f", textShadow: "3px 3px 0 #0ff", letterSpacing: 2, textTransform: "uppercase" }}>{profile.displayName}</h1>
        {profile.bio && <p style={{ color: "#0ff", fontSize: "0.8rem", marginTop: 8 }}>{profile.bio}</p>}
        <div style={{ marginTop: 8, fontSize: "0.7rem", color: "#f0f", border: "2px solid #0ff", display: "inline-block", padding: "4px 12px" }}>
          SCORE: {links.length.toString().padStart(6,"0")}
        </div>
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px", display: "grid", gap: 8 }}>
        {links.map((link, i) => (
          <a key={link.id} href={`/api/click/${link.id}`} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", textDecoration: "none", color: "#0ff",
            border: "3px solid #f0f", background: "rgba(255,0,255,0.05)", imageRendering: "pixelated",
          }}>
            <span style={{ fontSize: "1.3rem" }}>{i % 5 === 0 ? "💎" : i % 5 === 1 ? "👾" : i % 5 === 2 ? "🕹" : i % 5 === 3 ? "⭐" : "🎯"}</span>
            <div style={{ flex: 1 }}>
              <strong style={{ textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: 1, color: "#f0f", textShadow: "1px 1px 0 #0ff" }}>{link.title}</strong>
              {link.description && <p style={{ color: "#0ff", fontSize: "0.72rem", marginTop: 2 }}>{link.description}</p>}
            </div>
            <span style={{ fontSize: "1.2rem" }}>▶</span>
          </a>
        ))}
      </div>
    </div>
  );
}
