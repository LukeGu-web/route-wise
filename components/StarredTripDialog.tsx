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
import { useTranslation } from 'react-i18next';
import { useStations } from '~/lib/hooks/useStations';

interface StarredTripDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function StarredTripDialog({
    open,
    onOpenChange,
}: StarredTripDialogProps) {
    const { t } = useTranslation();
    const { origin, destination } = useTripStore();
    const { allStations } = useStations();
    const { addStarredTrip, editStarredTrip, removeStarredTrip, starredTrips } = useStarredTripStore();
    const starredTrip = starredTrips.find(trip => trip.origin === origin.station && trip.destination === destination.station);
    const [tripName, setTripName] = useState(starredTrip?.name ?? '');

    const originStation = allStations.find(s => s.station === origin.station);
    const destinationStation = allStations.find(s => s.station === destination.station);
    const defaultName = `${originStation?.label?.split(' (')[0] || origin.station} -> ${destinationStation?.label?.split(' (')[0] || destination.station}`;

    const handleSave = () => {
        if (starredTrip) {
            editStarredTrip(starredTrip.id, tripName || defaultName);
        } else {
            addStarredTrip({
                id: uuidv4(),
                origin: origin.station,
                destination: destination.station,
                name: tripName || defaultName,
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
            <Dialog.Content closeOnPress className='border border-gray-300 rounded-lg p-8'>
                <Dialog.Header>
                    <Dialog.Title>{t('starredTrip.title')}</Dialog.Title>
                    <Dialog.Description>{t('starredTrip.description')}</Dialog.Description>
                </Dialog.Header>
                <View className="py-4 gap-4">
                    <View className="gap-2">
                        <Text className="font-semibold">{t('starredTrip.name')}</Text>
                        <Input
                            placeholder={defaultName}
                            value={tripName}
                            onChangeText={setTripName}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View className="flex-row items-end gap-2">
                        <Text className="font-semibold">{t('trip.from')}: </Text>
                        <Text className="text-lg">{originStation?.label?.split(' (')[0] || origin.station}</Text>
                    </View>
                    <View className="flex-row items-end gap-2">
                        <Text className="font-semibold">{t('trip.to')}: </Text>
                        <Text className="text-lg">{destinationStation?.label?.split(' (')[0] || destination.station}</Text>
                    </View>
                </View>
                <Dialog.Footer>
                    {starredTrip && <View className="border border-red-500 rounded-md p-4 gap-4 mt-4">
                        <Dialog.Description className="text-red-500">
                            {t('starredTrip.unstarDescription')}
                        </Dialog.Description>
                        <Button onPress={handleUnstar}>
                            <Text>{t('starredTrip.unstar')}</Text>
                        </Button>
                    </View>}
                    <Button variant="outline" onPress={() => onOpenChange(false)}>
                        <Text>{t('common.cancel')}</Text>
                    </Button>
                    <Button className="bg-yellow-300" onPress={handleSave}>
                        <Text className="text-black">{starredTrip ? t('common.edit') : t('starredTrip.title')}</Text>
                    </Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
    );
} 