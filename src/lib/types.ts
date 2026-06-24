export type JobStatus = "queued" | "running" | "completed" | "failed";

export const JOB_STATUSES: JobStatus[] = [
  "queued",
  "running",
  "completed",
  "failed",
];

export type ComputeType = "CPU Small" | "CPU Large" | "GPU";

export interface Job {
  id: string; // e.g. JOB-0001
  name: string;
  projectId: string; // e.g. PROJ-1001
  computeType: ComputeType;
  status: JobStatus;
  createdAt: string; // ISO 8601
  startedAt?: string;
  completedAt?: string;
  inputFile: string;
  outputFile?: string;
  durationMins?: number;
  creditCost?: number;
}

export interface CreateJobInput {
  name: string;
  projectId: string;
  computeType: ComputeType;
  inputFile: string;
}
