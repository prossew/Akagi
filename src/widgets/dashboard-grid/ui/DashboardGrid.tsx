import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { marketRatesSignal } from "@/entities/market-rate";
import { AccountCard } from "@/entities/account";
import type { BankAccount } from "@/entities/account";
import { useSignals } from "@preact/signals-react/runtime";
import { useUIStore } from "@/shared/model/ui-store";
import { ConvertForm } from "@/features/convert-currency";
import {
  MOCK_TRANSACTIONS,
  MOCK_EXPENSES_BY_CATEGORY,
} from "@/entities/transaction";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const MOCK_ACCOUNTS: BankAccount[] = [
  {
    id: "1",
    name: "Основная карта Мир",
    balance: 120000,
    currency: "RUB",
    accountNumber: "2202200012345678",
    type: "card",
  },
  {
    id: "2",
    name: "Долларовый счет",
    balance: 1500,
    currency: "USD",
    accountNumber: "40817810000001234567",
    type: "saving",
  },
  {
    id: "3",
    name: "Крипто-кошелек",
    balance: 0.15,
    currency: "BTC",
    accountNumber: "bc1qxy2kgdygjrsqtzq2n0yrf249",
    type: "crypto",
  },
];

const MOCK_CHART_DATA = [
  { month: "Янв", balance: 290000 },
  { month: "Фев", balance: 310000 },
  { month: "Мар", balance: 300000 },
  { month: "Апр", balance: 340000 },
  { month: "Май", balance: 330000 },
  { month: "Июн", balance: 380000 },
];

export function DashboardGrid() {
  useSignals();
  const isBalanceHidden = useUIStore((state) => state.isBalanceHidden);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
      <Card className="md:col-span-2 row-span-1 bg-[#111827] border-slate-800 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-400">
            Глобальный баланс
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight font-mono">
            {isBalanceHidden ? "•••••• ₽" : "380 000.00 ₽"}
          </div>
          <p className="text-xs text-emerald-400 mt-1">+4,2% в этом месяце</p>
        </CardContent>
      </Card>

      <Card className="row-span-2 bg-[#111827] border-slate-800 text-white">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-slate-400">
            Мои счета
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {MOCK_ACCOUNTS.map((acc) => (
            <AccountCard key={acc.id} account={acc} />
          ))}
        </CardContent>
      </Card>

      <Card className="row-span-3 bg-[#111827] border-slate-800 text-white flex flex-col">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-slate-400">
            Онлайн котировки
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 flex-1 overflow-y-auto">
          {marketRatesSignal.value.map((rate) => {
            const isPositive = rate.change >= 0;
            return (
              <div
                key={rate.ticker}
                className="flex items-center justify-between border-b border-slate-800/50 pb-2 last:border-0"
              >
                <div>
                  <div className="font-bold tracking-tight text-sm">
                    {rate.ticker}
                  </div>
                  <div className="text-[10px] text-slate-500">{rate.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold font-mono text-sm">
                    {rate.ticker.includes("BTC") || rate.ticker.includes("ETH")
                      ? rate.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : rate.price.toFixed(2) + " ₽"}
                  </div>
                  <div
                    className={`text-xs font-mono font-medium mt-0.5 ${isPositive ? "text-emerald-400" : "text-rose-500"}`}
                  >
                    {isPositive ? `+${rate.change}%` : `${rate.change}%`}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="md:col-span-2 row-span-2 bg-[#111827] border-slate-800 text-white flex flex-col">
        <CardHeader className="pb-0">
          <CardTitle className="text-sm font-medium text-slate-400">
            Рост портфеля
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-[220px] pt-4 pr-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_CHART_DATA}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1F2937"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
                hide={isBalanceHidden}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#94A3B8" }}
                itemStyle={{ color: "#FFF" }}
                formatter={(value: any) => [
                  isBalanceHidden ? "•••••• ₽" : `${value.toLocaleString()} ₽`,
                  "Баланс",
                ]}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#10B981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorBalance)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-[#111827] border-slate-800 text-white flex flex-col">
        <CardHeader className="py-3 flex-shrink-0">
          <CardTitle className="text-sm font-medium text-slate-400">
            Быстрый обмен
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-4 px-6">
          <ConvertForm />
        </CardContent>
      </Card>

      <Card className="bg-[#111827] border-slate-800 text-white flex flex-col">
        <CardHeader className="py-3 flex-shrink-0">
          <CardTitle className="text-sm font-medium text-slate-400">
            Аналитика трат
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center justify-center pb-4">
          <div className="w-full h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_EXPENSES_BY_CATEGORY}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={38}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {MOCK_EXPENSES_BY_CATEGORY.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2 text-[10px] text-slate-400 w-full px-2">
            {MOCK_EXPENSES_BY_CATEGORY.slice(0, 4).map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-1.5 truncate"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#111827] border-slate-800 text-white flex flex-col">
        <CardHeader className="py-3 flex-shrink-0">
          <CardTitle className="text-sm font-medium text-slate-400">
            Последние транзакции
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto px-4 pb-3 flex flex-col gap-2.5">
          {MOCK_TRANSACTIONS.slice(0, 3).map((tx) => {
            const isIncome = tx.type === "income";
            return (
              <div
                key={tx.id}
                className="flex items-center justify-between text-xs border-b border-slate-800/40 pb-2 last:border-0 last:pb-0"
              >
                <div className="truncate pr-2">
                  <div className="font-medium text-slate-200 truncate">
                    {tx.title}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {tx.date}
                  </div>
                </div>
                <div
                  className={`font-mono font-semibold flex-shrink-0 ${isIncome ? "text-emerald-400" : "text-slate-300"}`}
                >
                  {isBalanceHidden
                    ? "••••"
                    : `${isIncome ? "+" : "-"}${tx.amount.toLocaleString()} ₽`}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
