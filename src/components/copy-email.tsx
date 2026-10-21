"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm text-muted transition-colors hover:border-fg/40 hover:text-fg"
    >
      <span className="font-mono">{email}</span>
      <span
        className={`rounded-full px-2 py-0.5 text-xs transition-colors ${
          copied ? "bg-accent text-accent-fg" : "bg-fg/[0.07] text-fg"
        }`}
        aria-live="polite"
      >
        {copied ? "¡Copiado!" : "Copiar"}
      </span>
    </button>
  );
}
