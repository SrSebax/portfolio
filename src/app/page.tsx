import Image from "next/image";
import { CopyEmail } from "@/components/copy-email";
import { AddButton, EditorProvider, EditProfileButton, ItemControls } from "@/components/editor";
import { ArrowUpRight, GitHubIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from "@/components/icons";
import { CurrentYear, JobPeriod, LocalTime } from "@/components/local-time";
import { Nav } from "@/components/nav";
import { getProjectVisual } from "@/components/project-visual";
import { Reveal } from "@/components/reveal";
import { TechChip, TechIcon } from "@/components/tech-icon";
import { getPortfolio } from "@/lib/store";
import type { Portfolio, Project } from "@/lib/types";

function whatsappLink(profile: Portfolio["profile"]) {
  if (!profile.whatsapp) return null;
  const text = `Hola ${profile.name.split(" ")[0]}, vi tu portafolio y me gustaría hablar contigo.`;
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`;
}

const accents = ["#818cf8", "#5eead4", "#fb7185", "#fdba74", "#d4f25c", "#c084fc"];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function SectionHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
      </Reveal>
      {children && (
        <Reveal delay={80}>
          <p className="max-w-sm text-muted">{children}</p>
        </Reveal>
      )}
    </div>
  );
}

function Hero({ data }: { data: Portfolio }) {
  const { profile } = data;
  const heroStack = [...new Set(data.skills.flatMap((g) => g.items))].slice(0, 6);

  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div aria-hidden className="dot-bg absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-14rem] -z-10 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              {profile.available && (
                <div className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-xs text-muted">
                  <span className="pulse-dot relative size-2 rounded-full bg-emerald-500" />
                  Disponible para nuevos proyectos
                </div>
              )}
              <EditProfileButton />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Hola, soy {profile.name.split(" ")[0]}.
              <br />
              <span className="text-muted">{profile.headline}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl whitespace-pre-line text-base leading-relaxed text-muted sm:text-lg">{profile.bio}</p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contacto"
                className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
              >
                Hablemos
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#proyectos"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-6 py-3 text-sm text-fg transition-colors hover:bg-surface-2"
              >
                Ver proyectos
              </a>
              <div className="ml-1 flex items-center gap-1">
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg">
                    <GitHubIcon className="size-5" />
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg">
                    <LinkedInIcon className="size-5" />
                  </a>
                )}
                {profile.instagram && (
                  <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-[#FF0069]">
                    <InstagramIcon className="size-5" />
                  </a>
                )}
                {profile.whatsapp && (
                  <a href={whatsappLink(profile)!} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-[#25D366]">
                    <WhatsAppIcon className="size-5" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mx-auto w-full max-w-sm rounded-3xl border border-line bg-surface p-3 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.35)]">
            {profile.avatar && (
              <Image
                src={profile.avatar}
                alt={`Foto de ${profile.name}`}
                width={460}
                height={460}
                priority
                className="aspect-[4/3] w-full rounded-2xl object-cover object-[center_30%]"
              />
            )}
            <div className="flex items-center justify-between px-2 pb-1 pt-4">
              <div>
                <p className="font-medium">{profile.name}</p>
                <p className="text-sm text-muted">{profile.role}</p>
              </div>
              <div className="text-right font-mono text-[11px] text-muted">
                <p>{profile.location}</p>
                <p>
                  <LocalTime /> COT
                </p>
              </div>
            </div>
            {heroStack.length > 0 && (
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-line px-2 pt-3">
                {heroStack.map((t) => (
                  <span key={t} title={t} className="grid size-9 place-items-center rounded-xl bg-surface-2">
                    <TechIcon name={t} className="size-[18px]" />
                  </span>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee({ skills }: Pick<Portfolio, "skills">) {
  const items = [...new Set(skills.flatMap((s) => s.items))];
  if (!items.length) return null;
  return (
    <div className="relative overflow-hidden border-y border-line bg-surface py-5 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <div className="animate-marquee flex w-max gap-3">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line px-4 py-2 text-sm text-fg/80"
          >
            <TechIcon name={item} className="size-4" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Experience({ experience }: Pick<Portfolio, "experience">) {
  return (
    <section id="experiencia" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeader eyebrow="Experiencia" title="Dónde he trabajado">
        Equipos y clientes con los que he llevado productos web y móviles a producción.
      </SectionHeader>

      <ol className="relative mt-14 space-y-6 before:absolute before:bottom-4 before:left-[19px] before:top-4 before:w-px before:bg-line-strong sm:before:left-[23px]">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.id} delay={i * 80} className="relative pl-14 sm:pl-16">
            <span
              aria-hidden
              className={`absolute left-0 top-6 grid size-10 place-items-center rounded-xl border font-mono text-xs font-semibold sm:size-12 ${
                job.end ? "border-line-strong bg-surface text-muted" : "border-accent/40 bg-accent/10 text-accent"
              }`}
            >
              {initials(job.company)}
            </span>

            <article className="relative rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-8">
              <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{job.role}</h3>
                  <p className="mt-1 text-muted">
                    <span className="font-medium text-fg">{job.company}</span>
                    {job.type && ` · ${job.type}`}
                    {job.location && ` · ${job.location}`}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                  <ItemControls section="experience" index={i} count={experience.length} />
                  {!job.end && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-current" />
                      Actual
                    </span>
                  )}
                  <p className="flex flex-wrap gap-x-2 font-mono text-xs text-muted">
                    <JobPeriod start={job.start} end={job.end} />
                  </p>
                </div>
              </header>

              {job.summary && <p className="mt-5 max-w-3xl leading-relaxed text-fg/80">{job.summary}</p>}

              {job.achievements.length > 0 && (
                <ul className="mt-5 grid gap-2.5 text-sm sm:grid-cols-2">
                  {job.achievements.map((a) => (
                    <li key={a} className="flex gap-2.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="text-muted">{a}</span>
                    </li>
                  ))}
                </ul>
              )}

              {job.stack.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                  {job.stack.map((s) => (
                    <TechChip key={s} name={s} />
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </ol>
      <AddButton section="experience">Agregar experiencia</AddButton>
    </section>
  );
}

function ProjectMedia({ project, accent }: { project: Project; accent: string }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`Captura de ${project.name}`}
        width={720}
        height={450}
        className="relative w-full max-w-[460px] rounded-xl border border-line object-cover shadow-[0_30px_60px_-20px_rgb(0_0_0/0.45)] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    );
  }
  const visual = getProjectVisual(project.id);
  if (visual) {
    return (
      <div className="relative scale-90 transition-transform duration-700 ease-out group-hover:scale-95">
        <visual.Visual />
      </div>
    );
  }
  return (
    <div
      className="relative grid size-40 place-items-center rounded-[2rem] border border-line-strong bg-surface text-5xl font-semibold tracking-tight shadow-[0_30px_60px_-20px_rgb(0_0_0/0.35)] transition-transform duration-700 group-hover:scale-105"
      style={{ color: accent }}
    >
      {initials(project.name)}
    </div>
  );
}

function Projects({ projects }: Pick<Portfolio, "projects">) {
  return (
    <section id="proyectos" className="border-y border-line bg-surface-2/50">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeader eyebrow="Proyectos" title="Lo que he construido">
          Productos que diseño y construyo de principio a fin: desde la idea y la interfaz hasta el código.
        </SectionHeader>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => {
            const accent = getProjectVisual(project.id)?.accent ?? accents[i % accents.length];
            return (
              <Reveal key={project.id} delay={(i % 2) * 80}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-300 hover:border-line-strong">
                  <div className="absolute right-3 top-3 z-10">
                    <ItemControls section="projects" index={i} count={projects.length} />
                  </div>
                  <div className="relative flex h-[400px] items-center justify-center overflow-hidden border-b border-line bg-surface-2 p-8">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-35"
                      style={{ background: `radial-gradient(circle at 50% 60%, ${accent}, transparent 65%)` }}
                    />
                    <ProjectMedia project={project} accent={accent} />
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    {project.kind && <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">{project.kind}</p>}
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.name}</h3>
                    {project.description && <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>}
                    {project.highlights.length > 0 && (
                      <ul className="mt-4 space-y-2 text-sm">
                        {project.highlights.map((h) => (
                          <li key={h} className="flex gap-2.5">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                            <span className="text-muted">{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {project.stack.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-1.5">
                        {project.stack.map((s) => (
                          <TechChip key={s} name={s} />
                        ))}
                      </div>
                    )}
                    <div className="mt-auto flex flex-wrap gap-6 pt-8 text-sm font-medium">
                      {project.repo && (
                        <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-fg transition-colors hover:text-accent">
                          <GitHubIcon />
                          Ver repositorio
                          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      )}
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-fg transition-colors hover:text-accent">
                          Ver sitio
                          <ArrowUpRight className="size-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <AddButton section="projects">Agregar proyecto</AddButton>
      </div>
    </section>
  );
}

function Stack({ skills }: Pick<Portfolio, "skills">) {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeader eyebrow="Stack" title="Tecnologías que uso">
        Las herramientas con las que trabajo a diario, de la interfaz al despliegue.
      </SectionHeader>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {skills.map((group, i) => {
          // Con un número impar de grupos, el último ocupa todo el ancho.
          const wide = skills.length % 2 === 1 && i === skills.length - 1;
          return (
            <Reveal
              key={group.id}
              delay={(i % 2) * 80}
              className={`relative rounded-2xl border border-line bg-surface p-6 ${wide ? "md:col-span-2" : ""}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">{group.group}</h3>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted">{group.items.length}</span>
                  <ItemControls section="skills" index={i} count={skills.length} />
                </div>
              </div>
              <ul className={`mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 ${wide ? "md:grid-cols-6" : ""}`}>
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="group flex flex-col items-center gap-2.5 rounded-xl border border-line bg-surface-2/60 px-2 py-4 text-center transition-all hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-2"
                  >
                    <TechIcon name={item} className="size-7 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-xs text-fg/80">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
      <AddButton section="skills">Agregar grupo de tecnologías</AddButton>
    </section>
  );
}

function Contact({ profile }: Pick<Portfolio, "profile">) {
  const wa = whatsappLink(profile);
  return (
    <section id="contacto" className="px-5 pb-24 sm:px-8 sm:pb-32">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-line bg-surface px-6 py-20 text-center sm:py-28">
        <div aria-hidden className="dot-bg absolute inset-0" />
        <div
          aria-hidden
          className="absolute bottom-[-16rem] left-1/2 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]"
        />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Contacto</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-[clamp(2.2rem,5.5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            ¿Tienes una idea? Hagámosla realidad.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-muted">
            Puedo impulsar tu proyecto o sumarme a tu equipo. Escríbeme por WhatsApp o por correo y te respondo pronto.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-[#0b2e17] transition-transform hover:scale-[1.03]"
              >
                <WhatsAppIcon className="size-5" />
                Escríbeme por WhatsApp
              </a>
            )}
            {profile.email && <CopyEmail email={profile.email} />}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer({ profile }: Pick<Portfolio, "profile">) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
        <p>
          © <CurrentYear /> {profile.name}. {profile.location}.
        </p>
        <div className="flex items-center gap-5">
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
              GitHub
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
              LinkedIn
            </a>
          )}
          {profile.instagram && (
            <a href={profile.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
              Instagram
            </a>
          )}
          {profile.whatsapp && (
            <a href={whatsappLink(profile)!} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
              WhatsApp
            </a>
          )}
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="transition-colors hover:text-fg">
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

export default async function Home() {
  const data = await getPortfolio();

  return (
    <EditorProvider data={data}>
      <Nav name={data.profile.name} initials={initials(data.profile.name)} />
      <main>
        <Hero data={data} />
        <Marquee skills={data.skills} />
        <Experience experience={data.experience} />
        <Projects projects={data.projects} />
        <Stack skills={data.skills} />
        <Contact profile={data.profile} />
      </main>
      <Footer profile={data.profile} />
    </EditorProvider>
  );
}
