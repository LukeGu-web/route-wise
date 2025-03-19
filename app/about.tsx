import { View, ScrollView, Image } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { useTranslation } from 'react-i18next';
import Constants from 'expo-constants';
import { Link } from 'expo-router';

export default function AboutScreen() {
    const { t } = useTranslation();

    return (
        <ScrollView className="flex-1 bg-background p-4">
            <View className="items-center mb-6">
                <Image
                    source={require('~/assets/images/icon.png')}
                    className="w-24 h-24 rounded-2xl mb-4"
                />
                <Text className="text-2xl font-bold mb-2">Route Wise</Text>
                <Text className="text-muted-foreground">
                    {t('about.version')} {Constants.expoConfig?.version || '1.0.0'}
                </Text>
            </View>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">{t('about.thankYou')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Text className="text-base text-muted-foreground">
                        {t('about.description')}
                    </Text>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">{t('about.dataSource')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Text className="text-base text-muted-foreground">
                        {t('about.dataSourceDesc')}
                    </Text>
                    <Link href="https://transportnsw.info" className="text-blue-500 underline mt-2">{t('about.transportnsw')}</Link>
                </CardContent>
            </Card>
        </ScrollView>
    );
} 