import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { get, put } from "@vercel/blob";
import { cacheLife, cacheTag } from "next/cache";
import { seed } from "@/data/seed";
import type { Portfolio } from "@/lib/types";

export const PORTFOLIO_TAG = "portfolio";
const BLOB_PATH = "portfolio.json";

// Con Vercel Blob conectado se usa Blob; sin él (desarrollo local) se guarda en archivos.
const blobEnabled = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

const localFile = path.join(process.cwd(), ".data", "portfolio.json");
const localUploads = path.join(process.cwd(), "public", "uploads");

function assertWritableLocally() {
  if (process.env.VERCEL) {
    throw new Error("Vercel Blob no está conectado a este proyecto. Conéctalo para poder guardar cambios.");
  }
}

export async function getPortfolio(): Promise<Portfolio> {
  "use cache";
  cacheLife("max");
  cacheTag(PORTFOLIO_TAG);

  try {
    if (blobEnabled()) {
      const result = await get(BLOB_PATH, { access: "public", useCache: false });
      if (result?.statusCode === 200) return { ...seed, ...(await new Response(result.stream).json()) };
    } else {
      return { ...seed, ...JSON.parse(await readFile(localFile, "utf8")) };
    }
  } catch {}
  return seed;
}

export async function writePortfolio(data: Portfolio) {
  const body = JSON.stringify(data, null, 2);
  if (blobEnabled()) {
    await put(BLOB_PATH, body, {
      access: "public",
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: "application/json",
      cacheControlMaxAge: 60,
    });
    return;
  }
  assertWritableLocally();
  await mkdir(path.dirname(localFile), { recursive: true });
  await writeFile(localFile, body);
}

export async function uploadImage(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
  const name = `${Date.now().toString(36)}.${ext}`;
  if (blobEnabled()) {
    const blob = await put(`media/${name}`, file, { access: "public", addRandomSuffix: true, contentType: file.type });
    return blob.url;
  }
  assertWritableLocally();
  await mkdir(localUploads, { recursive: true });
  await writeFile(path.join(localUploads, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}
