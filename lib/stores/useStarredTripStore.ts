import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StarredTrip {
  id: string;
  name: string;
  origin: string;
  destination: string;
}

interface StarredTripState {
  starredTrips: StarredTrip[];
  addStarredTrip: (trip: StarredTrip) => void;
  editStarredTrip: (trip: StarredTrip) => void;
  removeStarredTrip: (trip: StarredTrip) => void;
}

export const useStarredTripStore = create<StarredTripState>()(
  persist(
    devtools((set) => ({
      starredTrips: [],
      addStarredTrip: (trip) => set((state) => ({ starredTrips: [...state.starredTrips, trip] })),
      editStarredTrip: (trip) => set((state) => ({ starredTrips: state.starredTrips.map((t) => t.id === trip.id ? trip : t) })),
      removeStarredTrip: (trip) => set((state) => ({ starredTrips: state.starredTrips.filter((t) => t.id !== trip.id) })),
    })),
    {
      name: 'starred-trip-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
