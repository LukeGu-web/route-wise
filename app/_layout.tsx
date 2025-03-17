import '~/global.css';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getLocales } from 'expo-localization';
import * as React from 'react';
import { Platform, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NAV_THEME } from '~/lib/constants';
import { PortalHost } from '@rn-primitives/portal';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { QueryProvider } from '~/lib/providers/query-provider';
import { usePerferenceStore } from '~/lib/stores/usePerferenceStore';


const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const locales = getLocales();
  const  colorScheme  = useColorScheme();
  const { isDarkMode, setIsDarkMode, language, setLanguage } = usePerferenceStore();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    // set theme
    if(isDarkMode === null) {
      setAndroidNavigationBar(colorScheme as 'light' | 'dark');
      setIsDarkMode(colorScheme === 'dark');
    }
    setIsColorSchemeLoaded(true);

    // set language
    if(language === null) {
      setLanguage({
        code: locales[0].languageCode,
        tag: locales[0].languageTag,
      });
    }

    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  console.log('locales', locales.length); 

  return (
    <QueryProvider>
      <ThemeProvider value={isDarkMode ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              // Customize the animation presentation
              presentation: 'card',
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                title: '',
              }}
            />
            <Stack.Screen
              name="trip"
            />
            <Stack.Screen
              name="starred-trips"
            />
          </Stack>

          <PortalHost />
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
