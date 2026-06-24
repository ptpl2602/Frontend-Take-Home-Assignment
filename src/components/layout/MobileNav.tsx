import { NavLink } from "react-router-dom";
import { LayoutDashboard, Briefcase, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/billing", label: "Billing", icon: CreditCard },
];

export function MobileNav() {
  return (
    <nav className="flex shrink-0 border-t bg-white md:hidden">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "flex flex-1 flex-col items-center gap-1 py-2 text-xs",
              isActive ? "text-slate-900" : "text-slate-500",
            )
          }
        >
          <Icon className="h-5 w-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
