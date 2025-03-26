import { useEffect, useState, useRef } from 'react';
import { FlatList, Pressable, View, AppState, AppStateStatus, ActivityIndicator } from 'react-native';
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
  const { origin, destination, date, resetForm, journeys, setJourneys, updateJourneys } = useTripStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPullRefreshing, setIsPullRefreshing] = useState(false);
  
  const handleBack = () => {
    resetForm();
    router.back();
  };

  const {
    data,
    fetchNextPage,
    refetch,
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
      
      // 首次加载使用setJourneys，保证直接替换
      if (journeys.length === 0) {
        setJourneys(allJourneys);
      } else {
        // 更新时使用updateJourneys，保证智能合并
        updateJourneys(allJourneys);
      }
    }
  }, [data, setJourneys, updateJourneys, journeys.length]);

  // Set up auto-refresh interval
  useEffect(() => {
    // 创建AppState监听
    const appStateSubscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && data?.pages && data.pages.length > 0 && !isPullRefreshing) {
        // App重新回到前台时刷新数据
        setIsRefreshing(true);
        refetch().finally(() => {
          setIsRefreshing(false);
        });
      }
    });
    
    // Start refresh interval
    const startRefreshInterval = () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      
      refreshIntervalRef.current = setInterval(() => {
        if (data?.pages && data.pages.length > 0 && AppState.currentState === 'active' && !isPullRefreshing && !isRefreshing) {
          setIsRefreshing(true);
          // Refetch to update all loaded pages
          refetch().finally(() => {
            setIsRefreshing(false);
          });
        }
      }, 30000); // 30 seconds
    };

    // Start the interval when component mounts
    startRefreshInterval();

    // Clean up interval on component unmount
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
      appStateSubscription.remove();
    };
  }, [data, refetch, isPullRefreshing, isRefreshing]);

  // Show alert dialog when alerts are available
  useEffect(() => {
    if (alertsData?.alerts && alertsData.alerts.length > 0) {
      setIsAlertDialogOpen(true);
    }
  }, [alertsData]);

  // 处理手动下拉刷新
  const handlePullRefresh = () => {
    setIsPullRefreshing(true);
    refetch().finally(() => {
      setIsPullRefreshing(false);
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">{t('common.loading')}</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center -mt-16 px-4 gap-2">
        <Text className="text-lg p-2">{t('common.errorMessage')}</Text>
        <Pressable onPress={() => refetch()} className="py-2 px-8 bg-zinc-200 dark:bg-zinc-500 rounded-md">
          <Text className="text-lg font-medium">{t('common.retry')}</Text>
        </Pressable>
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
            <View className="flex-row items-center">
              {isRefreshing && (
                <View className="mr-4">
                  <ActivityIndicator size="small" color="gray" />
                </View>
              )}
              <Pressable className="py-2 pl-4" onPress={() => setIsDialogOpen(true)}>
                <Star size={24} strokeWidth={3} color={isStarred ? '#fde047' : 'gray'} />
              </Pressable>
            </View>
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
        refreshing={isPullRefreshing}
        onRefresh={handlePullRefresh}
        ListFooterComponent={() => (
          isFetchingNextPage || isRefreshing ? (
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