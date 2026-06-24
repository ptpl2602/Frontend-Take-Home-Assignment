import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { useJobs } from "@/hooks/useJobs";
import { countByStatus, recentJobs } from "@/lib/summary";
import { JOB_STATUSES } from "@/lib/types";
import { StatusBadge } from "@/features/jobs/StatusBadge";
import { formatDateTime } from "@/lib/format";
import { SkeletonTable } from "@/components/states/SkeletonTable";

export function DashboardPage() {
  const { jobs, loading } = useJobs();
  const counts = countByStatus(jobs);
  const recent = recentJobs(jobs, 5);

  return (
    <>
      <Header title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <SkeletonTable rows={5} columns={2} />
        ) : (
          <>
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {JOB_STATUSES.map((s) => (
                <div key={s} className="rounded-lg border bg-white p-4">
                  <p className="text-2xl font-semibold">{counts[s]}</p>
                  <p className="text-sm capitalize text-slate-500">{s}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border bg-white">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <h2 className="font-medium">Recent Jobs</h2>
                <Link to="/jobs" className="text-sm text-blue-600 hover:underline">
                  View all
                </Link>
              </div>
              <ul className="divide-y">
                {recent.map((j) => (
                  <li
                    key={j.id}
                    className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
                  >
                    <span className="font-medium">{j.name}</span>
                    <span className="flex items-center gap-3 text-slate-500">
                      <span className="hidden sm:inline">
                        {formatDateTime(j.createdAt)}
                      </span>
                      <StatusBadge status={j.status} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </main>
    </>
  );
}
