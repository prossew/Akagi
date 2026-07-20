import { signal } from "@preact/signals-react";

export interface MarketRate {
  ticker: string;
  name: string;
  price: number;
  change: number;
}

export const marketRatesSignal = signal<MarketRate[]>([
  { ticker: "USD/RUB", name: "Доллар США", price: 92.4, change: 0.1 },
  { ticker: "EUR/RUB", name: "Евро", price: 100.15, change: -0.2 },
  { ticker: "BTC/USD", name: "Bitcoin", price: 68200.0, change: 1.4 },
  { ticker: "ETH/USD", name: "Ethereum", price: 3500.0, change: -0.5 },
]);

export function startMarketRatesSimulation() {
  setInterval(() => {
    marketRatesSignal.value = marketRatesSignal.value.map((rate) => {
      const percentage = (Math.random() - 0.5) * 0.01;
      const priceChange = rate.price * percentage;
      const newPrice = rate.price + priceChange;
      const newChange = rate.change + percentage * 10;

      return {
        ...rate,
        price:
          rate.ticker.includes("BTC") || rate.ticker.includes("ETH")
            ? Number(newPrice.toFixed(2))
            : Number(newPrice.toFixed(4)),
        change: Number(newChange.toFixed(2)),
      };
    }, 1500);
  });
}
