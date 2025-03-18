import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '~/lib/i18n';

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
        { 
          name: 'Sydney', 
          get label() {
            return i18n.t('city.Sydney');
          },
          isAvailable: true 
        },
        { 
          name: 'Melbourne', 
          get label() {
            return `${i18n.t('city.Melbourne')} (${i18n.t('common.comingSoon')})`;
          },
          isAvailable: false 
        },
        { 
          name: 'Brisbane', 
          get label() {
            return `${i18n.t('city.Brisbane')} (${i18n.t('common.comingSoon')})`;
          },
          isAvailable: false 
        },
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