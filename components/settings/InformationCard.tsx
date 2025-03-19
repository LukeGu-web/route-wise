import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Link } from 'expo-router';
import { Star } from '~/lib/icons/Star';
import { Share2 } from '~/lib/icons/Share2';
import { CircleHelp } from '~/lib/icons/CircleHelp';
import { Info } from '~/lib/icons/Info';
import { useTranslation } from 'react-i18next';

export function InformationCard() {
  const { t } = useTranslation();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{t('settings.information')}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* About */}
        <Link
          href="/"
          className="flex-row items-center justify-between py-4 border-b border-border"
        >
          <View className="flex-row items-center">
            <Info className="text-foreground mr-3" size={22} strokeWidth={1.25} />
            <Text className="text-base font-medium">{t('settings.about')}</Text>
          </View>
        </Link>
        {/* Help */}
        <Link
          href="/"
          className="flex-row items-center justify-between py-4 border-b border-border"
        >
          <View className="flex-row items-center">
            <CircleHelp className="text-foreground mr-3" size={22} strokeWidth={1.25} />
            <Text className="text-base font-medium">{t('settings.help')}</Text>
          </View>
        </Link>
        {/* Rate */}
        <Link
          href="/"
          className="flex-row items-center justify-between py-4 border-b border-border"
        >
          <View className="flex-row items-center">
            <Star className="text-foreground mr-3" size={22} strokeWidth={1.25} />
            <Text className="text-base font-medium">{t('settings.rate')}</Text>
          </View>
        </Link>
        {/* Share */}
        <Link
          href="/"
          className="flex-row items-center justify-between py-4 border-b border-border"
        >
          <View className="flex-row items-center">
            <Share2 className="text-foreground mr-3" size={22} strokeWidth={1.25} />
            <Text className="text-base font-medium">{t('settings.share')}</Text>
          </View>
        </Link>
      </CardContent>
    </Card>
  );
} 