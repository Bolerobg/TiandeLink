"use client";

import { useState } from "react";

export function ShareButton({ profileUrl, displayName }: { profileUrl: string; displayName: string }) {
  const [shared, setShared] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${displayName} - SaasLink`,
          text: `Виж профила на ${displayName}`,
          url: profileUrl,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        // user cancelled
      }
    } else {
      // fallback: copy link
      try {
        await navigator.clipboard.writeText(profileUrl);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        //
      }
    }
  }

  return (
    <button className="tool-button" onClick={handleShare} title="Сподели">
      {shared ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7 0-.24-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
        </svg>
      )}
      {shared ? "Готово" : "Сподели"}
    </button>
  );
}
