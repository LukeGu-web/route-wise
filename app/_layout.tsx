import '~/global.css';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getLocales } from 'expo-localization';
import * as React from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Platform, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NAV_THEME } from '~/lib/constants';
import { PortalHost } from '@rn-primitives/portal';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { QueryProvider } from '~/lib/providers/query-provider';
import { usePerferenceStore } from '~/lib/stores/usePerferenceStore';
import i18n from '~/lib/i18n';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import languageNameMap from '~/translations/language_name_map.json';


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
  const colorScheme = useColorScheme();
  const { isDarkMode, setIsDarkMode, language, setLanguage } = usePerferenceStore();
  const { t } = useTranslation();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const insets = useSafeAreaInsets();

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
      const defaultLanguageCode = locales[0].languageCode;
      // 检查默认语言是否在支持的语言列表中
      const supportedLanguageCode = Object.keys(languageNameMap).includes(defaultLanguageCode || '') 
        ? defaultLanguageCode 
        : 'en';
      
      setLanguage({
        code: supportedLanguageCode || 'en',
        tag: supportedLanguageCode || 'en',
      });
    }
    i18n.changeLanguage((language?.code ?? 'en') as string);

    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <QueryProvider>
      <ThemeProvider value={isDarkMode ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
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
              options={{
                title: t('trip.title'),
              }}
            />
            <Stack.Screen
              name="starred-trips"
              options={{
                title: t('starredTrip.title'),
              }}
            />
            <Stack.Screen
              name="help"
              options={{
                title: t('help.title'),
                headerTitle: t('help.title'),
              }}
            />
            <Stack.Screen
              name="about"
              options={{
                title: t('about.title'),
                headerTitle: t('about.title'),
              }}
            />
          </Stack>

          <PortalHost />
        </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
