import { NavLink } from "react-router-dom";
import { Cloud, LayoutDashboard, Briefcase, CreditCard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/billing", label: "Billing", icon: CreditCard },
];

export function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r bg-white md:flex">
      <div className="flex h-16 items-center gap-2 border-b px-4 font-semibold">
        <span className="flex h-7 w-7 items-center justify-center rounded bg-slate-800 text-white">
          <Cloud className="h-4 w-4" />
        </span>
        Cloud Platform
      </div>
      <nav className="space-y-1 p-3">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
                isActive
                  ? "bg-slate-100 font-medium text-slate-900"
                  : "text-slate-600 hover:bg-slate-50",
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-3 border-t p-4 text-sm text-slate-500">
        <Settings className="h-4 w-4" />
        Settings
      </div>
    </aside>
  );
}
