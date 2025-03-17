import { create } from 'zustand';
import { Journey } from '../api/trip';

interface TripState {
  origin: string;
  destination: string;
  date: Date | null;
  journeys:  Journey[];
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setDate: (date: Date) => void;
  setJourneys: (journeys: Journey[]) => void;
  resetForm: () => void;
}

export const useTripStore = create<TripState>((set) => ({
  origin: '',
  destination: '',
  date: null,
  journeys: [],
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setDate: (date) => set({ date }),
  setJourneys: (journeys) => set({ journeys }),
  resetForm: () => set({
    origin: '',
    destination: '',
    date: null,
    journeys: []
  })
})); 