// Mendoza time is UTC-3 all year (no daylight saving).
export const MENDOZA_OFFSET = "-03:00";
export const SLOT_MINUTES = 45;
const RANGES: Array<[number, number]> = [
  [9 * 60, 13 * 60],
  [16 * 60, 19 * 60],
];

const pad = (n: number) => String(n).padStart(2, "0");

/** All slot labels (HH:mm) for a working day. */
export function daySlots(): string[] {
  const out: string[] = [];
  for (const [start, end] of RANGES) {
    for (let m = start; m + SLOT_MINUTES <= end; m += SLOT_MINUTES) {
      out.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
    }
  }
  return out;
}

/** ISO instant for a Mendoza date (YYYY-MM-DD) + time (HH:mm). */
export function slotToIso(date: string, time: string): string {
  return new Date(`${date}T${time}:00${MENDOZA_OFFSET}`).toISOString();
}

/** Current date (YYYY-MM-DD) in Mendoza. */
export function mendozaToday(now = new Date()): string {
  const d = new Date(now.getTime() - 3 * 3600 * 1000);
  return d.toISOString().slice(0, 10);
}

export function isWeekend(date: string): boolean {
  const day = new Date(`${date}T12:00:00${MENDOZA_OFFSET}`).getUTCDay();
  return day === 0 || day === 6;
}

/** Slots still bookable: weekday, in the future, not taken. */
export function availableSlots(date: string, takenIso: string[], now = new Date()): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || isWeekend(date)) return [];
  if (date < mendozaToday(now)) return [];
  const taken = new Set(takenIso.map((t) => new Date(t).toISOString()));
  return daySlots().filter((t) => {
    const iso = slotToIso(date, t);
    return new Date(iso) > now && !taken.has(iso);
  });
}

export function formatSlot(iso: string): string {
  return new Date(iso).toLocaleString("es-AR", {
    timeZone: "America/Argentina/Mendoza",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
