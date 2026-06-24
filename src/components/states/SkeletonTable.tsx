import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

// Varied cell widths so rows read like real table content (not uniform bars),
// matching the wireframe's loading state.
const CELL_WIDTHS = ["w-40", "w-24", "w-28", "w-20", "w-32", "w-24"];

/**
 * Generic loading placeholder shaped like a table row: a set of
 content-sized bars with a small trailing square for the actions column.
 * Reused by any view that loads tabular/list data (jobs, billing, dashboard).
 */
export function SkeletonTable({
  rows = 6,
  columns = 6,
  className,
}: SkeletonTableProps) {
  return (
    <div
      className={cn("divide-y rounded-lg border bg-white", className)}
      data-testid="skeleton-table"
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3.5">
          {Array.from({ length: columns }).map((_, j) =>
            j === columns - 1 ? (
              <Skeleton key={j} className="ml-auto h-6 w-6 rounded-md" />
            ) : (
              <Skeleton
                key={j}
                className={cn("h-4", CELL_WIDTHS[j % CELL_WIDTHS.length])}
              />
            ),
          )}
        </div>
      ))}
    </div>
  );
}
