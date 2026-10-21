"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "#experiencia", label: "Experiencia" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#stack", label: "Stack" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav({ name, initials }: { name: string; initials: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < window.innerHeight * 0.5) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((s): s is Element => s !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 sm:px-4 ${
          scrolled
            ? "border-line-strong bg-bg/75 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.25)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#inicio" className="group flex items-center gap-2 pl-1" aria-label="Inicio">
          <span className="grid size-8 place-items-center rounded-lg bg-fg font-mono text-xs font-semibold text-bg transition-transform duration-300 group-hover:-rotate-6">
            {initials}
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:inline">{name}</span>
        </a>

        <div className="flex items-center gap-1">
          <ul className="flex items-center gap-0.5 text-[13px] sm:gap-1 sm:text-sm">
            {links.map((link) => (
              <li key={link.href} className={link.href === "#stack" ? "hidden sm:block" : ""}>
                <a
                  href={link.href}
                  className={`rounded-full px-2.5 py-1.5 transition-colors sm:px-3 ${
                    active === link.href ? "bg-fg/[0.07] text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <span aria-hidden className="mx-1 h-5 w-px bg-line-strong" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
