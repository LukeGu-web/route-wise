import { View } from 'react-native';
import { Text } from './ui/text';
import * as Dialog from './ui/dialog';
import { ScrollView } from 'react-native-gesture-handler';

interface Alert {
  id: string;
  priority: string;
  title: string;
  content: string;
  affected_stops: Array<{ id: string; name: string }>;
  affected_lines: Array<{ id: string; name: string; number: string }>;
}

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alerts: Alert[];
}

export function AlertDialog({ open, onOpenChange, alerts }: AlertDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content closeOnPress className="border border-gray-300 rounded-lg p-8">
        <Dialog.Header>
          <Dialog.Title>Service Alert Messages</Dialog.Title>
        </Dialog.Header>
        <ScrollView className="max-h-[60vh]">
          <View className="gap-4">
            {alerts.map((alert) => (
              <View key={alert.id} className="border border-gray-200 rounded-md p-4">
                <Text className="text-base font-medium">{alert.content}</Text>
                {alert.affected_stops.length > 0 && (
                  <View className="mt-2">
                    <Text className="text-sm font-medium text-gray-600">Affected Stops:</Text>
                    {alert.affected_stops.map((stop) => (
                      <Text key={stop.id} className="text-sm text-gray-500">• {stop.name}</Text>
                    ))}
                  </View>
                )}
                {alert.affected_lines.length > 0 && (
                  <View className="mt-2">
                    <Text className="text-sm font-medium text-gray-600">Affected Lines:</Text>
                    {alert.affected_lines.map((line) => (
                      <Text key={line.id} className="text-sm text-gray-500">• {line.name} ({line.number})</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </Dialog.Content>
    </Dialog.Root>
  );
} 