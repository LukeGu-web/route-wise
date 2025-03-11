import axios, { AxiosRequestConfig } from 'axios';

// Base URL for API
export const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API URL

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
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

// Routes related API
export const routesApi = {
  // Get routes
  getRoutes: async (params: {
    origin: string;
    destination: string;
    date: string;
    city?: string;
  }) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    return fetchApi<RouteResponse[]>(`/routes?${queryParams.toString()}`);
  },
  
  // Get route details
  getRouteDetails: async (routeId: string) => {
    return fetchApi<RouteDetail>(`/routes/${routeId}`);
  },
};

// Locations related API
export const locationsApi = {
  // Get location suggestions
  getLocationSuggestions: async (query: string, city?: string) => {
    const queryParams = new URLSearchParams();
    queryParams.append('query', query);
    if (city) queryParams.append('city', city);
    
    return fetchApi<string[]>(`/locations/suggestions?${queryParams.toString()}`);
  },
};

// Type definitions
export interface RouteResponse {
  id: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: number; // minutes
  price: number;
  transportType: 'bus' | 'train' | 'subway';
}

export interface RouteDetail extends RouteResponse {
  stops: string[];
  distance: number; // kilometers
  operator: string;
  amenities: string[];
} 