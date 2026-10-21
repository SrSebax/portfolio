"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  type ReactNode,
} from "react";
import { logout, savePortfolio, uploadImageAction } from "@/app/actions";
import { techNames } from "@/components/tech-icon";
import type { Job, Portfolio, Profile, Project, Section, SkillGroup } from "@/lib/types";

type Target = { kind: "profile" } | { kind: Section; index: number | null };

type EditorContext = {
  data: Portfolio;
  editing: boolean;
  open: (target: Target) => void;
  remove: (section: Section, index: number) => void;
  move: (section: Section, index: number, dir: -1 | 1) => void;
  busy: boolean;
};

const Ctx = createContext<EditorContext | null>(null);

const useEditor = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useEditor fuera de EditorProvider");
  return ctx;
};

const subscribe = () => () => {};
const hasEditorCookie = () => /(?:^|;\s*)editor=1/.test(document.cookie);

const blank = {
  experience: (): Job => ({
    id: "",
    company: "",
    role: "",
    type: "Tiempo completo",
    location: "",
    start: "",
    end: null,
    summary: "",
    achievements: [],
    stack: [],
  }),
  projects: (): Project => ({
    id: "",
    name: "",
    kind: "",
    description: "",
    highlights: [],
    stack: [],
    repo: "",
    url: "",
    image: "",
  }),
  skills: (): SkillGroup => ({ id: "", group: "", items: [] }),
};

export function EditorProvider({ data, children }: { data: Portfolio; children: ReactNode }) {
  const editing = useSyncExternalStore(subscribe, hasEditorCookie, () => false);
  const [target, setTarget] = useState<Target | null>(null);
  const [busy, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const persist = (next: Portfolio, onDone?: () => void) =>
    new Promise<boolean>((resolve) => {
      startTransition(async () => {
        const result = await savePortfolio(next);
        if (result.ok) {
          setError(null);
          onDone?.();
        } else setError(result.error);
        resolve(result.ok);
      });
    });

  const remove = (section: Section, index: number) => {
    const label = section === "experience" ? "esta experiencia" : section === "projects" ? "este proyecto" : "este grupo";
    if (!window.confirm(`¿Eliminar ${label}? No se puede deshacer.`)) return;
    persist({ ...data, [section]: data[section].filter((_, i) => i !== index) });
  };

  const move = (section: Section, index: number, dir: -1 | 1) => {
    const items = [...data[section]];
    const to = index + dir;
    if (to < 0 || to >= items.length) return;
    [items[index], items[to]] = [items[to], items[index]];
    persist({ ...data, [section]: items });
  };

  return (
    <Ctx.Provider value={{ data, editing, open: setTarget, remove, move, busy }}>
      {children}
      {editing && (
        <>
          <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
            <div className="flex items-center gap-3 rounded-full border border-line-strong bg-surface/95 py-1.5 pl-4 pr-1.5 text-sm shadow-[0_12px_40px_-12px_rgb(0_0_0/0.35)] backdrop-blur">
              <span className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${busy ? "animate-pulse bg-amber-500" : "bg-emerald-500"}`} />
                {busy ? "Guardando…" : "Modo edición"}
              </span>
              <form action={logout}>
                <button className="rounded-full px-3 py-1.5 text-muted transition-colors hover:bg-fg/5 hover:text-fg">
                  Salir
                </button>
              </form>
            </div>
          </div>
          {error && !target && (
            <div role="alert" className="fixed inset-x-0 bottom-20 z-50 mx-auto w-fit max-w-[90vw] rounded-lg bg-red-600 px-4 py-2 text-sm text-white">
              {error}
            </div>
          )}
          {target && (
            <EditDialog
              key={JSON.stringify(target)}
              target={target}
              data={data}
              busy={busy}
              error={error}
              onClose={() => {
                setTarget(null);
                setError(null);
              }}
              onSave={(next) => persist(next, () => setTarget(null))}
            />
          )}
        </>
      )}
    </Ctx.Provider>
  );
}

/* ---------- Controles en la página ---------- */

const iconBtn =
  "grid size-8 place-items-center rounded-md text-muted transition-colors hover:bg-fg/[0.06] hover:text-fg disabled:opacity-40";

export function ItemControls({ section, index, count }: { section: Section; index: number; count: number }) {
  const { editing, open, remove, move, busy } = useEditor();
  if (!editing) return null;
  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-line-strong bg-surface p-0.5 shadow-sm">
      <button type="button" className={iconBtn} disabled={busy} onClick={() => open({ kind: section, index })} aria-label="Editar">
        <Svg d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </button>
      <button type="button" className={iconBtn} disabled={busy || index === 0} onClick={() => move(section, index, -1)} aria-label="Subir">
        <Svg d="m18 15-6-6-6 6" />
      </button>
      <button type="button" className={iconBtn} disabled={busy || index === count - 1} onClick={() => move(section, index, 1)} aria-label="Bajar">
        <Svg d="m6 9 6 6 6-6" />
      </button>
      <button type="button" className={`${iconBtn} hover:!text-red-500`} disabled={busy} onClick={() => remove(section, index)} aria-label="Eliminar">
        <Svg d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
      </button>
    </div>
  );
}

export function AddButton({ section, children }: { section: Section; children: ReactNode }) {
  const { editing, open, busy } = useEditor();
  if (!editing) return null;
  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => open({ kind: section, index: null })}
      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong py-4 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <Svg d="M12 5v14M5 12h14" />
      {children}
    </button>
  );
}

export function EditProfileButton() {
  const { editing, open, busy } = useEditor();
  if (!editing) return null;
  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => open({ kind: "profile" })}
      className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <Svg d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" className="size-3.5" />
      Editar perfil
    </button>
  );
}

function Svg({ d, className = "size-4" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}

/* ---------- Formulario ---------- */

type Field =
  | { name: string; label: string; type: "text" | "url" | "email" | "textarea"; placeholder?: string; required?: boolean; hint?: string }
  | { name: string; label: string; type: "month"; required?: boolean }
  | { name: string; label: string; type: "end" }
  | { name: string; label: string; type: "lines"; placeholder?: string; hint?: string }
  | { name: string; label: string; type: "tags" }
  | { name: string; label: string; type: "image" }
  | { name: string; label: string; type: "checkbox"; hint?: string };

const schemas: Record<Target["kind"], { title: string; fields: Field[] }> = {
  profile: {
    title: "Perfil",
    fields: [
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "role", label: "Cargo", type: "text", placeholder: "Desarrollador de Software" },
      { name: "headline", label: "Frase principal", type: "textarea" },
      { name: "bio", label: "Sobre mí", type: "textarea" },
      { name: "location", label: "Ubicación", type: "text" },
      { name: "email", label: "Correo", type: "email" },
      { name: "whatsapp", label: "WhatsApp", type: "text", placeholder: "57 300 000 0000", hint: "Con indicativo de país, sin +." },
      { name: "github", label: "GitHub", type: "url" },
      { name: "linkedin", label: "LinkedIn", type: "url" },
      { name: "instagram", label: "Instagram", type: "url" },
      { name: "avatar", label: "Foto", type: "image" },
      { name: "available", label: "Disponible para nuevos proyectos", type: "checkbox" },
    ],
  },
  experience: {
    title: "Experiencia",
    fields: [
      { name: "role", label: "Cargo", type: "text", required: true, placeholder: "Desarrollador Frontend" },
      { name: "company", label: "Empresa", type: "text", required: true },
      { name: "type", label: "Tipo", type: "text", placeholder: "Tiempo completo, Freelance, Prácticas…" },
      { name: "location", label: "Ubicación", type: "text", placeholder: "Medellín, Colombia · Remoto" },
      { name: "start", label: "Inicio", type: "month", required: true },
      { name: "end", label: "Fin", type: "end" },
      { name: "summary", label: "Resumen", type: "textarea" },
      { name: "achievements", label: "Logros", type: "lines", hint: "Uno por línea." },
      { name: "stack", label: "Tecnologías", type: "tags" },
    ],
  },
  projects: {
    title: "Proyecto",
    fields: [
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "kind", label: "Tipo", type: "text", placeholder: "App web · Finanzas" },
      { name: "description", label: "Descripción", type: "textarea" },
      { name: "highlights", label: "Puntos clave", type: "lines", hint: "Uno por línea." },
      { name: "stack", label: "Tecnologías", type: "tags" },
      { name: "repo", label: "Repositorio", type: "url", placeholder: "https://github.com/…" },
      { name: "url", label: "Demo / sitio", type: "url", placeholder: "https://…" },
      { name: "image", label: "Imagen de portada", type: "image" },
    ],
  },
  skills: {
    title: "Grupo de tecnologías",
    fields: [
      { name: "group", label: "Nombre del grupo", type: "text", required: true, placeholder: "Frontend" },
      { name: "items", label: "Tecnologías", type: "tags" },
    ],
  },
};

type Item = Record<string, unknown>;

function EditDialog({
  target,
  data,
  busy,
  error,
  onClose,
  onSave,
}: {
  target: Target;
  data: Portfolio;
  busy: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (next: Portfolio) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const isNew = target.kind !== "profile" && target.index === null;
  const [item, setItem] = useState<Item>(() => {
    if (target.kind === "profile") return { ...data.profile };
    return target.index === null ? blank[target.kind]() : { ...data[target.kind][target.index] };
  });
  const schema = schemas[target.kind];

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  const set = (name: string, value: unknown) => setItem((prev) => ({ ...prev, [name]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (target.kind === "profile") return onSave({ ...data, profile: item as Profile });
    const list = [...data[target.kind]] as Item[];
    if (target.index === null) list.unshift({ ...item, id: crypto.randomUUID().slice(0, 8) });
    else list[target.index] = item;
    onSave({ ...data, [target.kind]: list });
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="m-auto max-h-[90vh] w-[min(40rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line-strong bg-surface p-0 text-fg shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <form onSubmit={submit} className="flex max-h-[90vh] flex-col">
        <header className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-semibold">
            {target.kind === "profile" ? "Editar perfil" : `${isNew ? "Agregar" : "Editar"} ${schema.title.toLowerCase()}`}
          </h2>
          <button type="button" onClick={() => ref.current?.close()} className={iconBtn} aria-label="Cerrar">
            <Svg d="M18 6 6 18M6 6l12 12" />
          </button>
        </header>

        <div className="grid gap-5 overflow-y-auto px-6 py-5 sm:grid-cols-2">
          {schema.fields.map((field) => (
            <FieldInput key={field.name} field={field} value={item[field.name]} onChange={(v) => set(field.name, v)} />
          ))}
        </div>

        <footer className="flex items-center justify-end gap-3 border-t border-line px-6 py-4">
          {error && (
            <p role="alert" className="mr-auto text-sm text-red-500">
              {error}
            </p>
          )}
          <button type="button" onClick={() => ref.current?.close()} className="rounded-lg px-4 py-2 text-sm text-muted hover:text-fg">
            Cancelar
          </button>
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity disabled:opacity-60"
          >
            {busy ? "Guardando…" : "Guardar"}
          </button>
        </footer>
      </form>
    </dialog>
  );
}

const inputCls =
  "w-full rounded-lg border border-line-strong bg-bg px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-accent";

function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  const id = useId();
  const wide = !["text", "url", "email", "month", "end"].includes(field.type) || field.name === "role";
  const label = (
    <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-muted">
      {field.label}
    </label>
  );

  let control: ReactNode;
  switch (field.type) {
    case "text":
    case "url":
    case "email":
      control = (
        <input
          id={id}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      );
      break;
    case "textarea":
      control = (
        <textarea id={id} rows={3} placeholder={field.placeholder} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} className={inputCls} />
      );
      break;
    case "month":
      control = <input id={id} type="month" required={field.required} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} className={inputCls} />;
      break;
    case "end": {
      const current = value === null;
      control = (
        <div className="flex items-center gap-3">
          <input
            id={id}
            type="month"
            disabled={current}
            required={!current}
            value={current ? "" : ((value as string) ?? "")}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputCls} disabled:opacity-40`}
          />
          <label className="flex shrink-0 items-center gap-2 text-sm">
            <input type="checkbox" checked={current} onChange={(e) => onChange(e.target.checked ? null : "")} className="accent-[var(--accent)]" />
            Actual
          </label>
        </div>
      );
      break;
    }
    case "lines":
      control = (
        <textarea
          id={id}
          rows={4}
          value={((value as string[]) ?? []).join("\n")}
          onChange={(e) => onChange(e.target.value.split("\n"))}
          className={inputCls}
        />
      );
      break;
    case "tags":
      control = <TagInput id={id} value={(value as string[]) ?? []} onChange={onChange} />;
      break;
    case "image":
      control = <ImageInput id={id} value={(value as string) ?? ""} onChange={onChange} />;
      break;
    case "checkbox":
      return (
        <label className="flex items-start gap-3 sm:col-span-2">
          <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 size-4 accent-[var(--accent)]" />
          <span className="text-sm">
            {field.label}
            {field.hint && <span className="block text-xs text-muted">{field.hint}</span>}
          </span>
        </label>
      );
  }

  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      {label}
      {control}
      {"hint" in field && field.hint && <p className="mt-1 text-xs text-muted">{field.hint}</p>}
    </div>
  );
}

function TagInput({ id, value, onChange }: { id: string; value: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState("");
  const listId = `${id}-list`;

  const add = (raw: string) => {
    const tag = raw.trim();
    if (tag && !value.some((v) => v.toLowerCase() === tag.toLowerCase())) onChange([...value, tag]);
    setDraft("");
  };

  return (
    <div className={`${inputCls} flex flex-wrap items-center gap-1.5 focus-within:border-accent`}>
      {value.map((tag) => (
        <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-fg/[0.07] py-0.5 pl-2 pr-1 text-xs">
          {tag}
          <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))} className="rounded px-1 text-muted hover:text-fg" aria-label={`Quitar ${tag}`}>
            ×
          </button>
        </span>
      ))}
      <input
        id={id}
        list={listId}
        value={draft}
        placeholder={value.length ? "" : "Escribe y presiona Enter"}
        onChange={(e) => {
          const v = e.target.value;
          if (v.endsWith(",")) add(v.slice(0, -1));
          else if (techNames.includes(v)) add(v);
          else setDraft(v);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add(draft);
          } else if (e.key === "Backspace" && !draft && value.length) onChange(value.slice(0, -1));
        }}
        onBlur={() => draft && add(draft)}
        className="min-w-32 flex-1 bg-transparent outline-none placeholder:text-muted/60"
      />
      <datalist id={listId}>
        {techNames.filter((n) => !value.includes(n)).map((n) => (
          <option key={n} value={n} />
        ))}
      </datalist>
    </div>
  );
}

function ImageInput({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  const [uploading, startUpload] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const upload = (file: File) => {
    const form = new FormData();
    form.set("file", file);
    startUpload(async () => {
      const result = await uploadImageAction(form);
      if (result.ok && result.url) {
        setError(null);
        onChange(result.url);
      } else if (!result.ok) setError(result.error);
    });
  };

  return (
    <div className="flex items-center gap-4">
      <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-line-strong bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {value ? <img src={value} alt="" className="size-full object-cover" /> : <Svg d="M4 16l4-4 4 4 4-6 4 6M4 4h16v16H4z" className="size-5 text-muted" />}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <label htmlFor={id} className="cursor-pointer rounded-lg border border-line-strong px-3 py-1.5 transition-colors hover:border-accent hover:text-accent">
          {uploading ? "Subiendo…" : value ? "Cambiar" : "Subir imagen"}
        </label>
        <input id={id} type="file" accept="image/*" className="sr-only" disabled={uploading} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        {value && (
          <button type="button" onClick={() => onChange("")} className="text-muted hover:text-red-500">
            Quitar
          </button>
        )}
        {error && <p className="w-full text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}
