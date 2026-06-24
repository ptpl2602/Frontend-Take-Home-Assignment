import { FolderOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({
  variant,
  onCreate,
}: {
  variant: "empty" | "filtered";
  onCreate: () => void;
}) {
  const filtered = variant === "filtered";
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border bg-white py-16 text-center">
      <FolderOpen className="mb-3 h-12 w-12 text-slate-300" />
      <p className="font-medium">
        {filtered ? "No matching jobs" : "No jobs found"}
      </p>
      <p className="mb-4 text-sm text-slate-500">
        {filtered
          ? "Try adjusting your filters or search."
          : "You haven't created any jobs yet."}
      </p>
      {!filtered && (
        <Button onClick={onCreate}>
          <Plus className="h-4 w-4" /> New Job
        </Button>
      )}
    </div>
  );
}
