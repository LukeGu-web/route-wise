import { View } from 'react-native';
import { PickerIOS } from '@react-native-picker/picker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Text } from './ui/text';
import { useTranslation } from 'react-i18next';
import { usePerferenceStore } from '~/lib/stores/usePerferenceStore';
import languageNameMap from '~/translations/language_name_map.json';
import i18n from '~/lib/i18n';
import BottomSheet from './BottomSheet';

type LanguagePickerProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export function LanguagePicker({ bottomSheetModalRef }: LanguagePickerProps) {
  const { t } = useTranslation();
  const { language, setLanguage, isDarkMode } = usePerferenceStore();
  const handleLanguageChange = (itemValue: string | number | object) => {
    setLanguage({
      code: itemValue as string,
      tag: itemValue as string,
    });
    i18n.changeLanguage(itemValue as string);
  };

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={270}>
      <View className='items-center flex-1 w-full gap-2 p-2'>
        <Text className='text-xl font-semibold dark:color-white'>
          {t('settings.selectLanguage')}
        </Text>
        <View className='items-center flex-1 w-full '>
          <PickerIOS
            selectedValue={language?.code ?? 'en'}
            onValueChange={handleLanguageChange}
            style={{ flex: 1, width: '100%' }}
            itemStyle={{ color: isDarkMode ? 'white' : 'black' }}
          >
            {Object.entries(languageNameMap).map(([code, name]) => (
              <PickerIOS.Item key={code} label={name} value={code} />
            ))}
          </PickerIOS>
        </View>
      </View>
    </BottomSheet>
  );
} 