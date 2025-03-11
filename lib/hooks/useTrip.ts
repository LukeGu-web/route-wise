import { useQuery } from '@tanstack/react-query';
import { tripApi, TripParams, TripResponse } from '../api/trip';

export function useTrip(params: TripParams, city?: string) {
  return useQuery<TripResponse>({
    queryKey: ['trip', params, city],
    queryFn: () => tripApi.getTrips(params, city),
    enabled: !!params.from_location && !!params.to_location && !!params.departure_time,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Example usage:
/*
const { data: trips, isLoading, error } = useTrip({
  from_location: 'Artarmon',
  to_location: 'Central',
  departure_time: '2025-03-11T14:00:00'
});
*/