import React from 'react';
import { Modal, View, Pressable, StyleSheet, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { X } from 'lucide-react-native';
import { cn } from '~/lib/utils';
import { Text } from './text';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ children, ...props }: DialogProps) {
  return <DialogRoot {...props}>{children}</DialogRoot>;
}

interface DialogRootProps extends DialogProps {}

function DialogRoot({ open, onOpenChange, children }: DialogRootProps) {
  return (
    <Modal
      transparent
      visible={open}
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        onOpenChange(false);
      }}>
        <View style={StyleSheet.absoluteFill} className="bg-black/80 flex justify-center items-center p-4">
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <Animated.View 
              entering={FadeIn.duration(150)} 
              exiting={FadeOut.duration(150)}
              className="w-full max-w-lg bg-background rounded-lg shadow-lg relative"
            >
              <Pressable 
                onPress={() => onOpenChange(false)}
                className="absolute right-8 top-4 p-0.5 rounded-sm opacity-70 z-10"
              >
                <X size={24} color="#666" />
              </Pressable>
              {children}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  closeOnPress?: boolean;
}

export function DialogContent({ children, className, closeOnPress = true }: DialogContentProps) {
  return (
    <TouchableWithoutFeedback onPress={() => {
      if (closeOnPress) {
        Keyboard.dismiss();
      }
    }}>
      <View className={cn('p-6 gap-4', className)}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return (
    <View className={cn('flex flex-col gap-1.5', className)}>
      {children}
    </View>
  );
}

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <View className={cn('flex flex-col-reverse sm:flex-row sm:justify-end gap-2', className)}>
      {children}
    </View>
  );
}

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps) {
  return (
    <Text className={cn('text-lg font-semibold leading-none tracking-tight', className)}>
      {children}
    </Text>
  );
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogDescription({ children, className }: DialogDescriptionProps) {
  return (
    <Text className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </Text>
  );
}

export {
  Dialog as Root,
  DialogContent as Content,
  DialogDescription as Description,
  DialogFooter as Footer,
  DialogHeader as Header,
  DialogTitle as Title,
};
