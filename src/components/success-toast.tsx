"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";

export function SuccessToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get("ok") === "1") {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        router.replace(pathname);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router, pathname]);

  if (!show) return null;

  return createPortal(
    <div className="toast-overlay" onClick={() => setShow(false)}>
      <div className="toast-card" onClick={(e) => e.stopPropagation()}>
        <span style={{ fontSize: "2.5rem" }}>✓</span>
        <strong>Готово!</strong>
        <small>Промените са запазени успешно.</small>
      </div>
    </div>,
    document.body,
  );
}
