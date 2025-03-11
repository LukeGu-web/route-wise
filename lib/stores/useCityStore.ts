import { create } from 'zustand';

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

export const useCityStore = create<CityState>((set) => ({
  cities: [
    { name: 'Sydney', label: 'Sydney', isAvailable: true },
    { name: 'Melbourne', label: 'Melbourne (coming soon)', isAvailable: false },
    { name: 'Brisbane', label: 'Brisbane (coming soon)', isAvailable: false },
  ],
  selectedCity: 'Sydney',
  setSelectedCity: (city) => set({ selectedCity: city }),
})); 