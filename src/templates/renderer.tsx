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
