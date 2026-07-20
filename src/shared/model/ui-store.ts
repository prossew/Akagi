import { create } from "zustand";

interface UIState {
  isBalanceHidden: boolean;
  toggleBalanceVisibility: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isBalanceHidden: false,
  toggleBalanceVisibility: () =>
    set((state) => ({ isBalanceHidden: !state.isBalanceHidden })),
}));
