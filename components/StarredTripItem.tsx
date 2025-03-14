import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Pencil, Trash2 } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const BUTTON_WIDTH = 80;
const SWIPE_THRESHOLD = -BUTTON_WIDTH * 1.5;

interface StarredTripItemProps {
  id: string;
  name: string;
  origin: string;
  destination: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string) => void;
}

export function StarredTripItem({
  id,
  name,
  origin,
  destination,
  onDelete,
  onEdit,
}: StarredTripItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editName, setEditName] = useState(name);
  const translateX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      const newTranslateX = context.startX + event.translationX;
      if (newTranslateX <= 0) {
        translateX.value = Math.max(newTranslateX, -BUTTON_WIDTH * 2);
      }
    },
    onEnd: (event) => {
      if (event.translationX < SWIPE_THRESHOLD) {
        translateX.value = withSpring(-BUTTON_WIDTH * 2);
      } else {
        translateX.value = withSpring(0);
      }
    },
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

        <PanGestureHandler onGestureEvent={panGesture}>
          <Animated.View
            style={rStyle}
            className="bg-card p-4 rounded-lg border border-border"
          >
            <Text className="text-lg font-bold mb-2">{name}</Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-muted-foreground">{origin}</Text>
              <Text className="text-muted-foreground">→</Text>
              <Text className="text-muted-foreground">{destination}</Text>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Trip Name</DialogTitle>
            <DialogDescription>Change the name of your starred trip</DialogDescription>
          </DialogHeader>
          <View className="py-4">
            <Input
              value={editName}
              onChangeText={setEditName}
              placeholder="Enter new name"
            />
          </View>
          <DialogFooter>
            <Button variant="outline" onPress={() => setIsEditDialogOpen(false)}>
              <Text>Cancel</Text>
            </Button>
            <Button onPress={handleEdit}>
              <Text>Save</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 