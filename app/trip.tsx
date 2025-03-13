import { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { useTrip } from '~/lib/hooks/useTrip';
import { Stack, router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { JourneyCard } from '~/components/JourneyCard';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { useTripStore } from '~/lib/stores/useTripStore';
import { Star } from '~/lib/icons/Star';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog';

export default function TripPage() {
  const { origin, destination, date, resetForm, journeys, setJourneys } = useTripStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tripName, setTripName] = useState('');

  const handleBack = () => {
    resetForm();
    router.back();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useTrip({
    from_location: origin,
    to_location: destination,
    departure_time: date.toISOString()
  });

  // Save trips to store whenever we get new data
  useEffect(() => {

    if (data?.pages) {
      const allJourneys = data.pages.flatMap(page => page.journeys);
      setJourneys(allJourneys);
    }
  }, [data, setJourneys]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">Loading trips...</Text>
      </View>)
  }

  if (error) {
    return <Text className="p-4 text-red-500">Error: {error.message}</Text>;
  }

  if (!data?.pages[0]?.journeys.length) {
    return <Text className="p-4">No trips found</Text>;
  }

  const handleSaveStarredTrip = () => {
    console.log('Save starred trip');
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View className="flex-row items-center gap-4">
              <Text className="text-lg font-bold">{origin}</Text>
              <Text className="text-muted-foreground">to</Text>
              <Text className="text-lg font-bold">{destination}</Text>
            </View>
          ),
          headerLeft: () => (
            <Pressable onPress={handleBack} className="mr-2">
              <ChevronLeft size={24} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => setIsDialogOpen(true)}>
              <Star size={24} />
            </Pressable>
          ),
        }}
      />
      <FlatList
        className="flex-1 p-4"
        data={journeys}
        renderItem={({ item }) => <JourneyCard journey={item} />}
        keyExtractor={(item, index) => `${item.start_time}-${index}`}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.9}
        ListFooterComponent={() => (
          isFetchingNextPage ? (
            <Text className="py-4 text-center text-muted-foreground">
              Loading more trips...
            </Text>
          ) : null
        )}
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Starred Trip</DialogTitle>
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
            <Button variant="outline" onPress={() => setIsDialogOpen(false)}>
              <Text>Cancel</Text>
            </Button>
            <Button className="bg-yellow-300" onPress={handleSaveStarredTrip}>
              <Text className="text-black">Save</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 