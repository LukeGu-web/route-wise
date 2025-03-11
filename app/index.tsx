import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, CardContent } from '~/components/ui/card';
import { useCityStore } from '~/lib/stores/useCityStore';
import { HomeHeader } from '~/components/HomeHeader';
import { RouteSearchForm } from '~/components/RouteSearchForm';
import { useRouter } from 'expo-router';

export default function Screen() {
  // Get the currently selected city from zustand store
  const { selectedCity } = useCityStore();
  const router = useRouter();
  
  // Callback for when search is completed
  const onSearchComplete = (data: { origin: string; destination: string; date: Date }) => {
    // Add logic to navigate to results page
    console.log('Search completed, ready to navigate to results', data);
    
    // Navigation to results page
    // router.push({
    //   pathname: '/routes',
    //   params: {
    //     origin: data.origin,
    //     destination: data.destination,
    //     date: data.date.toISOString(),
    //     city: selectedCity
    //   }
    // });
  };

  return (
    <View className="flex-1 bg-background">
      <HomeHeader />
      <SafeAreaView className='flex-1 p-6' edges={['bottom']}>
        <View className='flex-1 w-full'>
          <Card className='w-full rounded-xl'>
            <CardContent className='p-6'>
              <RouteSearchForm onSearch={onSearchComplete} />
            </CardContent>
          </Card>
        </View>
      </SafeAreaView>
    </View>
  );
}
