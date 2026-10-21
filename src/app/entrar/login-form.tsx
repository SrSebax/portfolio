"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/app/actions";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="mt-8 space-y-4">
      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-muted">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="w-full rounded-lg border border-line-strong bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-fg py-2.5 text-sm font-medium text-bg transition-opacity disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
      <Link href="/" className="block text-center text-sm text-muted hover:text-fg">
        Volver a la web
      </Link>
    </form>
  );
}
