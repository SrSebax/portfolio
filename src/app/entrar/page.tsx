import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Modo edición</h1>
        <p className="mt-2 text-sm text-muted">Ingresa tu contraseña para editar el contenido de la web.</p>
        <LoginForm />
      </div>
    </main>
  );
}
