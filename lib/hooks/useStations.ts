import { useMemo } from 'react';
import trainStations from '~/assets/statics/train_stations.json';
import lightrailStations from '~/assets/statics/lightrail_stations.json';
import ferryStations from '~/assets/statics/ferry_stations.json';

export interface Station {
  station: string;
  type: 'Train' | 'LightRail' | 'Ferry';
}

export function useStations() {
  const allStations = useMemo(() => {
    return [
      ...trainStations,
      ...lightrailStations,
      ...ferryStations
    ].sort((a, b) => a.station.localeCompare(b.station)) as Station[];
  }, []);

  const getFilteredStations = (searchText: string) => {
    if (!searchText) return allStations;
    const lowerSearchText = searchText.toLowerCase();
    return allStations.filter(station => 
      station.station.toLowerCase().includes(lowerSearchText)
    );
  };

  return {
    allStations,
    getFilteredStations
  };
} 