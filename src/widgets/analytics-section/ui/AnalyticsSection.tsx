import {
  MOCK_TRANSACTIONS,
  MOCK_EXPENSES_BY_CATEGORY,
} from "@/entities/transaction/model/mock";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, ShoppingBag, ArrowDownRight } from "lucide-react";

const SPENDING_DATA = [
  { month: "Май", spending: 45000, budget: 60000 },
  { month: "Июн", spending: 120000, budget: 80000 },
  { month: "Июл", spending: 156500, budget: 160000 },
  { month: "Авг", spending: 110000, budget: 100000 },
  { month: "Сен", spending: 95000, budget: 90000 },
  { month: "Окт", spending: 145200, budget: 110000 },
];

export function AnalyticsSection() {
  const totalExpenses = MOCK_EXPENSES_BY_CATEGORY.reduce(
    (acc, item) => acc + item.value,
    0,
  );

  const topExpense = [...MOCK_EXPENSES_BY_CATEGORY].sort(
    (a, b) => b.value - a.value,
  )[0];

  const categoriesWithPercent = MOCK_EXPENSES_BY_CATEGORY.map((cat) => ({
    ...cat,
    percent: totalExpenses
      ? ((cat.value / totalExpenses) * 100).toFixed(1)
      : "0",
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-wide uppercase">
          Аналитика
        </h1>
        <div className="h-1 w-20 bg-brand mt-1 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-light">
                  Обзор расходов
                </h3>
                <p className="text-2xl font-bold text-white font-mono mt-1">
                  {totalExpenses.toLocaleString("ru-RU")} ₽
                </p>
              </div>
              <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                За последний период
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SPENDING_DATA}>
                  <defs>
                    <linearGradient
                      id="colorSpending"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={"var(--color-text)"}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor={"var(--color-text)"}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09090b",
                      borderColor: "#27272a",
                      borderRadius: "0.75rem",
                      color: "#fff",
                    }}
                    
                  />
                  <Area
                    type="monotone"
                    dataKey="spending"
                    name="Расходы"
                    stroke={"var(--color-text)"}
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorSpending)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-semibold text-text mb-4">
              Расходы по категориям
            </h3>

            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex mb-6">
              {categoriesWithPercent.map((cat, i) => (
                <div
                  key={i}
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${cat.percent}%`,
                    backgroundColor: cat.color,
                  }}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categoriesWithPercent.map((cat, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 border border-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-xs text-slate-300">{cat.name}</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-white">
                    {cat.value.toLocaleString("ru-RU")} ₽ ({cat.percent}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xs font-sans uppercase tracking-wider text-brand-light font-bold">
              Инсайты по тратам
            </h3>

            <div className="space-y-3">
              {topExpense && (
                <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div className="p-2 bg-brand/10 rounded-lg text-brand-light shrink-0">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">
                      Наибольшая статья расходов
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {topExpense.name} —{" "}
                      {topExpense.value.toLocaleString("ru-RU")} ₽
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400 shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Рост трат (+12%)</p>
                  <p className="text-sm font-semibold text-white">
                    Техника и гаджеты
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 shrink-0">
                  <ArrowDownRight className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Экономия за период</p>
                  <p className="text-sm font-semibold text-white">
                    Кафе (-2,100 ₽)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 text-text">
              Последние операции
            </h3>
            <div className="space-y-2">
              {MOCK_TRANSACTIONS.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-800/30"
                >
                  <div>
                    <p className="font-medium text-white">{t.title}</p>
                    <p className="text-[10px] text-slate-500">{t.date}</p>
                  </div>
                  <span
                    className={`font-mono font-semibold ${
                      t.type === "income"
                        ? "text-emerald-400"
                        : "text-slate-300"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {t.amount.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
