import type { Job } from "@/lib/types";

export function totalCredits(jobs: Job[]): number {
  return jobs.reduce((sum, j) => sum + (j.creditCost ?? 0), 0);
}
