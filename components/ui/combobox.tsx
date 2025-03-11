import * as React from 'react';
import { View, TextInput, FlatList, Pressable, Animated, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import { cn } from '~/lib/utils';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';

interface ComboboxProps {
  value: string;
  onChangeText: (text: string) => void;
  onSelect: (item: string) => void;
  placeholder?: string;
  suggestions: string[];
  className?: string;
  inputClassName?: string;
}

export function Combobox({
  value,
  onChangeText,
  onSelect,
  placeholder,
  suggestions,
  className,
  inputClassName,
}: ComboboxProps) {
  const { isDarkColorScheme } = useColorScheme();
  const iconColor = isDarkColorScheme ? '#e5e7eb' : '#9ca3af';
  
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<string[]>(suggestions);
  const dropdownHeight = React.useRef(new Animated.Value(0)).current;
  const textInputRef = React.useRef<TextInput>(null);

  // 处理下拉菜单的打开和关闭
  const onDropdownToggle = (open: boolean) => {
    if (open) {
      setIsDropdownOpen(open);
      Animated.timing(dropdownHeight, {
        toValue: 200,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Keyboard.dismiss(); // 确保键盘关闭
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => setIsDropdownOpen(open));
    }
  };

  // 处理搜索
  const onSearching = (text: string) => {
    setSearchText(text);
    const filtered = suggestions.filter(item => 
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  // 处理选择
  const handleSelect = (item: string) => {
    Keyboard.dismiss(); // 先关闭键盘
    onSelect(item);
    onChangeText(item);
    onDropdownToggle(false);
  };

  // 重置搜索
  const resetSearch = () => {
    setSearchText('');
    setFilteredSuggestions(suggestions);
  };

  return (
    <View className={cn("w-full", className)}>
      {isDropdownOpen ? (
        <View className="flex-row items-center gap-2 p-2 border-2 border-blue-400 rounded-lg">
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
            {value || placeholder || "Select an option"}
          </Text>
          <ChevronDown size={20} color={iconColor} />
        </Pressable>
      )}

      {isDropdownOpen && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View
            className="mt-1 border border-input rounded-md bg-background"
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
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Pressable
                    className="py-2 px-3 active:bg-accent"
                    onPress={() => handleSelect(item)}
                  >
                    <Text>{item}</Text>
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

const styles = StyleSheet.create({
  suggestionsContainer: {
    maxHeight: 200,
    zIndex: 50,
  },
}); 