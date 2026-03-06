import { apiClient } from '../../../services/apiClient';
import { API_ENDPOINTS } from '../../../config/api';
import { WorldPrice, Point } from '../types';

export const goldPriceService = {
    async getWorldPrice(): Promise<WorldPrice> {
        const response = await apiClient.get<WorldPrice>(API_ENDPOINTS.GOLD.WORLD_PRICE);
        return response.data;
    },

    async getHistory(range: string = '1D'): Promise<Point[]> {
        const response = await apiClient.get<Point[]>(API_ENDPOINTS.GOLD.HISTORY, { params: { range } });
        return response.data;
    }
};
