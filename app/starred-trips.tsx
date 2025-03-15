import React, { useCallback } from 'react';
import { View, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '~/components/ui/text';
import { useStarredTripStore } from '~/lib/stores/useStarredTripStore';
import { StarredTripItem } from '~/components/StarredTripItem';
import DraggableFlatList, { 
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import type { StarredTrip } from '~/lib/stores/useStarredTripStore';
import { ArrowDownUp } from '~/lib/icons/ArrowDownUp';

export default function StarredTripsPage() {
  const { starredTrips, removeStarredTrip, editStarredTrip, reorderStarredTrips } = useStarredTripStore();

  const handleDragEnd = useCallback(({ data }: { data: StarredTrip[] }) => {
    requestAnimationFrame(() => {
      reorderStarredTrips(data);
    });
  }, [reorderStarredTrips]);

  const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<StarredTrip>) => {
    return (
      <ScaleDecorator>
        <Pressable onLongPress={drag} disabled={isActive}>
          <StarredTripItem
            id={item.id}
            name={item.name}
            origin={item.origin}
            destination={item.destination}
            onDelete={removeStarredTrip}
            onEdit={editStarredTrip}
          />
        </Pressable>
      </ScaleDecorator>
    );
  }, [removeStarredTrip, editStarredTrip]);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Starred Routes',
          headerRight: () => (
            <Pressable onPress={() => {}}>
              <ArrowDownUp size={24} />
            </Pressable>
          ),
        }}
      />
      <View className="flex-1 p-4">
        {starredTrips.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg text-muted-foreground">No starred trips yet</Text>
          </View>
        ) : (
          <DraggableFlatList
            data={starredTrips}
            onDragEnd={handleDragEnd}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        )}
      </View>
    </>
  );
} 