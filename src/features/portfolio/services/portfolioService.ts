import { apiClient } from '../../../services/apiClient';
import { API_ENDPOINTS } from '../../../config/api';
import { PortfolioTransaction, PortfolioSummary } from '../../../store/usePortfolioStore';

export const portfolioService = {
    async getTransactions(): Promise<PortfolioTransaction[]> {
        const response = await apiClient.get<PortfolioTransaction[]>(API_ENDPOINTS.PORTFOLIO.BASE);
        return response.data;
    },

    async addTransaction(txn: Omit<PortfolioTransaction, 'id'>): Promise<PortfolioTransaction> {
        const response = await apiClient.post<PortfolioTransaction>(API_ENDPOINTS.PORTFOLIO.BASE, txn);
        return response.data;
    },

    async deleteTransaction(id: string): Promise<void> {
        await apiClient.delete(API_ENDPOINTS.PORTFOLIO.BY_ID(id));
    },

    async getSummary(): Promise<PortfolioSummary> {
        const response = await apiClient.get<PortfolioSummary>(API_ENDPOINTS.PORTFOLIO.PROFIT_LOSS);
        return response.data;
    }
};
