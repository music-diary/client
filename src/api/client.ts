import axios from 'axios';
import { getToken } from '@/utils/auth-utils';
import { useAppStore } from '@/store/useAppStore';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = getToken();
    console.log('🚀 ~ file: client.ts:16 ~ token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized, logging out...');
      useAppStore.getState().logout();
    }
    return await Promise.reject(error);
  },
);

export default apiClient;
