import React from 'react';
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

export default function StarredTripsPage() {
  const { starredTrips, removeStarredTrip, editStarredTrip, reorderStarredTrips } = useStarredTripStore();

  const renderItem = ({ item, drag, isActive }: RenderItemParams<StarredTrip>) => {
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
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Starred Trips',
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
            onDragEnd={({ data }) => reorderStarredTrips(data)}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        )}
      </View>
    </>
  );
} 