import React from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface AnimatedPageProps {
  children: React.ReactNode;
  isActive: boolean;
  direction?: 'left' | 'right';
  onAnimationComplete?: () => void;
}

export function AnimatedPage({
  children,
  isActive,
  direction = 'left',
  onAnimationComplete,
}: AnimatedPageProps) {
  const translateX = useSharedValue(direction === 'left' ? -width : width);
  
  React.useEffect(() => {
    if (isActive) {
      translateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      }, () => {
        if (onAnimationComplete) {
          runOnJS(onAnimationComplete)();
        }
      });
    } else {
      translateX.value = direction === 'left' ? -width : width;
    }
  }, [isActive, direction, onAnimationComplete]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      {children}
    </Animated.View>
  );
} 