import { CreditCard, Wallet, Coins } from "lucide-react";
import type { BankAccount } from "../model/type";

interface AcountCardProps {
  account: BankAccount;
  isBalanceHidden?: boolean;
}

export function AccountCard({ account, isBalanceHidden }: AcountCardProps) {
  const getIcon = () => {
    switch (account.type) {
      case "crypto":
        return <Coins className="w-5 h-5 text-amber-400" />;
      case "saving":
        return <Wallet className="w-5 h-5 text-blue-400" />;
      default:
        return <CreditCard className="w-5 h-5 text-emerald-400" />;
    }
  };

  const formatBalance = (value: number, currency: string) => {
    return new Intl.NumberFormat("ru-Ru", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: currency === "BTC" ? 4 : 2,
    }).format(value);
  };

  const maskNumber = (num: string) => {
    const lastFour = num.slice(-4);
    return `**** ${lastFour}`;
  };

  return (
    <div className="flex items-center justify-between p-3 bg-slate-900/40 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-all cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 group-hover:bg-slate-700/50 transition-colors">
          {getIcon()}
        </div>
        <div>
          <h4 className="text-sm font-medium text-slate-200">{account.name}</h4>
          <p className="text-xs text-slate-500">
            {maskNumber(account.accountNumber)}
          </p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-sm font-semibold text-white font-mono">
          {isBalanceHidden
            ? "••••••"
            : formatBalance(account.balance, account.currency)}
        </span>
      </div>
    </div>
  );
}
