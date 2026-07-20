export interface Transaction {
  id: string;
  category: string;
  amount: number;
  currency: string;
  date: string;
  title: string;
  type: "expense" | "income";
}
