"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

export function CurrentYear() {
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => null,
  );
  return <>{year ?? ""}</>;
}

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function parseMonth(value: string) {
  const [y, m] = value.split("-").map(Number);
  return y * 12 + (m - 1);
}

function formatMonth(value: string) {
  const [y, m] = value.split("-").map(Number);
  return `${months[m - 1]} ${y}`;
}

function formatDuration(total: number) {
  const years = Math.floor(total / 12);
  const rest = total % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? "año" : "años"}`);
  if (rest) parts.push(`${rest} ${rest === 1 ? "mes" : "meses"}`);
  return parts.join(" ") || "1 mes";
}

const currentMonth = () => {
  const d = new Date();
  return d.getFullYear() * 12 + d.getMonth();
};

// Inclusivo: Ene–Dic cuenta como 12 meses.
export function JobPeriod({ start, end }: { start: string; end: string | null }) {
  const now = useSyncExternalStore(noop, currentMonth, () => null);
  const last = end ? parseMonth(end) : now;
  return (
    <>
      <span>
        {formatMonth(start)} — {end ? formatMonth(end) : "Actual"}
      </span>
      {last !== null && (
        <>
          <span aria-hidden className="sm:hidden">·</span>
          <span>{formatDuration(last - parseMonth(start) + 1)}</span>
        </>
      )}
    </>
  );
}

const clock = new Intl.DateTimeFormat("es-CO", { timeZone: "America/Bogota", hour: "2-digit", minute: "2-digit", hour12: false });
const subscribeMinute = (cb: () => void) => {
  const id = setInterval(cb, 15_000);
  return () => clearInterval(id);
};

export function LocalTime() {
  const time = useSyncExternalStore(subscribeMinute, () => clock.format(new Date()), () => null);
  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}
