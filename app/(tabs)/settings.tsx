import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Switch } from '~/components/ui/switch';
import { MoonStar } from '~/lib/icons/MoonStar';
import { useColorScheme } from '~/lib/useColorScheme';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { usePerferenceStore } from '~/lib/stores/usePerferenceStore';
export default function SettingsScreen() {
  const {isDarkMode, enabledServiceMessages, setIsDarkMode, setEnabledServiceMessages} = usePerferenceStore();
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  const handleThemeChange = (isChecked: boolean) => {
    const newTheme = isChecked ? 'dark' : 'light';
    setColorScheme(newTheme);
    setAndroidNavigationBar(newTheme);
  };

  return (
    <SafeAreaView className="flex-1 bg-background px-4" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="w-full z-10 bg-background border-b border-border mb-4">
      <View className="flex-row items-center justify-center h-14 px-4">
        <Text className="text-xl font-bold">Settings</Text>
        </View>
      </View>
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
              checked={isDarkColorScheme}
              onCheckedChange={handleThemeChange}
            />
          </View>
            {/* Service Message Option */}
            <View className="flex-row items-center justify-between py-4 border-b border-border">
            <View className="flex-row items-center">
              <MoonStar className="text-foreground mr-3" size={22} strokeWidth={1.25} />
              <Text className="text-base font-medium">Service Messages</Text>
            </View>
            <Switch 
              checked={enabledServiceMessages}
              onCheckedChange={() => setEnabledServiceMessages(!enabledServiceMessages)}
            />
          </View>
        </CardContent>
      </Card>
    </SafeAreaView>
  );
} 