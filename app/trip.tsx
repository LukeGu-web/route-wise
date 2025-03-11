import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '~/components/ui/text';
import { useTripStore } from '~/lib/stores/useTripStore';
import { useTrip } from '~/lib/hooks/useTrip';
import { Stack } from 'expo-router';

export default function TripPage() {
  const { origin, destination, date } = useTripStore();

  const { data: tripResponse, isLoading, error } = useTrip({
    from_location: origin,
    to_location: destination,
    departure_time: date.toISOString()
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Trip Details',
        }}
      />
      <ScrollView className="flex-1 p-4">
        <View className="bg-card rounded-lg p-4 mb-4">
          <Text className="text-lg font-semibold mb-4">Search Parameters</Text>
          <View className="gap-2">
            <View>
              <Text className="text-sm text-muted-foreground">From</Text>
              <Text className="text-base font-medium">{origin || 'Not selected'}</Text>
            </View>
            <View>
              <Text className="text-sm text-muted-foreground">To</Text>
              <Text className="text-base font-medium">{destination || 'Not selected'}</Text>
            </View>
            <View>
              <Text className="text-sm text-muted-foreground">Departure Time</Text>
              <Text className="text-base font-medium">
                {date.toLocaleString() || 'Not selected'}
              </Text>
            </View>
          </View>
        </View>

        {isLoading && (
          <View className="items-center py-8">
            <Text className="text-muted-foreground">Loading trip details...</Text>
          </View>
        )}

        {error && (
          <View className="bg-destructive/10 p-4 rounded-lg">
            <Text className="text-destructive font-medium">Error loading trip details</Text>
            <Text className="text-destructive/80 text-sm mt-1">{error.message}</Text>
          </View>
        )}

        {tripResponse && (
          <View>
            <Text className="text-lg font-semibold mb-2">
              Found {tripResponse.journeys.length} routes
            </Text>
            {/* 这里可以添加更多行程详情的展示 */}
          </View>
        )}
      </ScrollView>
    </>
  );
} 