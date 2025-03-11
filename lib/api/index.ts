import axios, { AxiosRequestConfig } from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Generic API request function using axios
export async function fetchApi<T>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): Promise<T> {
  try {
    const response = await apiClient({
      url: endpoint,
      ...options,
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || `API request failed: ${error.message}`;
      throw new Error(errorMessage);
    }
    throw error;
  }
}
