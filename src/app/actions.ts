"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, endSession, isAdmin, startSession } from "@/lib/auth";
import { PORTFOLIO_TAG, uploadImage, writePortfolio } from "@/lib/store";
import type { Job, Portfolio, Project, SkillGroup } from "@/lib/types";

export type ActionResult = { ok: true; url?: string } | { ok: false; error: string };

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const list = (v: unknown, max = 40) =>
  Array.isArray(v) ? v.map((x) => str(x, 400)).filter(Boolean).slice(0, max) : [];
const month = (v: unknown) => (typeof v === "string" && /^\d{4}-\d{2}$/.test(v) ? v : null);
const id = (v: unknown) => str(v, 64) || crypto.randomUUID().slice(0, 8);

function normalize(input: Portfolio): Portfolio {
  const p = input.profile ?? ({} as Portfolio["profile"]);
  return {
    profile: {
      name: str(p.name, 120),
      role: str(p.role, 120),
      headline: str(p.headline, 300),
      bio: str(p.bio),
      location: str(p.location, 120),
      email: str(p.email, 200),
      whatsapp: str(p.whatsapp, 30).replace(/\D/g, ""),
      github: str(p.github, 300),
      linkedin: str(p.linkedin, 300),
      instagram: str(p.instagram, 300),
      avatar: str(p.avatar, 600),
      available: Boolean(p.available),
    },
    experience: (input.experience ?? []).slice(0, 50).map(
      (j): Job => ({
        id: id(j.id),
        company: str(j.company, 120),
        role: str(j.role, 120),
        type: str(j.type, 80),
        location: str(j.location, 120),
        start: month(j.start) ?? "2024-01",
        end: month(j.end),
        summary: str(j.summary),
        achievements: list(j.achievements),
        stack: list(j.stack),
      }),
    ),
    projects: (input.projects ?? []).slice(0, 50).map(
      (x): Project => ({
        id: id(x.id),
        name: str(x.name, 120),
        kind: str(x.kind, 120),
        description: str(x.description),
        highlights: list(x.highlights),
        stack: list(x.stack),
        repo: str(x.repo, 300),
        url: str(x.url, 300),
        image: str(x.image, 600),
      }),
    ),
    skills: (input.skills ?? []).slice(0, 20).map(
      (g): SkillGroup => ({
        id: id(g.id),
        group: str(g.group, 80),
        items: list(g.items, 60),
      }),
    ),
  };
}

export async function savePortfolio(data: Portfolio): Promise<ActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "Tu sesión expiró. Vuelve a entrar." };
  try {
    await writePortfolio(normalize(data));
    updateTag(PORTFOLIO_TAG);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "No se pudo guardar." };
  }
}

export async function uploadImageAction(formData: FormData): Promise<ActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "Tu sesión expiró. Vuelve a entrar." };
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Selecciona una imagen." };
  if (!file.type.startsWith("image/")) return { ok: false, error: "El archivo debe ser una imagen." };
  if (file.size > 4 * 1024 * 1024) return { ok: false, error: "La imagen debe pesar menos de 4 MB." };
  try {
    return { ok: true, url: await uploadImage(file) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "No se pudo subir la imagen." };
  }
}

export async function login(_: string | null, formData: FormData): Promise<string | null> {
  if (!process.env.ADMIN_PASSWORD) return "Falta configurar ADMIN_PASSWORD en las variables de entorno.";
  if (!checkPassword(str(formData.get("password"), 200))) return "Contraseña incorrecta.";
  await startSession();
  redirect("/");
}

export async function logout() {
  await endSession();
  redirect("/");
}
