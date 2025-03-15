import { useState } from 'react';
import { View } from 'react-native';
import 'react-native-get-random-values'; // for uuid
import { v4 as uuidv4 } from 'uuid';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { Input } from './ui/input';
import * as Dialog from './ui/dialog';
import { useTripStore } from '~/lib/stores/useTripStore';
import { useStarredTripStore } from '~/lib/stores/useStarredTripStore';

interface StarredTripDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function StarredTripDialog({
    open,
    onOpenChange,
}: StarredTripDialogProps) {
    const { origin, destination } = useTripStore();
    const { addStarredTrip, editStarredTrip, removeStarredTrip, starredTrips } = useStarredTripStore();
    const starredTrip = starredTrips.find(trip => trip.origin === origin && trip.destination === destination);
    const [tripName, setTripName] = useState(starredTrip?.name ?? '');

    const handleSave = () => {
        if (starredTrip) {
            editStarredTrip(starredTrip.id, tripName);
        } else {
            addStarredTrip({
                id: uuidv4(),
                origin,
                destination,
                name: tripName,
            });
        }
        onOpenChange(false);
    };

    const handleUnstar = () => {
        if (starredTrip) {
            removeStarredTrip(starredTrip.id);
        }
        onOpenChange(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content closeOnPress className='border border-gray-300 rounded-lg p-8 mx-4'>
                <Dialog.Header>
                    <Dialog.Title>Starred Route</Dialog.Title>
                    <Dialog.Description>Starred the route for quick search</Dialog.Description>
                </Dialog.Header>
                <View className="py-4 gap-4">
                    <View className="gap-2">
                        <Text className="font-semibold">Name</Text>
                        <Input
                            placeholder={`${origin}->${destination}`}
                            value={tripName}
                            onChangeText={setTripName}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View className="flex-row items-end gap-2">
                        <Text className="font-semibold">Origin: </Text>
                        <Text className="text-lg">{origin}</Text>
                    </View>
                    <View className="flex-row items-end gap-2">
                        <Text className="font-semibold">Destination: </Text>
                        <Text className="text-lg">{destination}</Text>
                    </View>
                </View>
                <Dialog.Footer>
                    {starredTrip && <View className="border border-red-500 rounded-md p-4 gap-4 mt-4">
                        <Dialog.Description className="text-red-500">
                            Unstar the route to remove it from the starred routes list
                        </Dialog.Description>
                        <Button onPress={handleUnstar}>
                            <Text>Unstar</Text>
                        </Button>
                    </View>}
                    <Button variant="outline" onPress={() => onOpenChange(false)}>
                        <Text>Cancel</Text>
                    </Button>
                    <Button className="bg-yellow-300" onPress={handleSave}>
                        <Text className="text-black">{starredTrip ? 'Rename' : 'Star'}</Text>
                    </Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
    );
} 