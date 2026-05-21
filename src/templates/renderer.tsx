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
