import type { ReactNode } from "react";
import { Bell, User } from "lucide-react";

export function Header({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-white px-6">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="ml-auto flex items-center gap-4">
        {children}
        <button
          type="button"
          aria-label="Notifications"
          className="text-slate-500 hover:text-slate-700"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
            <User className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">User Name</span>
        </div>
      </div>
    </header>
  );
}
