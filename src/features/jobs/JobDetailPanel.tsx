import type { ReactNode } from "react";
import { Download } from "lucide-react";
import type { Job } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import { formatDateTime, formatDuration, formatCredits } from "@/lib/format";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function FileRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="flex items-center gap-2 font-medium">
        {value ?? "—"}
        {value && <Download className="h-4 w-4 text-slate-400" />}
      </span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t py-4">
      <h3 className="mb-2 text-xs font-semibold uppercase text-slate-400">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function JobDetailPanel({
  job,
  onClose,
}: {
  job: Job | null;
  onClose: () => void;
}) {
  return (
    <Sheet open={!!job} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        {job && (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between gap-3 pr-6">
                {job.name}
                <StatusBadge status={job.status} />
              </SheetTitle>
            </SheetHeader>
            <div className="mt-2">
              <Row label="Job ID" value={job.id} />
              <Row label="Project ID" value={job.projectId} />
              <Row label="Compute Type" value={job.computeType} />
              <Row label="Status" value={<StatusBadge status={job.status} />} />
              <Row label="Created" value={formatDateTime(job.createdAt)} />
              <Row label="Started" value={formatDateTime(job.startedAt)} />
              <Row label="Completed" value={formatDateTime(job.completedAt)} />
            </div>
            <Section title="Files">
              <FileRow label="Input File" value={job.inputFile} />
              <FileRow label="Output File" value={job.outputFile} />
            </Section>
            <Section title="Execution">
              <Row label="Duration" value={formatDuration(job.durationMins)} />
              <Row label="Credit Cost" value={formatCredits(job.creditCost)} />
            </Section>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
