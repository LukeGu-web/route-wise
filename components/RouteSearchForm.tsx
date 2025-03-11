import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Combobox } from '~/components/ui/combobox';
import { DatePicker } from '~/components/ui/date-picker';
import { Search } from 'lucide-react-native';
import { cn } from '~/lib/utils';
import { useColorScheme } from '~/lib/useColorScheme';
import { useLocationSuggestions } from '~/lib/hooks/useLocations';
import { useCityStore } from '~/lib/store';

interface RouteSearchFormProps {
  onSearch: (data: { origin: string; destination: string; date: Date }) => void;
}

export function RouteSearchForm({
  onSearch,
}: RouteSearchFormProps) {
  const { isDarkColorScheme } = useColorScheme();
  const { selectedCity } = useCityStore();
  
  // Form state
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  
  // Use React Query to fetch location suggestions
  const originSuggestionsQuery = useLocationSuggestions(origin, selectedCity);
  const destinationSuggestionsQuery = useLocationSuggestions(destination, selectedCity);
  
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
    
    // Call the onSearch callback from parent component
    onSearch({
      origin,
      destination,
      date
    });
  };

  // Get origin suggestions list
  const getOriginSuggestions = () => {
    if (originSuggestionsQuery.isLoading) {
      return ['Loading...'];
    }
    
    if (originSuggestionsQuery.isError) {
      return ['Failed to get suggestions'];
    }
    
    return originSuggestionsQuery.data || [];
  };
  
  // Get destination suggestions list
  const getDestinationSuggestions = () => {
    if (destinationSuggestionsQuery.isLoading) {
      return ['Loading...'];
    }
    
    if (destinationSuggestionsQuery.isError) {
      return ['Failed to get suggestions'];
    }
    
    return destinationSuggestionsQuery.data || [];
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
          suggestions={getOriginSuggestions()}
        />
        {originSuggestionsQuery.isLoading && (
          <View className="mt-1 flex-row items-center">
            <ActivityIndicator size="small" className="mr-2" />
            <Text className="text-xs text-muted-foreground">Loading suggestions...</Text>
          </View>
        )}
      </View>
      
      <View>
        <Text className="text-sm font-medium mb-1 text-foreground">To</Text>
        <Combobox
          value={destination}
          onChangeText={setDestination}
          onSelect={handleSelectDestination}
          placeholder="Destination"
          suggestions={getDestinationSuggestions()}
        />
        {destinationSuggestionsQuery.isLoading && (
          <View className="mt-1 flex-row items-center">
            <ActivityIndicator size="small" className="mr-2" />
            <Text className="text-xs text-muted-foreground">Loading suggestions...</Text>
          </View>
        )}
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