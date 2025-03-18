import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Text } from './ui/text';
import { useTranslation } from 'react-i18next';
import { Languages } from '~/lib/icons/Languages';
import { usePerferenceStore } from '~/lib/stores/usePerferenceStore';
import languageNameMap from '~/translations/language_name_map.json';
import i18n from '~/lib/i18n';

export function LanguagePicker() {
  const { t } = useTranslation();
  const { language, setLanguage } = usePerferenceStore();

  return (
    <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <Languages className="text-foreground mr-3" size={22} strokeWidth={1.25} />
              <Text className="text-base font-medium">{t('settings.language')}</Text>
            </View>
      <View className="border border-input rounded-md">
        <Picker
          selectedValue={language?.code}
          onValueChange={(itemValue) => {
            setLanguage({
              code: itemValue,
              tag: itemValue as string,
            });
            i18n.changeLanguage(itemValue as string);
          }}
          style={{ width: 150 }}
        >
          {Object.entries(languageNameMap).map(([code, name]) => (
            <Picker.Item key={code} label={name} value={code} />
          ))}
        </Picker>
      </View>
    </View>
  );
} 