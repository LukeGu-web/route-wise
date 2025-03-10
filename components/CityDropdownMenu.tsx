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
import { City, useCityStore } from '~/lib/store';

export function CityDropdownMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  // 使用 zustand store
  const { selectedCity, setSelectedCity } = useCityStore();
  
  const cities: City[] = ['Sydney', 'Melbourne', 'Brisbane'];
  
  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex-row items-center justify-center px-2 py-1"
        >
          <Text className="text-lg font-medium mr-1">{selectedCity}</Text>
          <ChevronDown size={18} className="text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {cities.map((city) => (
          <DropdownMenuItem
            key={city}
            onPress={() => {
              setSelectedCity(city);
              setIsOpen(false);
            }}
            className="flex-row items-center justify-between"
          >
            <Text>{city}</Text>
            {selectedCity === city && <Check size={16} className="text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 