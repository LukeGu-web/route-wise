import { useCallback, useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '~/components/ui/text';
import { useStarredTripStore } from '~/lib/stores/useStarredTripStore';
import { StarredTripItem } from '~/components/StarredTripItem';
import GoBackButton from '~/components/GoBackButton';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import type { StarredTrip } from '~/lib/stores/useStarredTripStore';
import { ArrowDownUp, Save } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export default function StarredTrips() {
  const { t } = useTranslation();
  const { starredTrips, removeStarredTrip, editStarredTrip, reorderStarredTrips } = useStarredTripStore();
  const [isReordering, setIsReordering] = useState(false);

  const handleDragEnd = useCallback(({ data }: { data: StarredTrip[] }) => {
    requestAnimationFrame(() => {
      reorderStarredTrips(data);
    });
  }, [reorderStarredTrips]);

  const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<StarredTrip>) => {
    return (
      <View className="border-b border-border last:border-b-0">
        <Pressable
          onPressIn={isReordering ? drag : undefined}
          disabled={!isReordering}
        >
          <StarredTripItem
            id={item.id}
            name={item.name}
            origin={item.origin.station}
            destination={item.destination.station}
            onDelete={removeStarredTrip}
            onEdit={editStarredTrip}
            isReordering={isReordering}
          />
        </Pressable>
      </View>
    );
  }, [removeStarredTrip, editStarredTrip, isReordering]);

  return (
    <>
      <Stack.Screen
        options={{
          title: isReordering ? t('trip.reorder') : t('trip.starredRoutes'),
          headerLeft: isReordering ? () => null : GoBackButton,
          headerRight: () => (
            <Pressable onPress={() => setIsReordering(!isReordering)} className="p-2">
              {isReordering ? (
                <Save size={24} />
              ) : (
                <ArrowDownUp size={24} />
              )}
            </Pressable>
          ),
        }}
      />
      <View className="flex-1 p-4">
        {starredTrips.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg text-muted-foreground">{t('trip.noStarredRoutes')}</Text>
          </View>
        ) : (
            <DraggableFlatList
              data={starredTrips}
              onDragEnd={handleDragEnd}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              containerStyle={{ paddingVertical: 0 }}
            />
        )}
      </View>
    </>
  );
} 