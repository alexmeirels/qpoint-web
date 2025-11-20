export function addDays(date: Date, delta: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + delta);
  return d;
}

export function formatLongPtBR(date: Date) {
  // "Sábado, 11 de Outubro"
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(
    date
  );
  const day = date.getDate().toString().padStart(2, "0");
  const month = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
    date
  );
  return `${capitalize(weekday)}, ${day} de ${capitalize(month)}`;
}
export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}


export function dateTimeToISO(baseDate: Date, hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    baseDate.getDate(),
    h,
    m,
    0,
    0
  );
  return d.toISOString();
}

export function addMinutesISO(isoStart: string, minutes: number) {
  const d = new Date(isoStart);
  d.setMinutes(d.getMinutes() + minutes);
  return d.toISOString();
}
