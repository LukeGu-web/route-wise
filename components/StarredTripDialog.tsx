import { useState } from 'react';
import { View } from 'react-native';
import 'react-native-get-random-values'; // for uuid
import { v4 as uuidv4 } from 'uuid';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
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
    const { addStarredTrip, editStarredTrip, starredTrips } = useStarredTripStore();
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Starred Route</DialogTitle>
                    <DialogDescription>Starred the route for quick search</DialogDescription>
                </DialogHeader>
                <View className="py-4 gap-4">
                    <View className="gap-2">
                        <Text className="font-semibold">Name</Text>
                        <Input
                            placeholder={`${origin}->${destination}`}
                            value={tripName}
                            onChangeText={setTripName}
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
                <DialogFooter>
                    {starredTrip && <View className="border border-red-500 rounded-md p-4 gap-4 mt-4">
                        <DialogDescription className="text-red-500">
                            Unstar the route to delete it from your device
                        </DialogDescription>
                        <Button onPress={() => onOpenChange(false)}>
                            <Text>Unstar</Text>
                        </Button>
                    </View>}
                    <Button variant="outline" onPress={() => onOpenChange(false)}>
                        <Text>Cancel</Text>
                    </Button>
                    <Button className="bg-yellow-300" onPress={handleSave}>
                        <Text className="text-black">{starredTrip ? 'Rename' : 'Star'}</Text>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 