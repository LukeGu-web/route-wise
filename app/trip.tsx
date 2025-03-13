import { useEffect } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { useTrip } from '~/lib/hooks/useTrip';
import { Stack, router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { JourneyCard } from '~/components/JourneyCard';
import { Text } from '~/components/ui/text';
import { useTripStore } from '~/lib/stores/useTripStore';

export default function TripPage() {
  const { origin, destination, date, resetForm, journeys, setJourneys } = useTripStore();

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

  return (
    <>
      <Stack.Screen
        options={{
          title: `${origin} to ${destination}`,
          headerLeft: () => (
            <Pressable onPress={handleBack} className="mr-2">
              <ChevronLeft size={24} />
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
    </>
  );
} 