function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative h-[340px] w-[172px] shrink-0 rounded-[2.2rem] border border-black/10 bg-[#0c0c0f] p-[7px] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.45)] dark:border-white/15 dark:shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] ${className}`}
    >
      <div className="absolute left-1/2 top-[13px] z-10 h-[14px] w-[52px] -translate-x-1/2 rounded-full bg-black" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">{children}</div>
    </div>
  );
}

function CoinControlVisual() {
  const bars = [38, 62, 45, 80, 54, 92, 70];
  const rows = [
    { label: "Mercado", amount: "-$184.000", color: "#fb7185" },
    { label: "Salario", amount: "+$4.200.000", color: "#5eead4" },
    { label: "Transporte", amount: "-$56.500", color: "#fdba74" },
  ];
  return (
    <Phone className="animate-float">
      <div className="flex h-full flex-col bg-gradient-to-b from-[#0f2a27] to-[#0b0f10] px-3.5 pb-3 pt-9 text-white">
        <p className="text-[9px] uppercase tracking-widest text-white/50">Saldo disponible</p>
        <p className="mt-1 text-xl font-semibold tracking-tight">$2.450.300</p>
        <div className="mt-1 inline-flex w-fit rounded-full bg-[#5eead4]/15 px-1.5 py-0.5 text-[8px] text-[#5eead4]">
          ▲ 12% este mes
        </div>
        <div className="mt-4 flex h-20 items-end gap-1.5 rounded-xl bg-white/5 p-2">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: i === 5 ? "#5eead4" : "rgb(255 255 255 / 0.15)" }}
            />
          ))}
        </div>
        <p className="mt-4 text-[9px] uppercase tracking-widest text-white/50">Movimientos</p>
        <div className="mt-2 space-y-1.5">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1.5">
              <span className="size-4 rounded-md" style={{ background: `${r.color}33`, boxShadow: `inset 0 0 0 1px ${r.color}66` }} />
              <span className="flex-1 text-[9px]">{r.label}</span>
              <span className="text-[9px] tabular-nums" style={{ color: r.color }}>
                {r.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

function JumpTrackVisual() {
  const r = 58;
  const c = 2 * Math.PI * r;
  return (
    <Phone className="animate-float">
      <div className="flex h-full flex-col items-center bg-[#0b0b0d] px-3 pb-3 pt-9 text-white">
        <div className="flex w-full items-center justify-between text-[8px] text-white/50">
          <span>SERIE 2 / 5</span>
          <span className="tabular-nums">02:14</span>
        </div>
        <div className="relative mt-5 grid size-[140px] place-items-center">
          <svg viewBox="0 0 140 140" className="absolute inset-0 -rotate-90">
            <circle cx="70" cy="70" r={r} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="8" />
            <circle
              cx="70"
              cy="70"
              r={r}
              fill="none"
              stroke="#d4f25c"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * 0.32}
            />
          </svg>
          <div className="text-center">
            <p className="text-4xl font-semibold tabular-nums tracking-tighter">247</p>
            <p className="text-[8px] uppercase tracking-widest text-white/50">saltos</p>
          </div>
        </div>
        <div className="mt-5 grid w-full grid-cols-2 gap-1.5">
          <div className="rounded-lg bg-white/5 p-2">
            <p className="text-[7px] uppercase text-white/40">Saltos/min</p>
            <p className="text-sm font-semibold tabular-nums">112</p>
          </div>
          <div className="rounded-lg bg-white/5 p-2">
            <p className="text-[7px] uppercase text-white/40">Racha</p>
            <p className="text-sm font-semibold tabular-nums">🔥 9</p>
          </div>
        </div>
        <div className="mt-auto flex w-full gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className={`h-1.5 flex-1 rounded-full ${i < 5 ? "bg-[#d4f25c]" : "bg-white/10"}`} />
          ))}
        </div>
      </div>
    </Phone>
  );
}

function SoundboxVisual() {
  const tracks = [
    { t: "Daft Punk - Something About Us", p: 100 },
    { t: "Khruangbin - Maria También", p: 72 },
    { t: "Tame Impala - Borderline", p: 34 },
    { t: "Bad Bunny - Tití Me Preguntó", p: 0 },
  ];
  return (
    <div className="animate-float w-full max-w-[420px] overflow-hidden rounded-xl border border-black/10 bg-[#0e0e11] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.45)] dark:border-white/15 dark:shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3 rounded-md bg-white/5 px-2 py-0.5 font-mono text-[9px] text-white/40">localhost:8765</span>
      </div>
      <div className="p-4 text-white">
        <div className="flex gap-2">
          <div className="flex-1 truncate rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 font-mono text-[10px] text-white/50">
            youtube.com/playlist?list=PL9x…
          </div>
          <div className="rounded-lg bg-[#fb7185] px-3 py-2 text-[10px] font-semibold text-black">320 kbps</div>
        </div>
        <div className="mt-4 space-y-2">
          {tracks.map((tr) => (
            <div key={tr.t} className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-2.5 py-2">
              <div className="flex h-5 items-end gap-[2px]">
                {[0, 1, 2].map((b) => (
                  <span
                    key={b}
                    className={`w-[3px] rounded-full ${tr.p > 0 && tr.p < 100 ? "animate-bar bg-[#fb7185]" : "bg-white/20"}`}
                    style={{ height: "100%", animationDelay: `${b * 0.15}s` }}
                  />
                ))}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px]">{tr.t}.mp3</p>
                <div className="mt-1 h-1 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[#fb7185]" style={{ width: `${tr.p}%` }} />
                </div>
              </div>
              <span className="w-7 text-right font-mono text-[9px] tabular-nums text-white/50">
                {tr.p === 100 ? "✓" : `${tr.p}%`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WeREatVisual() {
  const pins = [
    { x: 28, y: 30, e: "☕" },
    { x: 64, y: 22, e: "🍕" },
    { x: 46, y: 52, e: "🍣" },
    { x: 74, y: 60, e: "🍸" },
    { x: 22, y: 68, e: "🌮" },
  ];
  return (
    <Phone className="animate-float">
      <div className="relative h-full bg-[#141210] text-white">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 200" preserveAspectRatio="none">
          <path d="M-5 60 Q 40 40 105 80" stroke="rgb(255 255 255 / 0.08)" strokeWidth="5" fill="none" />
          <path d="M30 -5 Q 45 100 20 205" stroke="rgb(255 255 255 / 0.08)" strokeWidth="4" fill="none" />
          <path d="M-5 140 Q 50 120 105 150" stroke="rgb(255 255 255 / 0.06)" strokeWidth="3" fill="none" />
          <path d="M70 -5 L 80 205" stroke="rgb(255 255 255 / 0.05)" strokeWidth="2" fill="none" />
        </svg>
        {pins.map((p) => (
          <div
            key={p.e}
            className="absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full rounded-br-none border border-[#fdba74]/60 bg-[#1e1a16] text-xs shadow-lg"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {p.e}
          </div>
        ))}
        <div className="absolute inset-x-2 bottom-2 rounded-2xl border border-white/10 bg-[#1b1815]/95 p-2.5 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-[#fdba74]/20 text-sm">🍣</span>
            <div className="flex-1">
              <p className="text-[10px] font-semibold">Sushi Bar Laureles</p>
              <p className="text-[8px] text-white/50">Guardado por Ana y 3 más</p>
            </div>
            <span className="text-[9px] text-[#fdba74]">★ 4.8</span>
          </div>
          <div className="mt-2 flex -space-x-1.5">
            {["#fdba74", "#fb7185", "#5eead4", "#d4f25c"].map((c) => (
              <span key={c} className="size-4 rounded-full border border-[#1b1815]" style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>
    </Phone>
  );
}

// Mockups dibujados a mano para los proyectos originales; los nuevos usan imagen o portada genérica.
const visuals: Record<string, { Visual: () => React.ReactNode; accent: string }> = {
  "coin-control": { Visual: CoinControlVisual, accent: "#5eead4" },
  jumptrack: { Visual: JumpTrackVisual, accent: "#d4f25c" },
  soundbox: { Visual: SoundboxVisual, accent: "#fb7185" },
  wereat: { Visual: WeREatVisual, accent: "#fdba74" },
};

export function getProjectVisual(id: string) {
  return visuals[id] ?? null;
}
