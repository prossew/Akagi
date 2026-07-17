import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/../../src/shared/ui/card";

export function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[160px]">
      <Card className="md:col-span-2 row-span-1 bg-[#111827] border-slate-800 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slice-400">
            Глобальный баланс
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight">380 000.00 ₽ </div>
          <p className="text-xs text-emerald-400 mt-1">+4,2% в этом месяце</p>
        </CardContent>
      </Card>
      <Card className="row-span-2 bg-[#111827] border-slate-800 text-white">
        <CardHeader>
          <CardTitle className="text-sm font-meduim text-slate-400">
            Мои счета
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
            Rub Account
          </div>
          <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
            USD Account
          </div>
        </CardContent>
      </Card>
      <Card className="row-span-3 bg-[#111827] border-slate-800 text-white">
        <CardHeader>
          <CardTitle className="text-sm font-meduim text-slate-400">
            online котировки
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="md:col-span-2 row-span-2 bg-[#111827] border-slate-800 text-white">
        <CardHeader>
          <CardTitle className="text-sm font-meduim text-slate-400">
            Рост портфеля
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-content text-slate-600">
          график Recharts
        </CardContent>
      </Card>
      <Card className="bg-[#111827] border-slate-800 text-white">
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium text-slate-400">
            Быстрый обмен
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-slate-500">
          Инпуты конвертации
        </CardContent>
      </Card>

      <Card className="bg-[#111827] border-slate-800 text-white">
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium text-slate-400">
            Аналитика трат
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-slate-500">
          Круговая диаграмма
        </CardContent>
      </Card>

      <Card className="bg-[#111827] border-slate-800 text-white">
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium text-slate-400">
            Последние транзакции
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-slate-500">
          Список покупок
        </CardContent>
      </Card>
    </div>
  );
}
