import { useQuery } from '@tanstack/react-query';
import { useCityStore } from '~/lib/stores/useCityStore';
import { usePerferenceStore } from '~/lib/stores/usePerferenceStore';

interface AffectedStop {
  id: string;
  name: string;
}

interface AffectedLine {
  id: string;
  name: string;
  number: string;
}

interface Alert {
  id: string;
  priority: string;
  title: string;
  content: string;
  affected_stops: AffectedStop[];
  affected_lines: AffectedLine[];
}

interface AlertsResponse {
  alerts: Alert[];
}

interface UseAlertsParams {
  from_location: string;
  to_location: string;
}

export function useAlerts({ from_location, to_location }: UseAlertsParams) {
  const { selectedCity } = useCityStore();
  const { enabledServiceMessages } = usePerferenceStore();

  return useQuery({
    queryKey: ['alerts', selectedCity, from_location, to_location],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/${selectedCity.toLowerCase()}/alerts?from_location=${from_location}&to_location=${to_location}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch alerts');
      }
      const data: AlertsResponse = await response.json();
      return data;
    },
    enabled: !!from_location && !!to_location && enabledServiceMessages,
  });
} 