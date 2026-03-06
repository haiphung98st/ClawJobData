export interface Point {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
}

export interface Provider {
    id: string;
    name: string;
}

export interface ProviderPrice {
    id: string;
    buyPrice: number;
    sellPrice: number;
    change: number;
    brand: string;
    updatedAt: string;
}

export interface WorldPrice {
    price: number;
    change: number;
    changePercent: number;
}
