import { create } from 'zustand';

export interface PortfolioTransaction {
    id: string;
    type: 'Buy' | 'Sell';
    brand: string;
    goldType: string;
    quantity: number;
    pricePerTael: number;
    date: string;
    notes?: string;
}

export interface PortfolioSummary {
    totalValue: number;
    totalInvested: number;
    totalProfit: number;
    profitPercentage: number;
}

interface PortfolioState {
    transactions: PortfolioTransaction[];
    summary: PortfolioSummary;
    isLoading: boolean;
    error: string | null;
    setTransactions: (transactions: PortfolioTransaction[]) => void;
    addTransaction: (transaction: PortfolioTransaction) => void;
    removeTransaction: (id: string) => void;
    setSummary: (summary: PortfolioSummary) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    transactions: [],
    summary: { totalValue: 0, totalInvested: 0, totalProfit: 0, profitPercentage: 0 },
    isLoading: false,
    error: null,
    setTransactions: (transactions) => set({ transactions }),
    addTransaction: (transaction) => set((state) => ({ transactions: [...state.transactions, transaction] })),
    removeTransaction: (id) => set((state) => ({ transactions: state.transactions.filter(t => t.id !== id) })),
    setSummary: (summary) => set({ summary }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));
