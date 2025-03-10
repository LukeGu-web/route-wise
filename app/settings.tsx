import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Switch } from '~/components/ui/switch';
import { MoonStar } from '~/lib/icons/MoonStar';
import { useColorScheme } from '~/lib/useColorScheme';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';

export default function SettingsScreen() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  const handleThemeChange = (isChecked: boolean) => {
    const newTheme = isChecked ? 'dark' : 'light';
    setColorScheme(newTheme);
    setAndroidNavigationBar(newTheme);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1 p-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
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
          </CardContent>
        </Card>
      </View>
    </SafeAreaView>
  );
} 