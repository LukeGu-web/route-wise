import { create } from 'zustand';

interface TripState {
  origin: string;
  destination: string;
  date: Date;
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setDate: (date: Date) => void;
  resetForm: () => void;
}

export const useTripStore = create<TripState>((set) => ({
  origin: '',
  destination: '',
  date: new Date(),
  
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setDate: (date) => set({ date }),
  resetForm: () => set({
    origin: '',
    destination: '',
    date: new Date()
  })
})); 