export const ENV = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5034/api',
    REALTIME_INTERVAL: import.meta.env.VITE_REALTIME_INTERVAL ? parseInt(import.meta.env.VITE_REALTIME_INTERVAL) : 30000,
};
