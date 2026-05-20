"use client";

import { useState } from "react";
import { subscribeEmail } from "@/app/dashboard/actions";

export function EmailCapture({ linkId }: { linkId: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = new FormData();
    form.set("linkId", linkId);
    form.set("email", email);
    const result = await subscribeEmail(form);
    if (result && "ok" in result) {
      setStatus("ok");
      setMessage("Благодаря! Абонирахте се успешно.");
    } else if (result && "error" in result) {
      setStatus("error");
      setMessage(result.error);
    }
  }

  if (status === "ok") {
    return <div className="email-capture-ok">{message}</div>;
  }

  return (
    <form className="email-capture-form" onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="твоят@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Абонирай се</button>
      {status === "error" ? <small className="email-error">{message}</small> : null}
    </form>
  );
}
