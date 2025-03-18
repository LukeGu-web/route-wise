import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Switch } from '~/components/ui/switch';
import { MoonStar } from '~/lib/icons/MoonStar';
import { MessageSquareText } from '~/lib/icons/MessageSquareText';
import { Languages } from '~/lib/icons/Languages';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { usePerferenceStore } from '~/lib/stores/usePerferenceStore';
import languageNameMap from '~/translations/language_name_map.json';

type LanguageCode = keyof typeof languageNameMap;

export default function SettingsScreen() {
  const { isDarkMode, enabledServiceMessages, language, setIsDarkMode, setEnabledServiceMessages, setLanguage } = usePerferenceStore();
  const { setColorScheme } = useNativewindColorScheme();

  const handleThemeChange = (isChecked: boolean) => {
    const newTheme = isChecked ? 'dark' : 'light';
    setColorScheme(newTheme);
    setIsDarkMode(isChecked);
    setAndroidNavigationBar(newTheme);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="w-full z-10 bg-background border-b border-border">
        <View className="flex-row items-center justify-center h-14 px-4">
          <Text className="text-xl font-bold">Settings</Text>
        </View>
      </View>
      <View className="p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Perferences</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Dark Mode Option */}
          <View className="flex-row items-center justify-between py-4 border-b border-border">
            <View className="flex-row items-center">
              <MoonStar className="text-foreground mr-3" size={22} strokeWidth={1.25} />
              <Text className="text-base font-medium">Dark Mode</Text>
            </View>
            <Switch
              checked={isDarkMode ?? false}
              onCheckedChange={handleThemeChange}
            />
          </View>
          {/* Service Message Option */}
          <View className="flex-row items-center justify-between py-4 border-b border-border">
            <View className="flex-row items-center">
              <MessageSquareText className="text-foreground mr-3" size={22} strokeWidth={1.25} />
              <Text className="text-base font-medium">Service Messages</Text>
            </View>
            <Switch
              checked={enabledServiceMessages}
              onCheckedChange={() => setEnabledServiceMessages(!enabledServiceMessages)}
            />
          </View>
          <View className="flex-row items-center justify-between py-4 border-b border-border">
            <View className="flex-row items-center">
              <Languages className="text-foreground mr-3" size={22} strokeWidth={1.25} />
              <Text className="text-base font-medium">Language</Text>
            </View>
            <Text className="text-base font-medium">{languageNameMap[(language?.code ?? 'en') as LanguageCode]}</Text>
          </View>
        </CardContent>
      </Card>
      </View>
    </SafeAreaView>
  );
} 