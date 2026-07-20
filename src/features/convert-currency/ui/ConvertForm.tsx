import { useState, useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { marketRatesSignal } from "@/entities/market-rate";
import { useSignals } from "@preact/signals-react/runtime";

export function ConvertForm() {
  useSignals();

  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("RUB");
  const [result, setResult] = useState<string>("0.00");

  useEffect(() => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setResult("0.00");
      return;
    }

    const rates = marketRatesSignal.value;
    const usdToRub = rates.find((r) => r.ticker === "USD/RUB")?.price || 92.4;
    const eurToRub = rates.find((r) => r.ticker === "EUR/RUB")?.price || 100.1;
    const btcToUsd = rates.find((r) => r.ticker === "BTC/USD")?.price || 68200;

    let amountInRub = numAmount;

    if (fromCurrency === "USD") amountInRub = numAmount * usdToRub;
    if (fromCurrency === "EUR") amountInRub = numAmount * eurToRub;
    if (fromCurrency === "BTC") amountInRub = numAmount * btcToUsd * usdToRub;

    let finalAmount = amountInRub;
    if (toCurrency === "USD") finalAmount = amountInRub / usdToRub;
    if (toCurrency === "EUR") finalAmount = amountInRub / eurToRub;
    if (toCurrency === "BTC") finalAmount = amountInRub / (btcToUsd * usdToRub);

    setResult(
      toCurrency === "BTC" ? finalAmount.toFixed(6) : finalAmount.toFixed(2),
    );
  }, [amount, fromCurrency, toCurrency, marketRatesSignal.value]);

  const handleExchange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    alert(
      `Успешно обменено: ${amount} ${fromCurrency} в ${result} ${toCurrency}`,
    );
    setAmount("");
  };

  return (
    <form
      onSubmit={handleExchange}
      className="flex flex-col gap-2 h-full justify-between"
    >
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-[10px] text-slate-500 block mb-1">
            Продаю
          </label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <div className="w-20">
          <label className="text-[10px] text-slate-500 block mb-1">
            Валюта
          </label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="RUB">RUB</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="BTC">BTC</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-[10px] text-slate-500 block mb-1">
            Получу (примерно)
          </label>
          <div className="w-full bg-slate-900/50 border border-slate-800/80 rounded-lg px-2.5 py-1.5 text-sm font-mono text-emerald-400 select-none">
            {result}
          </div>
        </div>
        <div className="w-20">
          <label className="text-[10px] text-slate-500 block mb-1">
            Валюта
          </label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="RUB">RUB</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="BTC">BTC</option>
          </select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!amount || fromCurrency === toCurrency}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs py-1.5 h-8 mt-1 rounded-lg transition-colors disabled:opacity-40 disabled:hover:bg-emerald-600"
      >
        Обменять в 1 клик
      </Button>
    </form>
  );
}
