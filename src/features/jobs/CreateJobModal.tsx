import { useState } from "react";
import type { ReactNode } from "react";
import type { CreateJobInput, ComputeType } from "@/lib/types";
import { COMPUTE_TYPES } from "@/data/computeTypes";
import { validateJob, isValid, type JobErrors } from "@/lib/validateJob";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: CreateJobInput) => void;
}

const empty = {
  name: "",
  projectId: "",
  computeType: "" as ComputeType | "",
  inputFile: "",
};

export function CreateJobModal({ open, onOpenChange, onSubmit }: Props) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<JobErrors>({});

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function reset() {
    setForm(empty);
    setErrors({});
  }

  function handleSubmit() {
    const errs = validateJob(form);
    setErrors(errs);
    if (!isValid(errs)) return;
    onSubmit({
      name: form.name.trim(),
      projectId: form.projectId.trim(),
      computeType: form.computeType as ComputeType,
      inputFile: form.inputFile.trim(),
    });
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) reset();
        onOpenChange(o);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Field label="Job Name" id="name" error={errors.name}>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Enter job name"
            />
          </Field>
          <Field label="Project ID" id="projectId" error={errors.projectId}>
            <Input
              id="projectId"
              value={form.projectId}
              onChange={(e) => set("projectId", e.target.value)}
              placeholder="Enter project ID"
            />
          </Field>
          <Field label="Compute Type" id="computeType" error={errors.computeType}>
            <select
              id="computeType"
              aria-label="Compute Type"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={form.computeType}
              onChange={(e) => set("computeType", e.target.value as ComputeType)}
            >
              <option value="">Select compute type</option>
              {COMPUTE_TYPES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Input File Name" id="inputFile" error={errors.inputFile}>
            <Input
              id="inputFile"
              value={form.inputFile}
              onChange={(e) => set("inputFile", e.target.value)}
              placeholder="Enter input file name"
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 items-start gap-3">
      <Label htmlFor={id} className="pt-2.5 text-sm">
        {label}
      </Label>
      <div className="col-span-2">
        {children}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}
