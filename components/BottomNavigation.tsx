import * as React from 'react';
import { Pressable, View } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Map } from '~/lib/icons/Map';
import { Settings } from '~/lib/icons/Settings';
import { cn } from '~/lib/utils';
import Animated, { FadeIn } from 'react-native-reanimated';

type TabItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  label: string;
};

const tabs: TabItem[] = [
  {
    name: 'trip',
    href: '/',
    icon: <Map size={24} />,
    label: 'Trip',
  },
  {
    name: 'settings',
    href: '/settings',
    icon: <Settings size={24} />,
    label: 'Settings',
  },
];

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  // Handle tab navigation with appropriate animations
  const handleTabPress = (tab: TabItem) => {
    // If we're already on this tab, do nothing
    if (pathname === tab.href) return;
    
    // Navigate to the selected tab
    // The animation is controlled by the Stack.Screen options in _layout.tsx
    if (tab.href === '/') {
      router.replace('/');
    } else if (tab.href === '/settings') {
      router.push('/settings');
    }
  };

  return (
    <View className="flex-row border-t border-border bg-background">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Pressable
            key={tab.name}
            className="flex-1 flex-col items-center py-2"
            onPress={() => handleTabPress(tab)}
          >
            <Animated.View
              className={cn(
                'items-center justify-center',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
              entering={isActive ? FadeIn : undefined}
            >
              {React.cloneElement(tab.icon as React.ReactElement, {
                className: cn(
                  'mb-1',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                ),
              })}
              <Text
                className={cn(
                  'text-xs',
                  isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                )}
              >
                {tab.label}
              </Text>
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
} 