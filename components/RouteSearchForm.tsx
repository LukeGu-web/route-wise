import { View } from 'react-native';
import { router } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Combobox } from '~/components/ui/combobox';
import { DatePicker } from '~/components/ui/date-picker';
import { Search } from 'lucide-react-native';
import { cn } from '~/lib/utils';
import { useColorScheme } from '~/lib/useColorScheme';
import { useCityStore } from '~/lib/stores/useCityStore';
import { useTripStore } from '../lib/stores/useTripStore';

const locationSuggestions = [
  "Artarmon",
  "Central",
  "Airport Terminal 1",
  "Airport Terminal 2",
  "Downtown",
  "City Hall",
  "University Campus",
  "Shopping Mall",
  "Sports Stadium",
  "Beach",
  "Convention Center",
  "Hospital",
  "Park",
  "Museum",
  "Library",
  "Zoo"
];

interface RouteSearchFormProps {
  onSearch: (data: { origin: string; destination: string; date: Date }) => void;
}

export function RouteSearchForm({
  onSearch,
}: RouteSearchFormProps) {
  const { isDarkColorScheme } = useColorScheme();
  const { selectedCity } = useCityStore();
  const { origin, destination, date, setOrigin, setDestination, setDate } = useTripStore();
  
  
  // Handle origin selection
  const handleSelectOrigin = (item: string) => {
    console.log('Selected origin:', item);
    setOrigin(item);
  };

  // Handle destination selection
  const handleSelectDestination = (item: string) => {
    console.log('Selected destination:', item);
    setDestination(item);
  };

  // Handle search button press
  const handleSearch = () => {
    console.log('Searching for routes:', {
      origin,
      destination,
      date: date.toISOString()
    });
    router.push('/trip');
    // Call the onSearch callback from parent component
    // onSearch({
    //   origin,
    //   destination,
    //   date
    // });
  };

  return (
    <View className='gap-4'>
      <View>
        <Text className="text-sm font-medium mb-1 text-foreground">From</Text>
        <Combobox
          value={origin}
          onChangeText={setOrigin}
          onSelect={handleSelectOrigin}
          placeholder="Origin"
          suggestions={locationSuggestions}
        />
      </View>
      
      <View>
        <Text className="text-sm font-medium mb-1 text-foreground">To</Text>
        <Combobox
          value={destination}
          onChangeText={setDestination}
          onSelect={handleSelectDestination}
          placeholder="Destination"
          suggestions={locationSuggestions}
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