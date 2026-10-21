import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "session";
/** Cookie legible desde el navegador solo para mostrar los controles de edición; la seguridad está en SESSION_COOKIE. */
export const EDITOR_COOKIE = "editor";
const MAX_AGE = 60 * 60 * 24 * 30;

function secret() {
  const value = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!value) throw new Error("Falta ADMIN_PASSWORD en las variables de entorno.");
  return value;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && safeEqual(sign(input), sign(expected!));
}

export async function startSession() {
  const expires = Date.now() + MAX_AGE * 1000;
  const token = `${expires}.${sign(String(expires))}`;
  const jar = await cookies();
  const secure = process.env.NODE_ENV === "production";
  jar.set(SESSION_COOKIE, token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: MAX_AGE });
  jar.set(EDITOR_COOKIE, "1", { httpOnly: false, secure, sameSite: "lax", path: "/", maxAge: MAX_AGE });
}

export async function endSession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  jar.delete(EDITOR_COOKIE);
}

export async function isAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  try {
    return safeEqual(signature, sign(expires));
  } catch {
    return false;
  }
}
