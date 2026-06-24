import type { Job, CreateJobInput } from "@/lib/types";
import seed from "@/data/jobs.seed.json";

export const STORAGE_KEY = "cjd.jobs.v1";

export function loadJobs(): Job[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    const seeded = seed as Job[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    return JSON.parse(raw) as Job[];
  } catch {
    return [];
  }
}

export function saveJobs(jobs: Job[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export function nextJobId(jobs: Job[]): string {
  const max = jobs.reduce((m, j) => {
    const n = Number(j.id.replace("JOB-", ""));
    return Number.isFinite(n) && n > m ? n : m;
  }, 0);
  return `JOB-${String(max + 1).padStart(4, "0")}`;
}

export function addJob(input: CreateJobInput): Job {
  const jobs = loadJobs();
  const job: Job = {
    id: nextJobId(jobs),
    name: input.name,
    projectId: input.projectId,
    computeType: input.computeType,
    status: "queued",
    createdAt: new Date().toISOString(),
    inputFile: input.inputFile,
  };
  saveJobs([job, ...jobs]);
  return job;
}
