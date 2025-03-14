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
  removeStarredTrip: (id: string) => void;
  editStarredTrip: (id: string, newName: string) => void;
  reorderStarredTrips: (newOrder: StarredTrip[]) => void;
}

export const useStarredTripStore = create<StarredTripState>()(
  persist(
    devtools((set) => ({
      starredTrips: [],
      addStarredTrip: (trip) =>
        set((state) => ({
          starredTrips: [...state.starredTrips, trip],
        })),
      removeStarredTrip: (id) =>
        set((state) => ({
          starredTrips: state.starredTrips.filter((trip) => trip.id !== id),
        })),
      editStarredTrip: (id, newName) =>
        set((state) => ({
          starredTrips: state.starredTrips.map((trip) =>
            trip.id === id ? { ...trip, name: newName } : trip
          ),
        })),
      reorderStarredTrips: (newOrder) =>
        set(() => ({
          starredTrips: newOrder,
        })),
    })),
    {
      name: 'starred-trip-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
