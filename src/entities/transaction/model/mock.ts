import type { Transaction } from "./type";

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "t1", category: "Продукты", amount: 15400, currency: "RUB", date: "Сегодня, 14:32", title: "Супермаркет Лента", type: "expense" },
  { id: "t2", category: "Кафе", amount: 2100, currency: "RUB", date: "Вчера, 19:15", title: "Кофемания", type: "expense" },
  { id: "t3", category: "Зарплата", amount: 180000, currency: "RUB", date: "15 Июля", title: "ООО Тек Солюшнс", type: "income" },
  { id: "t4", category: "Инвестиции", amount: 50000, currency: "RUB", date: "12 Июля", title: "Пополнение брокера", type: "expense" },
  { id: "t5", category: "Техника", amount: 89000, currency: "RUB", date: "10 Июля", title: "re:Store", type: "expense" },
];

export const MOCK_EXPENSES_BY_CATEGORY = [
  { name: "Продукты", value: 15400, color: "#10B981" },   
  { name: "Техника", value: 89000, color: "#3B82F6" },    
  { name: "Инвестиции", value: 50000, color: "#F59E0B" }, 
  { name: "Кафе", value: 2100, color: "#EF4444" },        
];