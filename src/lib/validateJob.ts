import type { CreateJobInput, ComputeType } from "@/lib/types";

export type JobErrors = Partial<Record<keyof CreateJobInput, string>>;

// Accepts raw form values, where computeType may still be the empty
// "not selected" sentinel before validation passes.
export interface JobFormValues {
  name?: string;
  projectId?: string;
  computeType?: ComputeType | "";
  inputFile?: string;
}

export function validateJob(input: JobFormValues): JobErrors {
  const errors: JobErrors = {};
  if (!input.name?.trim()) errors.name = "Job name is required";
  if (!input.projectId?.trim()) errors.projectId = "Project ID is required";
  if (!input.computeType) errors.computeType = "Compute type is required";
  if (!input.inputFile?.trim()) errors.inputFile = "Input file name is required";
  return errors;
}

export function isValid(errors: JobErrors): boolean {
  return Object.keys(errors).length === 0;
}
