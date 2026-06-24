import type { Job, JobStatus } from "@/lib/types";
import { JOB_STATUSES } from "@/lib/types";

export function countByStatus(jobs: Job[]): Record<JobStatus, number> {
  const base = Object.fromEntries(
    JOB_STATUSES.map((s) => [s, 0]),
  ) as Record<JobStatus, number>;
  for (const j of jobs) base[j.status] += 1;
  return base;
}

export function recentJobs(jobs: Job[], n: number): Job[] {
  return [...jobs]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, n);
}
