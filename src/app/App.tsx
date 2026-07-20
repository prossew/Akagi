import { DashboardGrid } from "../widgets/dashboard-grid/index.ts";
import { Sidebar } from "../widgets/sidebar/ui/Sidebar.tsx";
import { useUIStore } from "@/shared/model/ui-store.ts";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/shared/ui/button.tsx";

export default function App() {
  const isBalanceHidden = useUIStore((state) => state.isBalanceHidden);
  const toggleBalanceVisibility = useUIStore(
    (state) => state.toggleBalanceVisibility,
  );

  return (
    <div className="flex h-screen w-screen bg-[#070A13] overflow-hidden text-slate-100">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-y-auto min-h-0">
        <header className="flex items-center justify-between px-8 h-20 border-b border-slate-800 flex-shrink-0 bg-[#070A13]/80 backdrop-blur sticky top-0 z-50">
          <h1 className="text-xl font-semibold text-white">Дашборд</h1>
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBalanceVisibility}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {isBalanceHidden ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </Button>
            <span className="text-xl text-slate-400">Привет, Олег</span>
          </div>
        </header>

        <section className="p-8 w-full max-w-[1600px] mx-auto h-full">
          <DashboardGrid />
        </section>
      </main>
    </div>
  );
}
