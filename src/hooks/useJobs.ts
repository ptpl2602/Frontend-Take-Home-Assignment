import { useCallback, useEffect, useState } from "react";
import type { Job, CreateJobInput } from "@/lib/types";
import { loadJobs, addJob } from "@/lib/jobsStore";

export interface UseJobs {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  createJob: (input: CreateJobInput) => Job;
  reload: () => void;
}

const LOAD_DELAY_MS = 400;

export function useJobs(): UseJobs {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    const t = setTimeout(() => {
      try {
        setJobs(loadJobs());
      } catch {
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    }, LOAD_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const cancel = reload();
    return cancel;
  }, [reload]);

  const createJob = useCallback((input: CreateJobInput): Job => {
    const job = addJob(input);
    setJobs((prev) => [job, ...prev]);
    return job;
  }, []);

  return { jobs, loading, error, createJob, reload };
}
