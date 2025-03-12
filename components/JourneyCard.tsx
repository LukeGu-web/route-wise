import { View } from 'react-native';
import { Text } from './ui/text';
import { Journey } from '~/lib/api/trip';
import { Card, CardHeader, CardContent, CardFooter } from '~/components/ui/card';

interface JourneyCardProps {
  journey: Journey;
}

export function JourneyCard({ journey }: JourneyCardProps) {
  const firstLeg = journey.legs[0];
  const lastLeg = journey.legs[journey.legs.length - 1];
  
  const formatDateTime = (time: string) => {
    return time.split(" ")[1].slice(0, 5);
  };

  const formatMinutes = (minutes: number) => {
    if (minutes >= 1440) return Math.floor(minutes / 1440) + 'd'; // Days
    if (minutes >= 60) return Math.floor(minutes / 60) + 'h'; // Hours
    return minutes + 'm'; // Minutes
}

  return (
    <Card className="mb-4">
      <CardHeader className="flex-row items-center justify-between">
        <View className="items-center">
            <Text className="text-sm text-muted-foreground">{firstLeg.origin.name.split(', ')[0]}</Text>
            <Text className="text-base font-medium">{firstLeg.origin.name.split(', ')[1]}</Text>
          </View>
          <View className="items-center">
            <Text className="text-sm text-muted-foreground">{lastLeg.destination.name.split(', ')[0]}</Text>
            <Text className="text-base font-medium">{lastLeg.destination.name.split(', ')[1]}</Text>
          </View>
      </CardHeader>

      <CardContent>
        <View className="flex-row justify-between items-center">
          {/* Left: Waiting Time */}
          <View className="items-center">
            <Text className="text-sm text-muted-foreground">Wait</Text>
            <Text className="text-base font-medium">{formatMinutes(journey.waiting_time)}</Text>
          </View>

          {/* Middle: Times and Duration */}
          <View className="items-center flex-1 mx-4">
            <View className="flex-row items-center gap-2">
              <Text className="text-base">{formatDateTime(journey.start_time)}</Text>
              <Text className="text-sm text-muted-foreground">→</Text>
              <Text className="text-base">{formatDateTime(journey.end_time)}</Text>
            </View>
            <Text className="text-sm text-muted-foreground">{formatMinutes(journey.duration)}</Text>
          </View>

          {/* Right: Fee */}
          <View className="items-center">
            <Text className="text-sm text-muted-foreground">Fee</Text>
            <Text className="text-base font-medium">{journey.fee ? `$${journey.fee .toFixed(2)}` : 'No data'}</Text>
          </View>
        </View>
      </CardContent>

      <CardFooter className="flex-row justify-between">
      <Text className="text-sm text-muted-foreground">
            {journey.legs.length > 1 ? "Transfer" : "Direct"}
        </Text>
        <View className="flex-row gap-2">
          {journey.legs.map((leg, index) => (
            <View 
              key={index} 
              className="flex-row items-center"
            >
              <View 
                className={`px-2 py-1 rounded-full ${
                  leg.mode.includes('Train') ? 'bg-blue-100' : 'bg-green-100'
                }`}
              >
                <Text 
                  className={`text-xs ${
                    leg.mode.includes('Train') ? 'text-blue-700' : 'text-green-700'
                  }`}
                >
                  {leg.line === 'Unknown' && leg.mode === 'footpath' ? 'Walk' : leg.line}
                </Text>
              </View>
              {index < journey.legs.length - 1 && (
                <Text className="mx-1 text-muted-foreground"> →</Text>
              )}
            </View>
          ))}
        </View>

      </CardFooter>
    </Card>
  );
} 