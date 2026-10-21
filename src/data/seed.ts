import type { Portfolio } from "@/lib/types";

// Contenido inicial. Una vez guardas desde el editor, la web lee lo guardado y esto ya no se usa.
export const seed: Portfolio = {
  profile: {
    name: "Sebastian Londoño",
    role: "Desarrollador de Software",
    headline: "Construyo apps web y móviles rápidas, claras y bien hechas.",
    bio: "Desarrollador de software en Medellín, Colombia. Trabajo entre el diseño de interfaces, el frontend y la integración con servicios, con React, Next.js y Flutter. También trabajo con contenedores y Kubernetes en Azure, y uso IA como parte de mi flujo de desarrollo.",
    location: "Medellín, Colombia",
    email: "sebaslondonomesa@gmail.com",
    whatsapp: "573024247369",
    github: "https://github.com/SrSebax",
    linkedin: "https://www.linkedin.com/in/sebastian-londo%C3%B1o-mesa/",
    instagram: "https://www.instagram.com/sebax_lond/",
    avatar: "https://avatars.githubusercontent.com/u/111817271?v=4",
    available: true,
  },
  experience: [
    {
      id: "neobit",
      company: "NeoBit SAS",
      role: "Desarrollador de Software",
      type: "Tiempo completo",
      location: "Medellín, Colombia",
      start: "2024-01",
      end: null,
      summary:
        "Desarrollo productos web y móviles de punta a punta: desde la interfaz y la experiencia de usuario hasta la integración con el backend y la salida a producción.",
      achievements: [
        "Construyo interfaces en React y TypeScript responsivas y accesibles, con componentes reutilizables.",
        "Desarrollo apps móviles en Flutter para iOS y Android desde una sola base de código.",
        "Integro APIs REST y GraphQL con manejo de estados de carga, errores y caché en el cliente.",
        "Mejoro el rendimiento y los tiempos de carga de las aplicaciones que mantengo.",
        "Participo en despliegues sobre Azure con contenedores Docker y Kubernetes (AKS).",
      ],
      stack: ["React", "TypeScript", "Flutter", "Dart", "GraphQL", "Azure", "Docker"],
    },
    {
      id: "prevalentware",
      company: "PrevalentWare",
      role: "Desarrollador Web Frontend",
      type: "Tiempo completo",
      location: "Medellín, Colombia",
      start: "2023-04",
      end: "2023-12",
      summary:
        "Desarrollé interfaces web en React para aplicaciones en producción, trabajando de cerca con los equipos de diseño y backend.",
      achievements: [
        "Construí y mantuve pantallas y componentes React conectados a las APIs del backend.",
        "Mejoré la velocidad de carga y la accesibilidad de los sitios.",
        "Llevé los diseños a interfaces fieles y responsivas en todos los tamaños de pantalla.",
      ],
      stack: ["React", "TypeScript", "JavaScript"],
    },
    {
      id: "freelance",
      company: "Freelance",
      role: "Desarrollador Web Independiente",
      type: "Independiente",
      location: "Remoto",
      start: "2022-01",
      end: null,
      summary:
        "Diseño y desarrollo sitios y aplicaciones web para clientes, desde la propuesta visual hasta el despliegue.",
      achievements: [
        "Diseño interfaces a la medida de la marca y los objetivos de cada cliente.",
        "Desarrollo sitios rápidos con Next.js y Tailwind CSS, con SEO técnico desde el inicio.",
        "Despliego y mantengo los proyectos en producción.",
      ],
      stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    },
  ],
  projects: [
    {
      id: "coin-control",
      name: "CoinControl",
      kind: "PWA · Finanzas personales",
      description:
        "App de finanzas personales para controlar ingresos, gastos, presupuestos y ahorros desde el celular. Se instala como app, funciona sin conexión y sincroniza sola al volver la red.",
      highlights: [
        "Modo offline con IndexedDB y sincronización automática",
        "Presupuestos, bolsillos de ahorro y pagos recurrentes",
        "Gráficas de tendencias y gasto por categoría",
      ],
      stack: ["React", "Vite", "Tailwind CSS", "Firebase", "Recharts", "PWA"],
      repo: "https://github.com/SrSebax/coin-control",
      url: "",
      image: "",
    },
    {
      id: "jumptrack",
      name: "JumpTrack",
      kind: "App Android · Visión por computador",
      description:
        "App que cuenta tus saltos de cuerda con la cámara del celular. MediaPipe Pose sigue tobillos y caderas en tiempo real y registra cada salto al aterrizar, sin tocar la pantalla.",
      highlights: [
        "Detección de pose 100% en el dispositivo: sin internet ni cuentas",
        "Modo series con avisos por voz y descansos guiados",
        "Rachas, calendario y récord de saltos por minuto",
      ],
      stack: ["React", "TypeScript", "Capacitor", "MediaPipe", "Vite"],
      repo: "https://github.com/SrSebax/jumptrack",
      url: "",
      image: "",
    },
    {
      id: "soundbox",
      name: "Soundbox",
      kind: "Full-stack · Herramienta local",
      description:
        "Herramienta para descargar audio de YouTube en MP3 desde el navegador: canciones sueltas o playlists completas, con calidad configurable, metadatos ID3 y carátula.",
      highlights: [
        "Progreso en vivo por canción con Server-Sent Events",
        "Historial para no descargar dos veces lo mismo",
        "Solo acepta peticiones desde localhost",
      ],
      stack: ["React", "TypeScript", "Python", "FastAPI", "yt-dlp", "FFmpeg"],
      repo: "https://github.com/SrSebax/soundbox",
      url: "",
      image: "",
    },
    {
      id: "wereat",
      name: "Wereat",
      kind: "App móvil · Social",
      description:
        "App para descubrir, guardar y compartir restaurantes, cafés y bares con tus amigos en un mapa compartido.",
      highlights: [
        "Mapa compartido entre amigos",
        "Listas de lugares guardados por categoría",
        "Una sola base de código para iOS y Android",
      ],
      stack: ["Flutter", "Dart"],
      repo: "https://github.com/SrSebax/wereat",
      url: "",
      image: "",
    },
  ],
  skills: [
    { id: "frontend", group: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"] },
    { id: "mobile", group: "Mobile", items: ["Flutter", "Dart"] },
    { id: "backend", group: "Backend", items: ["Node.js", "Python", "FastAPI", "Firebase", "GraphQL"] },
    { id: "tools", group: "Herramientas", items: ["Git", "GitHub", "Vercel", "Claude Code"] },
    {
      id: "cloud",
      group: "Cloud y DevOps",
      items: ["Azure", "Docker", "AKS", "Lens", "Azure Storage Explorer", "Microsoft Fabric"],
    },
  ],
};
