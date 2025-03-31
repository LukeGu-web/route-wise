import { create } from 'zustand';
import { Journey } from '../api/trip';
import { Station } from '~/lib/hooks/useStations';

interface TripState {
  origin: Station;
  destination: Station;
  date: Date | null;
  journeys: Journey[];
  setOrigin: (origin: Station) => void;
  setDestination: (destination: Station) => void;
  setDate: (date: Date) => void;
  setJourneys: (journeys: Journey[]) => void;
  updateJourneys: (journeys: Journey[]) => void;
  resetForm: () => void;
}

export const useTripStore = create<TripState>((set, get) => ({
  origin: {
    station: '',
    type: ''
  },
  destination: {
    station: '',
    type: ''
  },
  date: null,
  journeys: [],
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setDate: (date) => set({ date }),
  setJourneys: (journeys) => set({ journeys }),
  updateJourneys: (newJourneys) => {
    const currentJourneys = get().journeys;

    // 创建一个通过start_time、end_time和第一段行程信息组合的键来唯一标识每个journey
    const journeyMap = new Map<string, Journey>();

    // 将当前journeys放入Map
    currentJourneys.forEach(journey => {
      const firstLeg = journey.legs[0]?.line || '';
      const key = `${journey.start_time}-${journey.end_time}-${firstLeg}`;
      journeyMap.set(key, journey);
    });

    // 用新数据更新Map
    newJourneys.forEach(journey => {
      const firstLeg = journey.legs[0]?.line || '';
      const key = `${journey.start_time}-${journey.end_time}-${firstLeg}`;
      journeyMap.set(key, journey);
    });

    // 转换回数组并按出发时间排序
    const updatedJourneys = Array.from(journeyMap.values())
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

    set({ journeys: updatedJourneys });
  },
  resetForm: () => set({
    origin: {
      station: '',
      type: ''
    },
    destination: {
      station: '',
      type: ''
    },
    date: null,
    journeys: []
  })
})); 