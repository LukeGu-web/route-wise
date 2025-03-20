import { View, Pressable } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Link } from 'expo-router';
import { Share2 } from '~/lib/icons/Share2';
import { CircleHelp } from '~/lib/icons/CircleHelp';
import { Info } from '~/lib/icons/Info';
import { useTranslation } from 'react-i18next';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';

export function InformationCard() {
  const { t } = useTranslation();

  const handleShare = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        console.log('Sharing is not available');
        return;
      }

      const message = t('settings.shareMessage', {
        appName: Constants.expoConfig?.name || 'Route Wise',
        storeUrl: 'https://apps.apple.com/app/route-wise/id6743143103',
      });

      // 创建临时文件
      const fileUri = `${FileSystem.cacheDirectory}route-wise.txt`;
      await FileSystem.writeAsStringAsync(fileUri, message);

      // 分享文件
      await Sharing.shareAsync(fileUri, {
        dialogTitle: t('settings.share'),
      });

      // 删除临时文件
      await FileSystem.deleteAsync(fileUri);
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{t('settings.information')}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* About */}
        <Link
          href="/about"
          className="flex-row items-center justify-between py-4 border-b border-border"
        >
          <View className="flex-row items-center">
            <Info className="text-foreground mr-3" size={22} strokeWidth={1.25} />
            <Text className="text-base font-medium">{t('settings.about')}</Text>
          </View>
        </Link>
        {/* Help */}
        <Link
          href="/help"
          className="flex-row items-center justify-between py-4 border-b border-border"
        >
          <View className="flex-row items-center">
            <CircleHelp className="text-foreground mr-3" size={22} strokeWidth={1.25} />
            <Text className="text-base font-medium">{t('settings.help')}</Text>
          </View>
        </Link>
        {/* Share */}
        <Pressable
          className="flex-row items-center justify-between py-4 border-b border-border"
          onPress={handleShare}
        >
          <View className="flex-row items-center">
            <Share2 className="text-foreground mr-3" size={22} strokeWidth={1.25} />
            <Text className="text-base font-medium">{t('settings.share')}</Text>
          </View>
        </Pressable>
      </CardContent>
    </Card>
  );
} 