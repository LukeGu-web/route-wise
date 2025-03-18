import { useMemo } from 'react';
import trainStations from '~/assets/statics/train_stations.json';
import lightrailStations from '~/assets/statics/lightrail_stations.json';
import ferryStations from '~/assets/statics/ferry_stations.json';
import stationTranslations from '~/translations/station_translations.json';
import { useTranslation } from 'react-i18next';

interface StationTranslation {
  en: string;
  zh: string;
  type: string;
}

type StationTranslations = {
  [key: string]: StationTranslation;
};

export interface Station {
  station: string;
  type: 'Train' | 'LightRail' | 'Ferry';
  label?: string;
}

export function useStations() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const allStations = useMemo(() => {
    return [
      ...trainStations,
      ...lightrailStations,
      ...ferryStations
    ].map(station => {
      const translation = (stationTranslations as StationTranslations)[station.station];
      const label = translation && translation.zh 
        ? `${translation.zh} (${station.station})`
        : station.station;
      
      return {
        ...station,
        label
      };
    }).sort((a, b) => a.station.localeCompare(b.station)) as Station[];
  }, [currentLanguage]);

  const getFilteredStations = (searchText: string) => {
    if (!searchText) return allStations;
    const lowerSearchText = searchText.toLowerCase();
    return allStations.filter(station => 
      station.station.toLowerCase().includes(lowerSearchText) ||
      (station.label && station.label.toLowerCase().includes(lowerSearchText))
    );
  };

  return {
    allStations,
    getFilteredStations
  };
} 