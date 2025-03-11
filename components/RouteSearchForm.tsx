import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Combobox } from '~/components/ui/combobox';
import { DatePicker } from '~/components/ui/date-picker';
import { Search } from 'lucide-react-native';
import { cn } from '~/lib/utils';
import { useColorScheme } from '~/lib/useColorScheme';

interface RouteSearchFormProps {
  onSearch: () => void;
  locationSuggestions: string[];
}

export function RouteSearchForm({
  onSearch,
  locationSuggestions
}: RouteSearchFormProps) {
  const { isDarkColorScheme } = useColorScheme();
  
  // 表单状态
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());

  // 处理选择起点
  const handleSelectOrigin = (item: string) => {
    console.log('Selected origin:', item);
    setOrigin(item);
  };

  // 处理选择终点
  const handleSelectDestination = (item: string) => {
    console.log('Selected destination:', item);
    setDestination(item);
  };

  // 处理搜索
  const handleSearch = () => {
    console.log('Searching for routes:', {
      origin,
      destination,
      date: date.toISOString()
    });
    
    // 调用父组件传入的 onSearch 回调
    onSearch();
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