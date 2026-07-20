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

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Дашборд", value: "dashboard" },
  { icon: ArrowLeftRight, label: "Переводы", value: "transfers" },
  { icon: BarChart3, label: "Аналитика", value: "analytics" },
  { icon: Settings, label: "Настройки", value: "settings" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <aside
      className={`relative flex flex-col h-screen bg-[#0B0F19] border-r border-slate 800 text-slate-400 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <div className="flex item-center gap-3 p-6 border-b border-slate-800 h-20">
        <div
          className={
            "flex items-center justify-center w10 h10 rounded-xl bg-elemerald-500/10 text-emerald-400"
          }
        >
          <Wallet className="w-6 h-6" />
        </div>
        {!isCollapsed && (
          <span className="text-xl font-bold text-white tracking-wider ">
            Akagi
          </span>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 right-4 h8 w8 rounded-full border-slate 800 bg-[#0B0F19] text slate-400 hover: text-white hover:text-white hover:bg-slate 800 z-10"
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
          const isActive = activeTab === item.value;
          return (
            <button
              key={item.value}
              onClick={() => setActiveTab(item.value)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? "bg-emerald-500/10 text-emerald-400" : "hover:bg-slate-800/50 hover:text-white"}`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-4 w-full px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all font-medium">
          <LogOut className="w-5 h-5 shrink-0" />
          {isCollapsed ? null : <span className="text-sm">Выйти</span>}
        </button>
      </div>
    </aside>
  );
}
