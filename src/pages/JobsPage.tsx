import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { useJobs } from "@/hooks/useJobs";
import { applyFilters, type JobQuery } from "@/lib/filterSort";
import { paginate } from "@/lib/paginate";
import type { Job } from "@/lib/types";
import { JobFilters } from "@/features/jobs/JobFilters";
import { JobTable } from "@/features/jobs/JobTable";
import { JobPagination } from "@/features/jobs/JobPagination";
import { SkeletonTable } from "@/components/states/SkeletonTable";
import { EmptyState } from "@/features/jobs/states/EmptyState";
import { ErrorState } from "@/features/jobs/states/ErrorState";
import { JobDetailPanel } from "@/features/jobs/JobDetailPanel";
import { CreateJobModal } from "@/features/jobs/CreateJobModal";

const PAGE_SIZE = 5;

const initialQuery: JobQuery = {
  status: "all",
  search: "",
  sortKey: "createdAt",
  sortDir: "desc",
};

export function JobsPage() {
  const { jobs, loading, error, createJob, reload } = useJobs();
  const [query, setQuery] = useState<JobQuery>(initialQuery);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Job | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => applyFilters(jobs, query), [jobs, query]);
  const pageData = useMemo(
    () => paginate(filtered, page, PAGE_SIZE),
    [filtered, page],
  );

  function changeQuery(partial: Partial<JobQuery>) {
    setQuery((q) => ({ ...q, ...partial }));
    setPage(1);
  }

  return (
    <>
      <Header title="Jobs Dashboard">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            className="w-64 pl-9"
            placeholder="Search jobs..."
            value={query.search}
            onChange={(e) => changeQuery({ search: e.target.value })}
          />
        </div>
      </Header>

      <main className="flex-1 overflow-y-auto p-6">
        <JobFilters
          query={query}
          onChange={changeQuery}
          onNewJob={() => setModalOpen(true)}
        />

        {loading ? (
          <SkeletonTable columns={6} />
        ) : error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : jobs.length === 0 ? (
          <EmptyState variant="empty" onCreate={() => setModalOpen(true)} />
        ) : filtered.length === 0 ? (
          <EmptyState variant="filtered" onCreate={() => setModalOpen(true)} />
        ) : (
          <>
            <JobTable jobs={pageData.pageItems} onView={setSelected} />
            <JobPagination
              page={page}
              totalPages={pageData.totalPages}
              from={pageData.from}
              to={pageData.to}
              total={pageData.total}
              onPage={setPage}
            />
          </>
        )}
      </main>

      <JobDetailPanel job={selected} onClose={() => setSelected(null)} />
      <CreateJobModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={createJob}
      />
    </>
  );
}
