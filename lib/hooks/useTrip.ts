import { useInfiniteQuery } from '@tanstack/react-query';
import { tripApi, TripParams, TripResponse } from '../api/trip';

function parseDateTime(dateTimeStr: string): Date {
  // Remove timezone name (e.g., "AEDT") and parse the date
  const cleanDateTime = dateTimeStr.replace(/\s[A-Z]+$/, '');
  return new Date(cleanDateTime);
}

export function useTrip(params: TripParams, city?: string) {
  return useInfiniteQuery<TripResponse>({
    queryKey: ['trip', params, city],
    initialPageParam: params.departure_time,
    queryFn: ({ pageParam }) => {
      const nextParams = { ...params };
      nextParams.departure_time = pageParam as string;
      return tripApi.getTrips(nextParams, city);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.journeys.length) return undefined;
      const lastJourney = lastPage.journeys[lastPage.journeys.length - 1];
      
      // Parse the date string properly
      const nextDepartureTime = parseDateTime(lastJourney.start_time);
      nextDepartureTime.setSeconds(nextDepartureTime.getSeconds() + 30);
      
      // Format the date to match the API's expected format
      // YYYY-MM-DD HH:mm:ss
      const year = nextDepartureTime.getFullYear();
      const month = String(nextDepartureTime.getMonth() + 1).padStart(2, '0');
      const day = String(nextDepartureTime.getDate()).padStart(2, '0');
      const hours = String(nextDepartureTime.getHours()).padStart(2, '0');
      const minutes = String(nextDepartureTime.getMinutes()).padStart(2, '0');
      const seconds = String(nextDepartureTime.getSeconds()).padStart(2, '0');
      
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    enabled: !!params.from_location && !!params.to_location && !!params.departure_time,
    retry: 3,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Example usage:
/*
const { 
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  error 
} = useTrip({
  from_location: 'Artarmon',
  to_location: 'Central',
  departure_time: '2025-03-11T14:00:00'
});
*/