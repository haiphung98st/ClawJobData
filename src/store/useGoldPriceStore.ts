import { create } from 'zustand';
import { Point } from '../features/gold-prices/types'; // We align types later

interface Provider {
    id: string;
    name: string;
}

interface GoldPriceState {
    currentWorldPrice: number;
    worldPriceDirection: 'up' | 'down' | 'neutral';
    providers: Provider[];
    selectedProviderId: string | null;
    historyData: Point[];
    isLoading: boolean;
    error: string | null;
    setCurrentWorldPrice: (price: number, direction?: 'up' | 'down' | 'neutral') => void;
    setProviders: (providers: Provider[]) => void;
    setSelectedProviderId: (id: string | null) => void;
    setHistoryData: (data: Point[]) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useGoldPriceStore = create<GoldPriceState>((set) => ({
    currentWorldPrice: 0,
    worldPriceDirection: 'neutral',
    providers: [],
    selectedProviderId: null,
    historyData: [],
    isLoading: false,
    error: null,
    setCurrentWorldPrice: (price, direction = 'neutral') => set({ currentWorldPrice: price, worldPriceDirection: direction }),
    setProviders: (providers) => set({ providers }),
    setSelectedProviderId: (id) => set({ selectedProviderId: id }),
    setHistoryData: (data) => set({ historyData: data }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));
