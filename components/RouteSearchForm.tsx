import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import dayjs from 'dayjs';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Combobox } from '~/components/ui/combobox';
import { DatePicker } from '~/components/ui/date-picker';
import { Search } from 'lucide-react-native';
import { cn } from '~/lib/utils';
import { useTripStore } from '../lib/stores/useTripStore';
import { usePerferenceStore } from '~/lib/stores/usePerferenceStore';
import { useTranslation } from 'react-i18next';

export function RouteSearchForm() {
  const { t } = useTranslation();
  const { isDarkMode } = usePerferenceStore();
  const { origin, destination, date, setOrigin, setDestination, setDate } = useTripStore();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // 立即更新时间
  useEffect(() => {
    const now = new Date();
    setCurrentDate(now);
    if (!date) {
      setDate(now);
    }
  }, []);

  // 每秒更新一次时间
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);
      // 如果用户没有手动选择时间，则更新 trip store 中的时间
      if (!date) {
        setDate(now);
      }
    }, 30 * 1000); // 每10秒更新一次

    return () => clearInterval(timer);
  }, [date]);

  // 当用户手动选择时间时，更新 currentDate
  useEffect(() => {
    if (date) {
      setCurrentDate(date);
    }
  }, [date]);

  // Handle search button press
  const handleSearch = () => {
    console.log('Searching for routes:', {
      origin,
      destination,
      date: dayjs(currentDate).format('YYYY-MM-DDTHH:mm:ss')
    });
    setDate(currentDate);
    router.push('/trip');
  };

  return (
    <View className='gap-4'>
      <View>
        <Text className="text-sm font-medium mb-1 text-foreground">{t('trip.from')}</Text>
        <Combobox
          value={origin}
          onSelect={setOrigin}
          placeholder={t('routeSearch.from')}
        />
      </View>

      <View>
        <Text className="text-sm font-medium mb-1 text-foreground">{t('trip.to')}</Text>
        <Combobox
          value={destination}
          onSelect={setDestination}
          placeholder={t('routeSearch.to')}
        />
      </View>

      <View>
        <Text className="text-sm font-medium mb-1 text-foreground">{t('trip.departure')}</Text>
        <DatePicker
          date={currentDate}
          onDateChange={(newDate) => {
            setCurrentDate(newDate);
            setDate(newDate);
          }}
          placeholder={t('routeSearch.selectDate')}
          showTime={true}
        />
      </View>

      <Button
        className={cn(
          'mt-2 flex-row items-center justify-center gap-4',
          isDarkMode
            ? 'bg-blue-900 hover:bg-blue-800 active:bg-blue-800'
            : 'bg-blue-500 hover:bg-blue-400 active:bg-blue-400'
        )}
        disabled={!origin.station || !destination.station}
        onPress={handleSearch}
      >
        <Search
          size={18}
          color={isDarkMode ? '#DBEAFE' : '#FFFFFF'}
        />
        <Text
          className={cn(
            'font-medium text-lg',
            isDarkMode ? 'text-blue-100' : 'text-white'
          )}
        >
          {t('trip.search')}
        </Text>
      </Button>
    </View>
  );
} 