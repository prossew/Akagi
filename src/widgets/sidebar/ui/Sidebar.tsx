import { useState } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Wallet,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { NavLink } from "react-router-dom";

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Дашборд", path: "/dashboard" },
  { icon: ArrowLeftRight, label: "Переводы", path: "/transfers" },
  { icon: BarChart3, label: "Аналитика", path: "/analytics" },
  { icon: Settings, label: "Настройки", path: "/settings" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex flex-col h-screen bg-slate border-r border-slate 800 text-text transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <div className="flex item-center gap-3 p-6 border-b border-slate-800 h-20">
        <div
          className={
            "flex items-center justify-center w10 h10 rounded-xl bg-slate text-text"
          }
        >
          <Wallet className="w-6 h-6" />
        </div>
        {!isCollapsed && (
          <span className="text-xl font-bold text-text tracking-wider ">
            Akagi
          </span>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 right-4 h8 w8 rounded-full border-slate 800 bg-[#0B0F19] text slate-400 hover: text-text hover:text-white hover:bg-slate 800 z-10"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </Button>

      <nav className="flex-1 flex flex-col gap-2 p-4">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive
                    ? "bg-blue-500/10 text-white"
                    : "hover:bg-slate-800/50 hover:text-white text-slate-400"
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-4 w-full px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all font-medium text-slate-400">
          <LogOut className="w-5 h-5 shrink-0" />
          {isCollapsed ? null : <span className="text-sm">Выйти</span>}
        </button>
      </div>
    </aside>
  );
}
