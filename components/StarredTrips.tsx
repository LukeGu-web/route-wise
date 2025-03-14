import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { View, Pressable } from 'react-native';
import { useStarredTripStore, StarredTrip } from '~/lib/stores/useStarredTripStore';
import { useTripStore } from '~/lib/stores/useTripStore';
import { ChevronsRight } from '~/lib/icons/ChevronsRight';

export function StarredTrips() {
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
                <Text className='text-lg font-bold'>Starred Routes</Text>
                <Pressable onPress={() => {}}>
                    <ChevronsRight size={18} />
            </Pressable>
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