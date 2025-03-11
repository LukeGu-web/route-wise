import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, CardContent } from '~/components/ui/card';
import { useCityStore } from '~/lib/store';
import { HomeHeader } from '~/components/HomeHeader';
import { RouteSearchForm } from '~/components/RouteSearchForm';

export default function Screen() {
  // 使用 zustand store 获取当前选择的城市和城市列表
  const { selectedCity } = useCityStore();
  
  // 模拟的地点建议
  const locationSuggestions = [
    "Central Station",
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

  // 搜索完成后的回调
  const onSearchComplete = () => {
    // 这里可以添加导航到结果页面等逻辑
    console.log('Search completed, ready to navigate to results');
  };

  return (
    <View className="flex-1 bg-background">
      <HomeHeader />
      <SafeAreaView className='flex-1 p-6' edges={['bottom']}>
        <View className='flex-1 w-full'>
          <Card className='w-full rounded-xl'>
            <CardContent className='p-6'>
              <RouteSearchForm 
                onSearch={onSearchComplete}
                locationSuggestions={locationSuggestions}
              />
            </CardContent>
          </Card>
        </View>
      </SafeAreaView>
    </View>
  );
}
