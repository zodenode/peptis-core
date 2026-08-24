"use client";

import { FormEvent, useState } from "react";

export function ContinuityForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !consent) return;
    setStatus("saving");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, goal: "recomp", source: "peptis-glp1-continuity" }),
      });
      setStatus(response.ok ? "saved" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "saved") {
    return (
      <div className={`continuity-form success ${compact ? "compact" : ""}`} role="status">
        <span>YOU&apos;RE ON THE FOUNDING LIST</span>
        <strong>We&apos;ll send the continuity programme brief and launch updates.</strong>
        <p>No prescription is guaranteed. Any clinical service will require an independent licensed-clinician assessment.</p>
      </div>
    );
  }

  return (
    <form className={`continuity-form ${compact ? "compact" : ""}`} onSubmit={submit}>
      <label>
        <span>EMAIL ADDRESS</span>
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <button disabled={!consent || !email.trim() || status === "saving"} type="submit">
        {status === "saving" ? "Joining…" : "Join the continuity founding list"} <b>→</b>
      </button>
      <label className="continuity-consent">
        <input checked={consent} onChange={(event) => setConsent(event.target.checked)} type="checkbox" />
        <span>I agree to receive Peptis programme and educational emails. I can unsubscribe at any time.</span>
      </label>
      {status === "error" ? <p className="form-error" role="alert">We could not save that address just now. Please try again.</p> : null}
      <small>Education and programme support only. Joining this list is not a medical intake and does not guarantee a prescription.</small>
    </form>
  );
}
