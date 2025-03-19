import { useRef } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Text } from '~/components/ui/text';
import { useTranslation } from 'react-i18next';
import { LanguagePicker } from '~/components/LanguagePicker';
import { PreferencesCard } from '~/components/settings/PreferencesCard';
import { InformationCard } from '~/components/settings/InformationCard';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="w-full z-10 bg-background border-b border-border">
        <View className="flex-row items-center justify-center h-14 px-4">
          <Text className="text-xl font-bold">{t('settings.title')}</Text>
        </View>
      </View>
      <View className="p-6 gap-6">
        <PreferencesCard bottomSheetModalRef={bottomSheetModalRef} />
        <InformationCard />
      </View>
      <LanguagePicker bottomSheetModalRef={bottomSheetModalRef} />
    </SafeAreaView>
  );
} 