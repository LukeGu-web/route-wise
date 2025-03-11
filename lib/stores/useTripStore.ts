import { create } from 'zustand';
import { TripResponse } from '../api/trip';

interface TripState {
  origin: string;
  destination: string;
  date: Date;
  trips: TripResponse | null;
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setDate: (date: Date) => void;
  setTrips: (trips: TripResponse | null) => void;
  resetForm: () => void;
}

export const useTripStore = create<TripState>((set) => ({
  origin: '',
  destination: '',
  date: new Date(),
  trips: null,
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setDate: (date) => set({ date }),
  setTrips: (trips) => set({ trips }),
  resetForm: () => set({
    origin: '',
    destination: '',
    date: new Date(),
    trips: null
  })
})); 