import { View, Pressable } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Switch } from '~/components/ui/switch';
import { MoonStar } from '~/lib/icons/MoonStar';
import { MessageSquareText } from '~/lib/icons/MessageSquareText';
import { Languages } from '~/lib/icons/Languages';
import { CircleHelp } from '~/lib/icons/CircleHelp';
import { Tooltip, TooltipTrigger, TooltipContent } from '~/components/ui/tooltip';
import { useTranslation } from 'react-i18next';
import { usePerferenceStore } from '~/lib/stores/usePerferenceStore';
import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import languageNameMap from '~/translations/language_name_map.json';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

type LanguageCode = keyof typeof languageNameMap;

interface PreferencesCardProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}

export function PreferencesCard({ bottomSheetModalRef }: PreferencesCardProps) {
  const { t } = useTranslation();
  const { 
    isDarkMode, 
    enabledServiceMessages, 
    language, 
    setIsDarkMode, 
    setEnabledServiceMessages 
  } = usePerferenceStore();
  const { setColorScheme } = useNativewindColorScheme();

  const handleThemeChange = (isChecked: boolean) => {
    const newTheme = isChecked ? 'dark' : 'light';
    setColorScheme(newTheme);
    setIsDarkMode(isChecked);
    setAndroidNavigationBar(newTheme);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{t('settings.preferences')}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Dark Mode Option */}
        <View className="flex-row items-center justify-between py-4 border-b border-border">
          <View className="flex-row items-center">
            <MoonStar className="text-foreground mr-3" size={22} strokeWidth={1.25} />
            <Text className="text-base font-medium">{t('settings.darkMode')}</Text>
          </View>
          <Switch
            checked={isDarkMode ?? false}
            onCheckedChange={handleThemeChange}
          />
        </View>
        {/* Service Message Option */}
        <View className="flex-row items-center justify-between py-4 border-b border-border">
          <View className="flex-row items-center">
            <MessageSquareText className="text-foreground mr-3" size={22} strokeWidth={1.5} />
            <Text className="text-base font-medium">{t('settings.serviceMessages')}</Text>
            <Tooltip delayDuration={150}>
              <TooltipTrigger asChild>
                <CircleHelp className="text-muted-foreground ml-2" size={16} strokeWidth={1.5} />
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-800 text-foreground">
                <Text className="text-sm">{t('settings.serviceMessagesTooltip')}</Text>
              </TooltipContent>
            </Tooltip>
          </View>
          <Switch
            checked={enabledServiceMessages}
            onCheckedChange={() => setEnabledServiceMessages(!enabledServiceMessages)}
          />
        </View>
        {/* Language Option */}
        <Pressable
          className="flex-row items-center justify-between py-4 border-b border-border"
          onPress={() => bottomSheetModalRef.current?.present()}
        >
          <View className="flex-row items-center">
            <Languages className="text-foreground mr-3" size={22} strokeWidth={1.5} />
            <Text className="text-base font-medium">{t('settings.language')}</Text>
          </View>
          <Text className="text-base font-medium">{languageNameMap[(language?.code ?? 'en') as LanguageCode]}</Text>
        </Pressable>
      </CardContent>
    </Card>
  );
} 