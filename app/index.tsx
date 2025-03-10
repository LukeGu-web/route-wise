import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, CardContent } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { DatePicker } from '~/components/ui/date-picker';
import { useCityStore } from '~/lib/store';
import { HomeHeader } from '~/components/HomeHeader';
import { Search } from 'lucide-react-native';

export default function Screen() {
  // 使用 zustand store 获取当前选择的城市和城市列表
  const { cities, selectedCity } = useCityStore();
  
  // 获取当前选中城市的标签
  const selectedCityLabel = cities.find(city => city.name === selectedCity)?.label || selectedCity;

  // 表单状态
  const [origin, setOrigin] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [date, setDate] = React.useState(new Date());

  // 处理搜索
  const handleSearch = () => {
    console.log('Searching for routes:', {
      city: selectedCity,
      origin,
      destination,
      date: date.toISOString()
    });
  };

  return (
    <View className="flex-1 bg-background">
      <HomeHeader />
      <SafeAreaView className='flex-1 p-6' edges={['bottom']}>
        <View className='flex-1 w-full'>
          <Card className='w-full rounded-xl'>
            <CardContent className='p-6'>
              <View className='gap-4'>
                <Text className='text-lg font-semibold mb-2'>Find Routes in {selectedCityLabel}</Text>
                
                <Input
                  placeholder="Origin"
                  value={origin}
                  onChangeText={setOrigin}
                />
                
                <Input
                  placeholder="Destination"
                  value={destination}
                  onChangeText={setDestination}
                />
                
                <DatePicker
                  date={date}
                  onDateChange={setDate}
                  placeholder="Select date and time"
                  showTime={true}
                />
                
                <Button 
                  className='mt-2 flex-row items-center justify-center'
                  onPress={handleSearch}
                >
                  <Search size={18} className='text-primary-foreground mr-2' />
                  <Text className='text-primary-foreground font-medium'>Search Routes</Text>
                </Button>
              </View>
            </CardContent>
          </Card>
        </View>
      </SafeAreaView>
    </View>
  );
}
