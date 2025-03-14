import { useState } from 'react';
import { View } from 'react-native';
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

interface StarredTripDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StarredTripDialog({
  open,
  onOpenChange,
}: StarredTripDialogProps) {
    const { origin, destination} = useTripStore();
  const [tripName, setTripName] = useState('');
  const handleSave = () => {
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
          <Button variant="outline" onPress={() => onOpenChange(false)}>
            <Text>Cancel</Text>
          </Button>
          <Button className="bg-yellow-300" onPress={handleSave}>
            <Text className="text-black">Save</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 