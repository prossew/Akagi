export type CurrencyType = "RUB" | "USD" | "EUR" | "BTC";

export interface BankAccount {
  id: string;
  name: string;
  balance: number;
  currency: CurrencyType;
  accountNumber: string;
  type: "card" | "crypto" | "saving";
}
