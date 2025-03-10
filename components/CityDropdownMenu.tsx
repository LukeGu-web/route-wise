import * as React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { ChevronDown } from '~/lib/icons/ChevronDown';
import { Check } from '~/lib/icons/Check';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { CityName, useCityStore } from '~/lib/store';
import { cn } from '~/lib/utils';

export function CityDropdownMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  // 使用 zustand store
  const { cities, selectedCity, setSelectedCity } = useCityStore();
  
  // 获取当前选中城市的标签
  const selectedCityLabel = cities.find(city => city.name === selectedCity)?.label || selectedCity;
  
  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex-row items-center justify-center px-2 py-1"
        >
          <Text className="text-lg font-medium mr-1">{selectedCityLabel}</Text>
          <ChevronDown size={18} className="text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {cities.map((city) => (
          <DropdownMenuItem
            key={city.name}
            onPress={() => {
              if (city.isAvailable) {
                setSelectedCity(city.name);
                setIsOpen(false);
              }
            }}
            className={cn(
              "flex-row items-center justify-between",
              !city.isAvailable && "opacity-50"
            )}
            disabled={!city.isAvailable}
          >
            <Text>{city.label}</Text>
            {selectedCity === city.name && city.isAvailable && (
              <Check size={16} className="text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 