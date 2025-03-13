import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PerferenceState = {
  isDarkMode: boolean| null;
  enabledServiceMessages: boolean;
  language: string | null;
  setIsDarkMode: (isDarkMode: boolean) => void;
  setEnabledServiceMessages: (enabledServiceMessages: boolean) => void;
  setLanguage: (language: string) => void;
};

export const usePerferenceStore = create<PerferenceState>()(
  persist(
    devtools((set) => ({
      isDarkMode: null,
      enabledServiceMessages: true,
      language: null,
      setIsDarkMode: (isDarkMode) => {
        set(() => ({ isDarkMode }));
      },
      setEnabledServiceMessages: (enabledServiceMessages) => {
        set(() => ({ enabledServiceMessages }));
      },
      setLanguage: (language) => {
        set(() => ({ language }));
      },
    })),
    {
      name: 'perference-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage), 
    }
  )
);
