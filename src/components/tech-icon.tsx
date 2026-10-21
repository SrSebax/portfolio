import {
  siAndroid,
  siAstro,
  siCapacitor,
  siClaudecode,
  siDart,
  siDocker,
  siFastapi,
  siFfmpeg,
  siFirebase,
  siFlutter,
  siFramer,
  siGit,
  siGithub,
  siGooglemaps,
  siGraphql,
  siJavascript,
  siKubernetes,
  siLens,
  siMediapipe,
  siMui,
  siNextdotjs,
  siNodedotjs,
  siPwa,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siYoutube,
} from "simple-icons";

type Icon = { title: string; hex: string; path: string; stroke?: boolean };

// Azure salió de simple-icons por política de marca; se usa su trazado anterior.
const azure: Icon = {
  title: "Azure",
  hex: "0078D4",
  path: "M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.938L5.483 21.3zM13.23 2.7L6.105 8.677 0 19.253h5.505v.014L13.23 2.7z",
};

const rest: Icon = {
  title: "REST",
  hex: "71717A",
  path: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
  stroke: true,
};

// Microsoft no permite su logo en simple-icons; iconos genéricos con su color.
const storageExplorer: Icon = {
  title: "Azure Storage Explorer",
  hex: "0078D4",
  path: "M12 3c4.97 0 9 1.34 9 3s-4.03 3-9 3-9-1.34-9-3 4.03-3 9-3ZM3 6v6c0 1.66 4.03 3 9 3s9-1.34 9-3V6M3 12v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6",
  stroke: true,
};

const fabric: Icon = {
  title: "Microsoft Fabric",
  hex: "117865",
  path: "m12 2 10 5-10 5L2 7l10-5ZM2 12l10 5 10-5M2 17l10 5 10-5",
  stroke: true,
};

const registry: Record<string, Icon> = {
  React: siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Astro: siAstro,
  "Tailwind CSS": siTailwindcss,
  "Material UI": siMui,
  "Framer Motion": siFramer,
  Flutter: siFlutter,
  Dart: siDart,
  Capacitor: siCapacitor,
  PWA: siPwa,
  Android: siAndroid,
  "Node.js": siNodedotjs,
  Python: siPython,
  FastAPI: siFastapi,
  Firebase: siFirebase,
  Firestore: { ...siFirebase, title: "Firestore" },
  GraphQL: siGraphql,
  REST: rest,
  Git: siGit,
  GitHub: siGithub,
  Vite: siVite,
  Vercel: siVercel,
  Azure: azure,
  MediaPipe: siMediapipe,
  FFmpeg: siFfmpeg,
  "yt-dlp": siYoutube,
  "Google Maps": siGooglemaps,
  Docker: siDocker,
  Kubernetes: siKubernetes,
  AKS: { ...siKubernetes, title: "Azure Kubernetes Service" },
  Lens: siLens,
  "Azure Storage Explorer": storageExplorer,
  "Microsoft Fabric": fabric,
  "Claude Code": siClaudecode,
};

function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function mix(hex: string, target: number, amount: number) {
  return (
    "#" +
    [0, 2, 4]
      .map((i) => {
        const c = parseInt(hex.slice(i, i + 2), 16);
        return Math.round(c + (target - c) * amount)
          .toString(16)
          .padStart(2, "0");
      })
      .join("")
  );
}

// Colores de marca ajustados para que se lean sobre fondo claro y oscuro.
function brandColors(hex: string) {
  const l = luminance(hex);
  const light = l > 0.55 ? mix(hex, 0, 0.35) : `#${hex}`;
  const dark = l < 0.02 ? "var(--fg)" : l < 0.12 ? mix(hex, 255, 0.35) : `#${hex}`;
  return { light, dark };
}

const lookup = new Map(Object.keys(registry).map((k) => [k.toLowerCase(), registry[k]]));

export const techNames = Object.keys(registry);

export function TechIcon({ name, className = "size-4" }: { name: string; className?: string }) {
  const icon = lookup.get(name.trim().toLowerCase());
  if (!icon) return null;
  const { light, dark } = brandColors(icon.hex);
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={icon.title}
      className={`tech-icon shrink-0 ${className}`}
      style={{ "--brand-light": light, "--brand-dark": dark } as React.CSSProperties}
      {...(icon.stroke
        ? { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }
        : { fill: "currentColor" })}
    >
      <path d={icon.path} />
    </svg>
  );
}

export function TechChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-1 text-xs text-fg/80">
      <TechIcon name={name} className="size-3.5" />
      {name}
    </span>
  );
}
