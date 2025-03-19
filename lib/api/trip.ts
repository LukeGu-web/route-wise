import { fetchApi } from './index';

export interface TripParams {
  from_location: string;
  to_location: string;
  departure_time: string;
  language_code?: string;
}

export interface Stop {
  name: string;
  platform?: string;
  departure_time: string | null;
  arrival_time: string | null;
  departure_delay: number;
  arrival_delay: number;
}

export interface Leg {
  mode: string;
  line: string;
  origin: Stop;
  destination: Stop;
  departure_time: string;
  arrival_time: string;
}

export interface StopSequence {
  disassembledName: string;
  arrivalTimePlanned: string | null;
}

export interface Journey {
  start_time: string;
  end_time: string;
  duration: number;
  waiting_time: number;
  fee: number | null;
  legs: Leg[];
  stopSequence: StopSequence[];
}

export interface TripResponse {
  journeys: Journey[];
}

export const tripApi = {
  // Get trip suggestions
  getTrips: async (params: TripParams, city: string = 'sydney'): Promise<TripResponse> => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    return fetchApi<TripResponse>(`/${city}/trip?${queryParams.toString()}`);
  },
}; 