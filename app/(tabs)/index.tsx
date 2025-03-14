import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, CardContent } from '~/components/ui/card';
import { HomeHeader } from '~/components/HomeHeader';
import { RouteSearchForm } from '~/components/RouteSearchForm';
import { StarredTrips } from '~/components/StarredTrips';
export default function Screen() {
  return (
    <View className="flex-1 bg-background">
      <HomeHeader />
      <SafeAreaView className='flex-1 p-6' edges={['bottom']}>
        <View className='flex-1 w-full gap-8'>
          <Card className='w-full rounded-xl'>
            <CardContent className='p-6'>
              <RouteSearchForm />
            </CardContent>
          </Card>
          <StarredTrips />
        </View>
      </SafeAreaView>
    </View>
  );
}
