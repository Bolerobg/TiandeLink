type PreviewLink = {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  spotlight?: boolean;
};

type BioPreviewProps = {
  displayName?: string;
  bio?: string | null;
  avatarUrl?: string | null;
  footerBrand?: boolean;
  links?: PreviewLink[];
};

const fallbackLinks: PreviewLink[] = [
  {
    title: "ЖЪЛТИ ЗЪБИ (КАФЕ,ЦИГАРИ,ВИНО) ВЕЧЕ НЕ",
    description: "Паста за зъби Extra White Pro",
    imageUrl: "https://picsum.photos/seed/tooth/120/120",
  },
  {
    title: "СЕРИЯ ЗА БЪРЗ РАСТЕЖ НА КОСАТА",
    description: "Против косопад",
    imageUrl: "https://picsum.photos/seed/hair/120/120",
  },
  {
    title: "ГОРЕЛКА ЗА МАЗНИНИ",
    description: "Премахва стрии и топи целулит",
    imageUrl: "https://picsum.photos/seed/fatburn/120/120",
  },
];

export function BioPreview({
  displayName = "SaasLink Demo",
  bio = "Всички важни линкове, продукти и кампании на едно място.",
  avatarUrl,
  footerBrand = true,
  links = fallbackLinks,
}: BioPreviewProps) {
  return (
    <div
      className="bio-page"
      style={{
        minHeight: 620,
        border: "1px solid var(--line)",
        borderRadius: 8,
        background: "#f5f0eb",
        ["--profile-background" as string]: "#f5f0eb",
        ["--profile-surface" as string]: "#ffffff",
        ["--profile-text" as string]: "#1a1a2e",
        ["--profile-accent" as string]: "#d4a574",
      }}
    >
      <div className="bio-card">
        <div className="bio-header">
          <div className="avatar">
            {avatarUrl ? <img alt="" src={avatarUrl} /> : displayName.slice(0, 1).toUpperCase()}
          </div>
          <h1>{displayName}</h1>
          {bio ? <p>{bio}</p> : null}
        </div>
        <div className="bio-links">
          {links.map((link) => (
            <div className="linktree-card" key={link.title}>
              {link.imageUrl ? (
                <div className="linktree-thumb">
                  <img alt="" src={link.imageUrl} loading="lazy" />
                </div>
              ) : null}
              <div className="linktree-body">
                <strong>{link.title}</strong>
                {link.description ? <small>{link.description}</small> : null}
              </div>
            </div>
          ))}
        </div>
        {footerBrand ? <div className="footer-brand">Made with SaasLink</div> : null}
      </div>
    </div>
  );
}
