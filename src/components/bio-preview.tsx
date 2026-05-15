type PreviewLink = {
  title: string;
  description?: string | null;
  spotlight?: boolean;
};

type BioPreviewProps = {
  displayName?: string;
  bio?: string | null;
  links?: PreviewLink[];
};

const fallbackLinks: PreviewLink[] = [
  {
    title: "Запази безплатна консултация",
    description: "Booking CTA за услуги, коучинг или демо срещи.",
    spotlight: true,
  },
  {
    title: "Дигитален продукт",
    description: "Място за PDF, курс или шаблон.",
  },
  {
    title: "Instagram",
  },
];

export function BioPreview({
  displayName = "SaasLink Demo",
  bio = "Всички важни линкове, продукти и кампании на едно място.",
  links = fallbackLinks,
}: BioPreviewProps) {
  return (
    <div
      className="bio-page"
      style={{
        minHeight: 620,
        border: "1px solid var(--line)",
        borderRadius: 8,
        background: "#0b1120",
        ["--profile-background" as string]: "#0b1120",
        ["--profile-surface" as string]: "#111827",
        ["--profile-text" as string]: "#f8fafc",
        ["--profile-accent" as string]: "#22c55e",
      }}
    >
      <div className="bio-card">
        <div className="bio-header">
          <div className="avatar">{displayName.slice(0, 1).toUpperCase()}</div>
          <h1>{displayName}</h1>
          {bio ? <p>{bio}</p> : null}
        </div>
        <div className="bio-links">
          {links.map((link) => (
            <div className={`bio-link ${link.spotlight ? "featured" : ""}`} key={link.title}>
              <strong>{link.title}</strong>
              {link.description ? <small>{link.description}</small> : null}
            </div>
          ))}
        </div>
        <div className="footer-brand">Made with SaasLink</div>
      </div>
    </div>
  );
}
