import { Plus } from "lucide-react";
import type { JobQuery } from "@/lib/filterSort";
import { JOB_STATUSES } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  query: JobQuery;
  onChange: (partial: Partial<JobQuery>) => void;
  onNewJob: () => void;
}

export function JobFilters({ query, onChange, onNewJob }: Props) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <Button onClick={onNewJob}>
        <Plus className="h-4 w-4" /> New Job
      </Button>

      <Select
        value={query.status}
        onValueChange={(v) => onChange({ status: v as JobQuery["status"] })}
      >
        <SelectTrigger className="w-44" aria-label="Filter by status">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          {JOB_STATUSES.map((s) => (
            <SelectItem key={s} value={s} className="capitalize">
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={`${query.sortKey}:${query.sortDir}`}
        onValueChange={(v) => {
          const [sortKey, sortDir] = v.split(":") as [
            JobQuery["sortKey"],
            JobQuery["sortDir"],
          ];
          onChange({ sortKey, sortDir });
        }}
      >
        <SelectTrigger className="w-52" aria-label="Sort jobs">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt:desc">Created (newest)</SelectItem>
          <SelectItem value="createdAt:asc">Created (oldest)</SelectItem>
          <SelectItem value="status:asc">Status (A–Z)</SelectItem>
          <SelectItem value="status:desc">Status (Z–A)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
