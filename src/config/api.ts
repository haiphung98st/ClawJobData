export const API_ENDPOINTS = {
    GOLD: {
        WORLD_PRICE: '/gold/world-price',
        PROVIDERS: '/gold/providers',
        PROVIDER_PRICE: (id: string) => `/gold/providers/${id}/price`,
        HISTORY: '/gold/history',
    },
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
    },
    PORTFOLIO: {
        BASE: '/portfolio',
        BY_ID: (id: string) => `/portfolio/${id}`,
        PROFIT_LOSS: '/portfolio/profit-loss',
    },
};
