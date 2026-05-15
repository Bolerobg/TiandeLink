export function BioPreview() {
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
          <div className="avatar">S</div>
          <h1>SaasLink Demo</h1>
          <p>Всички важни линкове, продукти и кампании на едно място.</p>
        </div>
        <div className="bio-links">
          <div className="bio-link featured">
            <strong>Запази безплатна консултация</strong>
            <small>Booking CTA за услуги, коучинг или демо срещи.</small>
          </div>
          <div className="bio-link">
            <strong>Дигитален продукт</strong>
            <small>Място за PDF, курс или шаблон.</small>
          </div>
          <div className="bio-link">
            <strong>Instagram</strong>
          </div>
        </div>
        <div className="footer-brand">Made with SaasLink</div>
      </div>
    </div>
  );
}
