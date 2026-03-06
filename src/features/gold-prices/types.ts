export interface WorldPrice {
    price: number;
    change: number;
    changePercent: number;
}

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
    code?: string;
}

export interface ProviderPrice {
    id: string;
    providerId?: string;
    providerName?: string;
    brand: string;
    buyPrice: number;
    sellPrice: number;
    change: number;
    updatedAt?: string;
}
