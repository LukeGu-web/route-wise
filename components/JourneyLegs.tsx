import { View } from 'react-native';
import dayjs from 'dayjs';
import { Text } from './ui/text';
import { LineIcon } from './ui/line-icon';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion';
import { Journey } from '~/lib/api/trip';

interface JourneyLegsProps {
    journey: Journey;
}

export function JourneyLegs({ journey }: JourneyLegsProps) {
    const needsTransfer = journey.legs.length > 1;

    if (!needsTransfer) {
        // Direct journey - simple view
        return (
            <View className="flex-row justify-between items-center">
                <Text className="text-sm text-muted-foreground">Direct</Text>
                <View className="flex-row items-center">
                    <LineIcon mode={journey.legs[0].mode} line={journey.legs[0].line} />
                </View>
            </View>
        );
    }

    // Transfer journey - accordion view
    return (
        <View className="w-full">
            <Accordion type="single" collapsible>
                <AccordionItem value="legs">
                    <AccordionTrigger>
                        <View className="flex-row gap-2">
                            {journey.legs.map((leg, index) => (
                                <View key={index} className="flex-row items-center">
                                    <LineIcon mode={leg.mode} line={leg.line} />
                                    {index < journey.legs.length - 1 && (
                                        <Text className="mx-1 text-muted-foreground">→</Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    </AccordionTrigger>
                    <AccordionContent>
                        {journey.legs.map((leg, legIndex) => (
                            <View key={legIndex} className="py-2">
                                {/* Leg header */}
                                <View className="flex-row items-center mb-2">
                                    <LineIcon mode={leg.mode} line={leg.line} />
                                    <Text className="ml-2 font-medium">
                                        {leg.mode === 'footpath' ? 'Walk' : `${leg.mode} ${leg.line}`}
                                    </Text>
                                </View>

                                {/* Origin stop */}
                                <View className="ml-4 mb-2">
                                    <Text className="text-sm text-muted-foreground">From</Text>
                                    <View className="flex-row justify-between items-center">
                                        <View>
                                            <Text className="font-medium">{leg.origin.name}</Text>
                                            {leg.origin.platform && (
                                                <Text className="text-sm text-muted-foreground">
                                                    Platform {leg.origin.platform}
                                                </Text>
                                            )}
                                        </View>
                                        <Text>{dayjs(leg.departure_time).format('HH:mm')}</Text>
                                    </View>
                                </View>

                                {/* Destination stop */}
                                <View className="ml-4">
                                    <Text className="text-sm text-muted-foreground">To</Text>
                                    <View className="flex-row justify-between items-center">
                                        <View>
                                            <Text className="font-medium">{leg.destination.name}</Text>
                                            {leg.destination.platform && (
                                                <Text className="text-sm text-muted-foreground">
                                                    Platform {leg.destination.platform}
                                                </Text>
                                            )}
                                        </View>
                                        <Text>{dayjs(leg.arrival_time).format('HH:mm')}</Text>
                                    </View>
                                </View>

                                {/* Divider except for last leg */}
                                {legIndex < journey.legs.length - 1 && (
                                    <View className="my-2 border-t border-border" />
                                )}
                            </View>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </View>
    );
} 