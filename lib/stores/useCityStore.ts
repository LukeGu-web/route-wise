import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '~/lib/i18n';

export type CityName = 'Sydney' | 'Melbourne' | 'Brisbane';

export interface CityInfo {
  name: CityName;
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
        { name: 'Sydney', isAvailable: true },
        { name: 'Melbourne', isAvailable: false },
        { name: 'Brisbane', isAvailable: false },
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