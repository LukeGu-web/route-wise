import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { View } from 'react-native';
import { useStarredTripStore } from '~/lib/stores/useStarredTripStore';

export function StarredTrips() {
    const { starredTrips } = useStarredTripStore();

    if (!starredTrips.length) {
        return null;
    }

    return (
        <View className='flex-col gap-4'>
            <Text className='text-lg font-bold'>Starred Routes</Text>
        <View className='flex-row flex-wrap gap-2'>
            {
                starredTrips.map(item => <Button key={item.id} variant="outline" className='rounded-full'>
                    <Text className='text-lg'>{item.name}</Text>
                </Button>)
            }
        </View>
        </View>
    );
}