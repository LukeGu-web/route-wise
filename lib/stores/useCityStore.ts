import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CityName = 'Sydney' | 'Melbourne' | 'Brisbane';

export interface CityInfo {
  name: CityName;
  label: string;
  isAvailable: boolean;
}

interface CityState {
  cities: CityInfo[];
  selectedCity: CityName;
  setSelectedCity: (city: CityName) => void;
}

export const useCityStore = create<CityState>()(
  persist(
    devtools((set) => ({
      cities: [
        { name: 'Sydney', label: 'Sydney', isAvailable: true },
        { name: 'Melbourne', label: 'Melbourne (coming soon)', isAvailable: false },
        { name: 'Brisbane', label: 'Brisbane (coming soon)', isAvailable: false },
      ],
      selectedCity: 'Sydney',
      setSelectedCity: (city) => set({ selectedCity: city }),
    })),
    {
      name: 'city-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);