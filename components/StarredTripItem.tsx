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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editName, setEditName] = useState(name);
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      'worklet';
      translateX.value = translateX.value;
    })
    .onUpdate((event) => {
      'worklet';
      if (isReordering) return;
      const newTranslateX = event.translationX;
      if (newTranslateX <= 0) {
        translateX.value = Math.max(newTranslateX, -BUTTON_WIDTH * 2);
      }
    })
    .onEnd((event) => {
      'worklet';
      if (isReordering) return;
      if (event.translationX < SWIPE_THRESHOLD) {
        translateX.value = withSpring(-BUTTON_WIDTH * 2);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleEdit = () => {
    onEdit(id, editName);
    setIsEditDialogOpen(false);
    translateX.value = withSpring(0);
  };

  const handleDelete = () => {
    onDelete(id);
    translateX.value = withSpring(0);
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
        <Dialog.Content closeOnPress className='border border-gray-400 rounded-lg p-8'>
          <Dialog.Header>
            <Dialog.Title>Edit Trip Name</Dialog.Title>
            <Dialog.Description>Change the name of your starred trip</Dialog.Description>
          </Dialog.Header>
          <View className="py-4">
            <Input
              value={editName}
              onChangeText={setEditName}
              placeholder="Enter new name"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <Dialog.Footer>
            <Button variant="outline" onPress={() => setIsEditDialogOpen(false)}>
              <Text>Cancel</Text>
            </Button>
            <Button onPress={handleEdit}>
              <Text>Save</Text>
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
} 