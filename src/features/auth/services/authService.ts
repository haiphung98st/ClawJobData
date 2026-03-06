import { apiClient } from '../../../services/apiClient';
import { API_ENDPOINTS } from '../../../config/api';

export const authService = {
    async login(credentials: any): Promise<{ token: string, user: any }> {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
        return response.data;
    },

    async register(data: any): Promise<{ token: string, user: any }> {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
        return response.data;
    }
};
