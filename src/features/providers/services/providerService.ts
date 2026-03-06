import { apiClient } from '../../../services/apiClient';
import { API_ENDPOINTS } from '../../../config/api';
import { Provider, ProviderPrice } from '../../gold-prices/types';

export const providerService = {
    async getProviders(): Promise<Provider[]> {
        const response = await apiClient.get<Provider[]>(API_ENDPOINTS.GOLD.PROVIDERS);
        return response.data;
    },

    async getProviderPrice(id: string): Promise<ProviderPrice> {
        const response = await apiClient.get<ProviderPrice>(API_ENDPOINTS.GOLD.PROVIDER_PRICE(id));
        return response.data;
    },

    async getAllPrices(): Promise<ProviderPrice[]> {
        const providers = await this.getProviders();
        const prices = await Promise.all(providers.map(p => this.getProviderPrice(p.id)));
        return prices;
    }
};
