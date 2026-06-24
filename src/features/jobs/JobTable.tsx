import type { Job } from "@/lib/types";
import { JobRow } from "./JobRow";

const headers = [
  "Job Name",
  "Project ID",
  "Compute Type",
  "Status",
  "Created",
  "Actions",
];

export function JobTable({
  jobs,
  onView,
}: {
  jobs: Job[];
  onView: (job: Job) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full text-left">
        <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => (
            <JobRow key={j.id} job={j} onView={onView} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
