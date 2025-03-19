import { View, Pressable, Platform } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Link } from 'expo-router';
import { Star } from '~/lib/icons/Star';
import { Share2 } from '~/lib/icons/Share2';
import { CircleHelp } from '~/lib/icons/CircleHelp';
import { Info } from '~/lib/icons/Info';
import { useTranslation } from 'react-i18next';
// import * as Sharing from 'expo-sharing';
// import * as StoreReview from 'expo-store-review';
import * as Linking from 'expo-linking';
import Constants from 'expo-constants';

export function InformationCard() {
  const { t } = useTranslation();

  // const handleRate = async () => {
  //   try {
  //     // 检查是否支持评分功能
  //     const isAvailable = await StoreReview.isAvailableAsync();
  //     if (!isAvailable) {
  //       console.log('Store review is not available');
  //       return;
  //     }

  //     // 检查是否可以执行评分操作
  //     const hasAction = await StoreReview.hasAction();
  //     if (hasAction) {
  //       // 使用原生评分界面
  //       await StoreReview.requestReview();
  //     } else {
  //       // 如果无法使用原生评分，则打开应用商店
  //       const storeUrl = StoreReview.storeUrl();
  //       if (storeUrl) {
  //         // 根据平台使用不同的 URL scheme
  //         const url = Platform.select({
  //           ios: `${storeUrl}?action=write-review`,
  //           android: `${storeUrl}&showAllReviews=true`,
  //           default: storeUrl,
  //         });
  //         await Linking.openURL(url);
  //       } else {
  //         console.log('Store URL is not available');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Failed to request review:', error);
  //   }
  // };

  // const handleShare = async () => {
  //   try {
  //     const isAvailable = await Sharing.isAvailableAsync();
  //     if (!isAvailable) {
  //       console.log('Sharing is not available');
  //       return;
  //     }

  //     const storeUrl = StoreReview.storeUrl();
  //     if (!storeUrl) {
  //       console.log('Store URL is not available');
  //       return;
  //     }

  //     const message = t('settings.shareMessage', {
  //       appName: Constants.expoConfig?.name || 'Route Wise',
  //       storeUrl,
  //     });

  //     await Sharing.shareAsync(message);
  //   } catch (error) {
  //     console.error('Failed to share:', error);
  //   }
  // };

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
        <Pressable
          className="flex-row items-center justify-between py-4 border-b border-border"
          // onPress={handleRate}
        >
          <View className="flex-row items-center">
            <Star className="text-foreground mr-3" size={22} strokeWidth={1.25} />
            <Text className="text-base font-medium">{t('settings.rate')}</Text>
          </View>
        </Pressable>
        {/* Share */}
        <Pressable
          className="flex-row items-center justify-between py-4 border-b border-border"
          // onPress={handleShare}
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