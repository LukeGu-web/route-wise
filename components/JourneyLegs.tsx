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
            <View className="flex-row items-center gap-4">
                <Text className="text-green-500">Direct</Text>
                <LineIcon mode={journey.legs[0].mode} line={journey.legs[0].line} size="lg" />
            </View>
        );
    }

    // Transfer journey - accordion view
    return (
        <View className="w-full">
            <Accordion type="single" collapsible className="-mb-4">
                <AccordionItem value="legs" className="border-b-0">
                    <AccordionTrigger >
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
                                <LineIcon mode={leg.mode} line={leg.line} />
                                <View className="flex-row items-center justify-between">
                                    {/* Origin stop */}
                                    <View className="items-center w-5/12">
                                        <Text className="text-xs text-muted-foreground">{leg.origin.name.split(', ')[0]}</Text>
                                        <Text className="text-base font-medium">{leg.origin.name.split(', ')[1]}</Text>
                                        <Text className="text-sm text-muted-foreground">{dayjs(leg.origin.departure_time?.replace(" AEDT", "")).format('HH:mm')}</Text>
                                    </View>
                                    <Text className="mx-1 text-muted-foreground">→</Text>
                                    {/* Destination stop */}
                                    <View className="items-center w-5/12">
                                        <Text className="text-xs text-muted-foreground">{leg.destination.name.split(', ')[0]}</Text>
                                        <Text className="text-base font-medium">{leg.destination.name.split(', ')[1]}</Text>
                                        <Text className="text-sm text-muted-foreground">{dayjs(leg.destination.arrival_time?.replace(" AEDT", "")).format('HH:mm')}</Text>
                                    </View>
                                </View>


                                {/* Divider except for last leg */}
                                {legIndex < journey.legs.length - 1 && (
                                    <View className="my-2 border-t border-border" />)}
                            </View>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </View>
    );
} 