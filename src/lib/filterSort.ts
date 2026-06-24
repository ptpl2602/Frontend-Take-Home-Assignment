import type { Job, JobStatus } from "@/lib/types";

export type SortKey = "createdAt" | "status";
export type SortDir = "asc" | "desc";

export interface JobQuery {
  status: JobStatus | "all";
  search: string;
  sortKey: SortKey;
  sortDir: SortDir;
}

export function applyFilters(jobs: Job[], q: JobQuery): Job[] {
  const term = q.search.trim().toLowerCase();
  const filtered = jobs.filter((j) => {
    const statusOk = q.status === "all" || j.status === q.status;
    const searchOk = term === "" || j.name.toLowerCase().includes(term);
    return statusOk && searchOk;
  });
  const dir = q.sortDir === "asc" ? 1 : -1;
  return [...filtered].sort((a, b) => {
    const av = q.sortKey === "createdAt" ? a.createdAt : a.status;
    const bv = q.sortKey === "createdAt" ? b.createdAt : b.status;
    return av < bv ? -1 * dir : av > bv ? 1 * dir : 0;
  });
}
