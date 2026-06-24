export function formatDateTime(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDuration(mins?: number): string {
  return mins == null ? "—" : `${mins} mins`;
}

export function formatCredits(n?: number): string {
  return n == null ? "—" : `${n} credits`;
}
