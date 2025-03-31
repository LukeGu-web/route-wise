import { View, Pressable, Share, Alert, Linking } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Link } from 'expo-router';
import { Share2 } from '~/lib/icons/Share2';
import { CircleHelp } from '~/lib/icons/CircleHelp';
import { Info } from '~/lib/icons/Info';
import { usePerferenceStore } from '~/lib/stores/usePerferenceStore';
import { useTranslation } from 'react-i18next';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export function InformationCard() {
  const { t } = useTranslation();
  const { isDarkMode } = usePerferenceStore();
  const handleShare = async () => {
    try {
      const message = t('settings.shareMessage', {
        appName: 'Route Wise',
        storeUrl: 'https://apps.apple.com/app/route-wise/id6743143103',
      });
      const result = await Share.share({
        message,
        url: 'https://apps.apple.com/app/route-wise/id6743143103',

      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const handleDiscordPress = async () => {
    try {
      await Linking.openURL('https://discord.gg/yz3aGr66');
    } catch (error: any) {
      Alert.alert(error.message);
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
            <Info className="text-foreground mr-3" size={22} strokeWidth={1.5} />
            <Text className="text-base font-medium">{t('settings.about')}</Text>
          </View>
        </Link>
        {/* Help */}
        <Link
          href="/help"
          className="flex-row items-center justify-between py-4 border-b border-border"
        >
          <View className="flex-row items-center">
            <CircleHelp className="text-foreground mr-3" size={22} strokeWidth={1.5} />
            <Text className="text-base font-medium">{t('settings.help')}</Text>
          </View>
        </Link>
        {/* Share */}
        <Pressable
          className="flex-row items-center justify-between py-4 border-b border-border"
          onPress={handleShare}
        >
          <View className="flex-row items-center">
            <Share2 className="text-foreground mr-3" size={22} strokeWidth={1.5} />
            <Text className="text-base font-medium">{t('settings.share')}</Text>
          </View>
        </Pressable>
        {/* Discord */}
        <Pressable
          className="flex-row items-center justify-between py-4 border-b border-border"
          onPress={handleDiscordPress}
        >
          <View className="flex-row items-center gap-4">
            <FontAwesome5 name="discord" size={22} color={isDarkMode ? "white" : "black"} />
            <Text className="text-base font-medium">Discord</Text>
          </View>
        </Pressable>
      </CardContent>
    </Card>
  );
} 