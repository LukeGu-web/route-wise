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

  const [displayDate, setDisplayDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => { // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      const currentDate = new Date();
      setDisplayDate(new Date(currentDate.setTime(currentDate.getTime() + 1000 * 60)));
    }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    }
  }, []);

  // Handle search button press
  const handleSearch = () => {
    console.log('Searching for routes:', {
      origin,
      destination,
      date: dayjs(date ?? new Date()).format('YYYY-MM-DDTHH:mm:ss')
    });
    if(!date) {
      setDate(new Date());
    }
    router.push('/trip');
  };

  return (
    <View className='gap-4'>
      <View>
        <Text className="text-sm font-medium mb-1 text-foreground">{t('trip.from')}</Text>
        <Combobox
          value={origin}
          onChangeText={setOrigin}
          onSelect={(item: string) => setOrigin(item)}
          placeholder={t('trip.from')}
        />
      </View>

      <View>
        <Text className="text-sm font-medium mb-1 text-foreground">{t('trip.to')}</Text>
        <Combobox
          value={destination}
          onChangeText={setDestination}
          onSelect={(item: string) => setDestination(item)}
          placeholder={t('trip.to')}
        />
      </View>

      <View>
        <Text className="text-sm font-medium mb-1 text-foreground">{t('trip.departure')}</Text>
        <DatePicker
          date={date || displayDate}
          onDateChange={setDate}
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
        disabled={!origin || !destination}
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