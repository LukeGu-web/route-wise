import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Pencil, Trash2 } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Dialog from './ui/dialog';
import { Menu } from '~/lib/icons/Menu';
import { useTranslation } from 'react-i18next';
import { usePerferenceStore } from '~/lib/stores/usePerferenceStore';
import { useStations } from '~/lib/hooks/useStations';

const BUTTON_WIDTH = 80;
const SWIPE_THRESHOLD = -BUTTON_WIDTH * 1.5;

interface StarredTripItemProps {
  id: string;
  name: string;
  origin: string;
  destination: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string) => void;
  isReordering?: boolean;
}

export function StarredTripItem({
  id,
  name,
  origin,
  destination,
  onDelete,
  onEdit,
  isReordering = false,
}: StarredTripItemProps) {
  const { t } = useTranslation();
  const { language } = usePerferenceStore();
  const { allStations } = useStations();
  const originStation = allStations.find(s => s.station === origin);
  const destinationStation = allStations.find(s => s.station === destination);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editName, setEditName] = useState(name);
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (isReordering) return;
      const x = Math.min(0, Math.max(event.translationX, -BUTTON_WIDTH * 2));
      translateX.value = x;
    })
    .onEnd((event) => {
      if (isReordering) return;
      if (event.translationX < SWIPE_THRESHOLD) {
        translateX.value = withSpring(-BUTTON_WIDTH * 2);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleDelete = () => {
    translateX.value = withSpring(0);
    onDelete(id);
  };

  const handleEdit = () => {
    onEdit(id, editName);
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <View className="relative mb-2">
        {!isReordering && (
          <View className="absolute right-0 flex-row h-full">
            <Pressable
              className="bg-blue-500 justify-center w-20 items-center rounded-l-lg"
              onPress={() => {
                setIsEditDialogOpen(true);
                translateX.value = withSpring(0);
              }}
            >
              <Pencil size={24} color="white" />
            </Pressable>
            <Pressable
              className="bg-red-500 justify-center w-20 items-center rounded-r-lg"
              onPress={handleDelete}
            >
              <Trash2 size={24} color="white" />
            </Pressable>
          </View>
        )}

        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={rStyle}
            className="bg-card py-2 px-4 rounded-lg border border-border flex-row justify-between items-center"
          >
            <View>
              <Text className="text-lg font-bold mb-1">{name}</Text>
              {
                language?.code !== 'en' && (
                  <View className="flex-row items-center gap-2">
                    <Text className="text-muted-foreground">{originStation?.label?.split(' (')[0] || origin}</Text>
                    <Text className="text-muted-foreground">→</Text>
                    <Text className="text-muted-foreground">{destinationStation?.label?.split(' (')[0] || destination}</Text>
                  </View>
                )
              }
              <View className="flex-row items-center gap-2">
                <Text className="text-muted-foreground">{origin}</Text>
                <Text className="text-muted-foreground">→</Text>
                <Text className="text-muted-foreground">{destination}</Text>
              </View>
            </View>
            {isReordering && (
              <Menu width={24} height={24} color="#666" />
            )}
          </Animated.View>
        </GestureDetector>
      </View>

      <Dialog.Root open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{t('starredTrip.editTitle')}</Dialog.Title>
            <Dialog.Description>{t('starredTrip.editDescription')}</Dialog.Description>
          </Dialog.Header>
          <View className="py-4">
            <Input
              placeholder={t('starredTrip.enterName')}
              value={editName}
              onChangeText={setEditName}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <Dialog.Footer>
            <Button variant="outline" onPress={() => setIsEditDialogOpen(false)}>
              <Text>{t('common.cancel')}</Text>
            </Button>
            <Button onPress={handleEdit}>
              <Text className="text-black">{t('common.edit')}</Text>
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
} 