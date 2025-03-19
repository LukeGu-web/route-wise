import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import trainStations from '~/assets/statics/train_stations.json';
import lightrailStations from '~/assets/statics/lightrail_stations.json';
import ferryStations from '~/assets/statics/ferry_stations.json';
import trainTranslations from '~/translations/stations/train_stations.json';
import metroTranslations from '~/translations/stations/metro_stations.json';
import trainlinkTranslations from '~/translations/stations/trainlink_stations.json';
import lightrailTranslations from '~/translations/stations/lightrail_stations.json';
import ferryTranslations from '~/translations/stations/ferry_stations.json';

export interface Station {
  station: string;
  type: string;
  label?: string;
}

interface StationTranslation {
  en: string;
  zh: string;
  type: string;
}

type StationTranslations = Record<string, StationTranslation>;


export function useStations() {
  const { i18n } = useTranslation();

  const allStations = useMemo(() => {
    const stations = [
      ...trainStations,
      ...lightrailStations,
      ...ferryStations
    ];

    const translations = {
      ...trainTranslations,
      ...lightrailTranslations,
      ...ferryTranslations,
      ...metroTranslations,
      ...trainlinkTranslations
    } as StationTranslations;

    return stations
      .map(station => ({
        ...station,
        label: translations[station.station] ? 
          `${translations[station.station][i18n.language as keyof StationTranslation]} (${station.station})` : 
          station.station
      }))
      .sort((a, b) => a.station.localeCompare(b.station));
  }, [i18n.language]);

  const getFilteredStations = (text: string) => {
    if (!text) return allStations;
    const searchText = text.toLowerCase();
    return allStations.filter(item =>
      item.station.toLowerCase().includes(searchText) ||
      (item.label && item.label.toLowerCase().includes(searchText))
    );
  };

  return {
    allStations,
    getFilteredStations,
  };
} 