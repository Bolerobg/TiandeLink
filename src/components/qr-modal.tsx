"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

export function QrModal({ qrUrl, profileUrl }: { qrUrl: string; profileUrl: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="tool-button" onClick={() => setOpen(true)} title="QR код">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" /><rect x="15" y="15" width="1" height="1" />
          <rect x="18" y="15" width="1" height="1" /><rect x="21" y="15" width="1" height="1" />
          <rect x="15" y="18" width="1" height="1" /><rect x="18" y="18" width="3" height="1" />
          <rect x="15" y="21" width="1" height="1" /><rect x="18" y="21" width="1" height="1" />
        </svg>
        QR
      </button>
      {open &&
        createPortal(
          <div className="qr-overlay" onClick={() => setOpen(false)}>
            <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
              <button className="qr-close" onClick={() => setOpen(false)}>&times;</button>
              <h3>Сканирай QR кода</h3>
              <img src={qrUrl} alt="QR код" style={{ width: 200, height: 200, display: "block", margin: "0 auto" }} />
              <p style={{ marginTop: 12, fontSize: "0.85rem", opacity: 0.7, wordBreak: "break-all", textAlign: "center" }}>
                {profileUrl}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
