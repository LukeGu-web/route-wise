import { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { useTrip } from '~/lib/hooks/useTrip';
import { Stack, router } from 'expo-router';
import { ChevronLeft, MoveRight } from 'lucide-react-native';
import { JourneyCard } from '~/components/JourneyCard';
import { Text } from '~/components/ui/text';
import { useTripStore } from '~/lib/stores/useTripStore';
import { Star } from '~/lib/icons/Star';
import { StarredTripDialog } from '~/components/StarredTripDialog';
import { useStarredTripStore } from '~/lib/stores/useStarredTripStore';
import { useTranslation } from 'react-i18next';
import { useStations } from '~/lib/hooks/useStations';
import { useAlerts } from '~/lib/hooks/useAlerts';
import { AlertDialog } from '~/components/AlertDialog';
import { usePerferenceStore } from '~/lib/stores/usePerferenceStore';
export default function TripPage() {
  const { t } = useTranslation();
  const { language } = usePerferenceStore();
  const { origin, destination, date, resetForm, journeys, setJourneys } = useTripStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

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
    departure_time: (date ?? new Date())?.toISOString(),
    language_code: language?.code ?? 'en'
  });

  const { starredTrips } = useStarredTripStore();
  const { allStations } = useStations();
  const { data: alertsData } = useAlerts({
    from_location: origin,
    to_location: destination,
  });

  const originStation = allStations.find(s => s.station === origin);
  const destinationStation = allStations.find(s => s.station === destination);
  const isStarred = starredTrips.find(trip => trip.origin === origin && trip.destination === destination);

  // Save trips to store whenever we get new data
  useEffect(() => {
    if (data?.pages) {
      const allJourneys = data.pages.flatMap(page => page.journeys);
      setJourneys(allJourneys);
    }
  }, [data, setJourneys]);

  // Show alert dialog when alerts are available
  useEffect(() => {
    if (alertsData?.alerts && alertsData.alerts.length > 0) {
      setIsAlertDialogOpen(true);
    }
  }, [alertsData]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">{t('common.loading')}</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-lg">{t('common.error')}</Text>
        <Text className="text-lg">{t('common.retry')}</Text>
      </View>
    )
  }

  if (!data?.pages[0]?.journeys.length) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">{t('trip.noResults')}</Text>
      </View>
    )
  }

  return (
    <>
      <Stack.Screen
        name="trip"
        options={{
          headerTitle: () => (
            <View className="flex-row items-center gap-4">
              <Text className="text-lg font-bold">{originStation?.label?.split(' (')[0] || origin}</Text>
              <MoveRight color='gray' size={24} />
              <Text className="text-lg font-bold">{destinationStation?.label?.split(' (')[0] || destination}</Text>
            </View>
          ),
          headerLeft: () => (
            <Pressable onPress={handleBack} className="py-2 pr-4">
              <ChevronLeft size={24} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable className="py-2 pl-4" onPress={() => setIsDialogOpen(true)}>
              <Star size={24} strokeWidth={3} color={isStarred ? '#fde047' : 'gray'} />
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
              {t('common.loading')}
            </Text>
          ) : null
        )}
      />
      <StarredTripDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      {alertsData?.alerts && alertsData.alerts.length > 0 && (
        <AlertDialog
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
          alerts={alertsData.alerts}
        />
      )}
    </>
  );
} 