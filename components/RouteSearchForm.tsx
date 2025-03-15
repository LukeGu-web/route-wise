import { View } from 'react-native';
import { router } from 'expo-router';
import dayjs from 'dayjs';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Combobox } from '~/components/ui/combobox';
import { DatePicker } from '~/components/ui/date-picker';
import { Search } from 'lucide-react-native';
import { cn } from '~/lib/utils';
import { useColorScheme } from '~/lib/useColorScheme';
import { useTripStore } from '../lib/stores/useTripStore';

export function RouteSearchForm() {
  const { isDarkColorScheme } = useColorScheme();
  const { origin, destination, date, setOrigin, setDestination, setDate } = useTripStore();

  // Handle search button press
  const handleSearch = () => {
    console.log('Searching for routes:', {
      origin,
      destination,
      date: dayjs(date).format('YYYY-MM-DDTHH:mm:ss')
    });
    router.push('/trip');
  };

  return (
    <View className='gap-4'>
      <View>
        <Text className="text-sm font-medium mb-1 text-foreground">From</Text>
        <Combobox
          value={origin}
          onChangeText={setOrigin}
          onSelect={(item: string) => setOrigin(item)}
          placeholder="Origin"
        />
      </View>

      <View>
        <Text className="text-sm font-medium mb-1 text-foreground">To</Text>
        <Combobox
          value={destination}
          onChangeText={setDestination}
          onSelect={(item: string) => setDestination(item)}
          placeholder="Destination"
        />
      </View>

      <View>
        <Text className="text-sm font-medium mb-1 text-foreground">Departure Time</Text>
        <DatePicker
          date={date}
          onDateChange={setDate}
          placeholder="Select date and time"
          showTime={true}
        />
      </View>

      <Button
        className={cn(
          'mt-2 flex-row items-center justify-center gap-4',
          isDarkColorScheme
            ? 'bg-blue-900 hover:bg-blue-800 active:bg-blue-800'
            : 'bg-blue-500 hover:bg-blue-400 active:bg-blue-400'
        )}
        disabled={!origin || !destination || !date}
        onPress={handleSearch}
      >
        <Search
          size={18}
          color={isDarkColorScheme ? '#DBEAFE' : '#FFFFFF'}
        />
        <Text
          className={cn(
            'font-medium text-lg',
            isDarkColorScheme ? 'text-blue-100' : 'text-white'
          )}
        >
          Search
        </Text>
      </Button>
    </View>
  );
} 