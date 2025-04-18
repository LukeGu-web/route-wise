import { useEffect, useState, useRef } from 'react';
import { View, TextInput, FlatList, Pressable, Image, Animated, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react-native';
import { Station, useStations } from '~/lib/hooks/useStations';
import { usePerferenceStore } from '~/lib/stores/usePerferenceStore';


// Static icon mapping
const stationTypeIcons = {
  Bus: require('~/assets/images/icons/bus.png'),
  Train: require('~/assets/images/icons/train.png'),
  TrainLink: require('~/assets/images/icons/train.png'),
  Metro: require('~/assets/images/icons/metro.png'),
  LightRail: require('~/assets/images/icons/lightrail.png'),
  Ferry: require('~/assets/images/icons/ferry.png'),
} as const;

interface ComboboxProps {
  value: Station;
  onSelect: (item: Station) => void;
  placeholder?: string;
  className?: string;
}

export function Combobox({
  value,
  onSelect,
  placeholder,
  className,
}: ComboboxProps) {
  const { isDarkMode, language } = usePerferenceStore();
  const { allStations } = useStations();
  const iconColor = isDarkMode ? '#e5e7eb' : '#9ca3af';

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<Station[]>(allStations);
  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    setFilteredSuggestions(allStations);
  }, [allStations]);

  const onDropdownToggle = (open: boolean) => {
    if (open) {
      setIsDropdownOpen(open);
      Animated.timing(dropdownHeight, {
        toValue: 200,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Keyboard.dismiss();
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => setIsDropdownOpen(open));
    }
  };

  const onSearching = (text: string) => {
    setSearchText(text);
    const filtered = allStations.filter(item =>
      item.station.toLowerCase().includes(text.toLowerCase()) ||
      (item.label && item.label.toLowerCase().includes(text.toLowerCase()))
    );
    setFilteredSuggestions(filtered);
  };

  const handleSelect = (item: Station) => {
    Keyboard.dismiss();
    onSelect(item);
    onDropdownToggle(false);
  };

  const resetSearch = () => {
    setSearchText('');
    setFilteredSuggestions(allStations);
  };

  return (
    <View className={cn("w-full", className)}>
      {isDropdownOpen ? (
        <View className="flex-row items-center gap-2 p-3 border border-input rounded-md">
          <Search size={20} color={iconColor} />
          <TextInput
            ref={textInputRef}
            autoFocus
            className="flex-grow dark:text-white"
            placeholder={placeholder || "Search..."}
            placeholderTextColor="#a1a1aa"
            value={searchText}
            onChangeText={onSearching}
          />
          <Pressable onPress={resetSearch}>
            <X size={20} color={iconColor} />
          </Pressable>
          <Pressable onPress={() => onDropdownToggle(false)}>
            <ChevronUp size={20} color={iconColor} />
          </Pressable>
        </View>
      ) : (
        <Pressable
          className="flex-row items-center gap-2 p-3 border border-input rounded-md"
          onPress={() => onDropdownToggle(true)}
        >
          <Text className="flex-grow dark:text-white">
            {value.station ?
              (language?.code !== 'en' ? (value.label || value.station) : value.station)
              : (placeholder || "Select an option")}
          </Text>
          <ChevronDown size={20} color={iconColor} />
        </Pressable>
      )}

      {isDropdownOpen && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View
            className="absolute top-full left-0 right-0 z-50 mt-1 border border-input rounded-md bg-background shadow-lg"
            style={{ maxHeight: dropdownHeight }}
          >
            {filteredSuggestions.length === 0 ? (
              <View className="w-full p-4">
                <Text className="text-center text-muted-foreground">
                  No results found
                </Text>
              </View>
            ) : (
              <FlatList
                className="w-full p-2"
                nestedScrollEnabled={true}
                data={filteredSuggestions}
                keyboardShouldPersistTaps="handled"
                keyExtractor={(item) => `${item.station}-${item.type}`}
                renderItem={({ item }) => (
                  <Pressable
                    key={`${item.station}-${item.type}`}
                    onPress={() => handleSelect(item)}
                    className="flex-row items-center px-3 py-2 hover:bg-muted active:bg-muted"
                  >
                    <Image
                      source={stationTypeIcons[item.type as keyof typeof stationTypeIcons]}
                      className="w-6 h-6 mr-2"
                    />
                    <Text className="flex-1">{language?.code !== 'en' ? item.label : item.station}</Text>
                  </Pressable>
                )}
              />
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}
