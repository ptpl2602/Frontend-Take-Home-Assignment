import { Header } from "@/components/layout/Header";
import { useJobs } from "@/hooks/useJobs";
import { totalCredits } from "@/lib/billing";
import { formatCredits } from "@/lib/format";
import { StatusBadge } from "@/features/jobs/StatusBadge";
import { SkeletonTable } from "@/components/states/SkeletonTable";

export function BillingPage() {
  const { jobs, loading } = useJobs();
  const total = totalCredits(jobs);

  return (
    <>
      <Header title="Billing" />
      <main className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <SkeletonTable rows={5} columns={4} />
        ) : (
          <>
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border bg-white p-4">
                <p className="text-2xl font-semibold">{total}</p>
                <p className="text-sm text-slate-500">Total credits used</p>
              </div>
              <div className="rounded-lg border bg-white p-4">
                <p className="text-2xl font-semibold">{jobs.length}</p>
                <p className="text-sm text-slate-500">Total jobs</p>
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg border bg-white">
              <table className="w-full text-left">
                <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Job Name</th>
                    <th className="px-4 py-3 font-medium">Compute Type</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Credit Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((j) => (
                    <tr key={j.id} className="border-b last:border-0">
                      <td className="px-4 py-3 text-sm font-medium">{j.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {j.computeType}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={j.status} />
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {formatCredits(j.creditCost)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </>
  );
}
