import { View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useStarredTripStore, StarredTrip } from '~/lib/stores/useStarredTripStore';
import { useTripStore } from '~/lib/stores/useTripStore';
import { ChevronsRight } from '~/lib/icons/ChevronsRight';
import { useTranslation } from 'react-i18next';

export function StarredTrips() {
    const { t } = useTranslation();
    const { starredTrips } = useStarredTripStore();
    const { setOrigin, setDestination } = useTripStore();

    if (!starredTrips.length) {
        return null;
    }

    const handleStarredTripClick = (item: StarredTrip) => {
        setOrigin(item.origin);
        setDestination(item.destination);
    }

    return (
        <View className='flex-col gap-4'>
            <View className='flex-row items-center justify-between px-4'>
                <Text className='text-lg font-bold'>{t('starredTrip.title')}</Text>
                <Link href='/starred-trips'>
                    <ChevronsRight size={18} />
                </Link>
            </View>
            <View className='flex-row flex-wrap gap-2'>
                {
                    starredTrips.map(item => (
                        <Button key={item.id} variant="outline" className='rounded-full' onPress={() => handleStarredTripClick(item)}>
                            <Text className='text-lg'>{item.name}</Text>
                        </Button>))
                }
            </View>
        </View>
    );
}