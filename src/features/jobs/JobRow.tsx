import { Eye } from "lucide-react";
import type { Job } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import { formatDateTime } from "@/lib/format";
import { Button } from "@/components/ui/button";

export function JobRow({
  job,
  onView,
}: {
  job: Job;
  onView: (job: Job) => void;
}) {
  return (
    <tr className="border-b last:border-0 hover:bg-slate-50">
      <td className="px-4 py-3 text-sm font-medium">{job.name}</td>
      <td className="px-4 py-3 text-sm text-slate-600">{job.projectId}</td>
      <td className="px-4 py-3 text-sm text-slate-600">{job.computeType}</td>
      <td className="px-4 py-3">
        <StatusBadge status={job.status} />
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">
        {formatDateTime(job.createdAt)}
      </td>
      <td className="px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          aria-label={`View ${job.name}`}
          onClick={() => onView(job)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
}
