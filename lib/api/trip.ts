import { fetchApi } from './index';

export interface TripParams {
  from_location: string;
  to_location: string;
  departure_time: string;
}

export interface Stop {
  name: string;
  departure_time: string | null;
  arrival_time: string | null;
  departure_delay: number;
  arrival_delay: number;
}

export interface Leg {
  mode: string;
  line: string;
  duration: number;
  origin: Stop;
  destination: Stop;
}

export interface StopSequence {
  disassembledName: string;
  arrivalTimePlanned: string | null;
}

export interface Journey {
  duration: number;
  start_time: string;
  end_time: string;
  waiting_time: number;
  legs: Leg[];
  stopSequence: StopSequence[];
  fee: number;
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