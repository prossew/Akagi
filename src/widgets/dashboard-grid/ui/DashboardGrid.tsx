import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { marketRatesSignal } from "@/entities/market-rate";
import { AccountCard } from "@/entities/account";
import type { BankAccount } from "@/entities/account";
import { useSignals } from "@preact/signals-react/runtime";
import { useUIStore } from "@/shared/model/ui-store";

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

export function DashboardGrid() {
  // Активируем отслеживание сигналов для реалтайм-котировок
  useSignals();

  // Достаем состояние скрытия баланса из Zustand
  const isBalanceHidden = useUIStore((state) => state.isBalanceHidden);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[160px]">
      {/* 1. Глобальный баланс с поддержкой скрытия */}
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

      {/* 2. Мои счета (пропсы внутри AccountCard сами отработают скрытие) */}
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

      {/* 3. Онлайн котировки */}
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

      {/* 4. Рост портфеля */}
      <Card className="md:col-span-2 row-span-2 bg-[#111827] border-slate-800 text-white">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-slate-400">
            Рост портфеля
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center text-slate-600">
          график Recharts
        </CardContent>
      </Card>

      {/* 5. Быстрый обмен */}
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

      {/* 6. Аналитика трат */}
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

      {/* 7. Последние транзакции */}
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
