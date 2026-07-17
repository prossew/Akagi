import { DashboardGrid } from "../widgets/dashboard-grid/index.ts";
import { Sidebar } from "../widgets/sidebar/ui/Sidebar.tsx";

export default function App() {
  return (
    <div className="flex h-screen w-screen bg-[#070A13] overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex items-center justify-beetween px-8 h-20 border-b border-slate-800">
          <h1 className="text-xl font-semibold text-white">Дашборд</h1>
          <div className="flex items-center gap-4">
            <span className="text-xl text-slate-400 p-5">Привет, Олег</span>
          </div>
        </header>
        <section className="flex-1 p-8 text-white">
          <DashboardGrid />
        </section>
      </main>
    </div>
  );
}
