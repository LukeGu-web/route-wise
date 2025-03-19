import { View, ScrollView, Image } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { useTranslation } from 'react-i18next';
import { LineIcon } from '~/components/ui/line-icon';

export default function HelpScreen() {
    const { t } = useTranslation();

    return (
        <ScrollView className="flex-1 bg-background p-4">
            <Text className="text-2xl font-bold mb-4">{t('settings.help')}</Text>

            {/* 交通方式图标说明 */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">交通方式图标说明</CardTitle>
                </CardHeader>
                <CardContent>
                    <View className="space-y-4">
                        <View className="flex-row items-center">
                            <Image
                                source={require('~/assets/images/icons/train.png')}
                                className="w-8 h-8 mr-3"
                            />
                            <Text className="text-base">火车 (Train)</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Image
                                source={require('~/assets/images/icons/lightrail.png')}
                                className="w-8 h-8 mr-3"
                            />
                            <Text className="text-base">轻轨 (Light Rail)</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Image
                                source={require('~/assets/images/icons/ferry.png')}
                                className="w-8 h-8 mr-3"
                            />
                            <Text className="text-base">渡轮 (Ferry)</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Image
                                source={require('~/assets/images/icons/bus.png')}
                                className="w-8 h-8 mr-3"
                            />
                            <Text className="text-base">巴士 (Bus)</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Image
                                source={require('~/assets/images/icons/metro.png')}
                                className="w-8 h-8 mr-3"
                            />
                            <Text className="text-base">地铁 (Metro)</Text>
                        </View>
                    </View>
                </CardContent>
            </Card>

            {/* 线路图标说明 */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">线路图标说明</CardTitle>
                </CardHeader>
                <CardContent>
                    <View className="space-y-4">
                        <View className="space-y-2">
                            <Text className="text-base font-medium">火车线路</Text>
                            <View className="flex-row flex-wrap gap-2">
                                <LineIcon mode="Train" line="T1" size="sm" />
                                <LineIcon mode="Train" line="T2" size="sm" />
                                <LineIcon mode="Train" line="T3" size="sm" />
                                <LineIcon mode="Train" line="T4" size="sm" />
                                <LineIcon mode="Train" line="T5" size="sm" />
                                <LineIcon mode="Train" line="T6" size="sm" />
                                <LineIcon mode="Train" line="T7" size="sm" />
                                <LineIcon mode="Train" line="T8" size="sm" />
                                <LineIcon mode="Train" line="T9" size="sm" />
                                <LineIcon mode="Train" line="CCN" size="sm" />
                            </View>
                        </View>

                        <View className="space-y-2">
                            <Text className="text-base font-medium">其他交通方式</Text>
                            <View className="flex-row flex-wrap gap-2">
                                <LineIcon mode="Metro" line="Metro" size="sm" />
                                <LineIcon mode="Buses" line="Buses" size="sm" />
                                <LineIcon mode="LightRail" line="LightRail" size="sm" />
                                <LineIcon mode="Ferries" line="Ferries" size="sm" />
                                <LineIcon mode="Coach" line="Coach" size="sm" />
                                <LineIcon mode="footpath" line="Unknown" size="sm" />
                            </View>
                        </View>
                    </View>
                </CardContent>
            </Card>
        </ScrollView>
    );
} 