import * as React from 'react';
import { Pressable, View, Platform, Modal } from 'react-native';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Calendar } from 'lucide-react-native';
import { cn } from '~/lib/utils';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
  placeholder?: string;
  className?: string;
  showTime?: boolean;
}

export function DatePicker({ 
  date, 
  onDateChange, 
  placeholder = "Select date", 
  className,
  showTime = false
}: DatePickerProps) {
  const [show, setShow] = React.useState(false);
  const [mode, setMode] = React.useState<'date' | 'time' | 'datetime'>(
    Platform.OS === 'ios' && showTime ? 'datetime' : 'date'
  );
  const [tempDate, setTempDate] = React.useState(date);
  
  // 格式化日期和时间
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    if (showTime) {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    
    return `${year}-${month}-${day}`;
  };
  
  const formattedDate = date ? formatDate(date) : '';
  
  const onChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
      if (selectedDate) {
        if (mode === 'date') {
          // 如果是日期模式，并且需要显示时间，则切换到时间模式
          if (showTime) {
            setTempDate(selectedDate);
            setMode('time');
            setShow(true);
          } else {
            onDateChange(selectedDate);
          }
        } else {
          // 如果是时间模式，则完成选择
          const newDate = new Date(tempDate);
          newDate.setHours(selectedDate.getHours());
          newDate.setMinutes(selectedDate.getMinutes());
          onDateChange(newDate);
        }
      }
    } else {
      // iOS 上直接更新临时日期
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };
  
  const handleIOSConfirm = () => {
    setShow(false);
    onDateChange(tempDate);
  };
  
  const handleIOSCancel = () => {
    setShow(false);
  };
  
  const showDatepicker = () => {
    // 在 Android 上始终从日期选择开始
    if (Platform.OS === 'android') {
      setMode('date');
    }
    // 在 iOS 上，如果需要显示时间，则使用 datetime 模式
    else if (showTime) {
      setMode('datetime');
    } else {
      setMode('date');
    }
    setShow(true);
  };
  
  return (
    <View className={cn("relative", className)}>
      <Pressable onPress={showDatepicker} className="w-full">
        <View pointerEvents="none">
          <Input
            value={formattedDate}
            placeholder={placeholder}
            className="pr-10"
          />
        </View>
      </Pressable>
      <View className="absolute right-3 top-0 h-full justify-center">
        <Calendar size={20} className="text-muted-foreground" />
      </View>
      
      {Platform.OS === 'ios' ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
          onRequestClose={() => setShow(false)}
        >
          <View className="flex-1 justify-end bg-black/30">
            <View className="bg-card p-4 rounded-t-xl">
              <View className="flex-row justify-between mb-4">
                <Button variant="ghost" onPress={handleIOSCancel}>
                  <Text>Cancel</Text>
                </Button>
                <Button variant="ghost" onPress={handleIOSConfirm}>
                  <Text>Confirm</Text>
                </Button>
              </View>
              <DateTimePicker
                value={tempDate}
                mode={mode}
                display="spinner"
                onChange={onChange}
                style={{ height: 200 }}
              />
            </View>
          </View>
        </Modal>
      ) : show && (
        <DateTimePicker
          value={tempDate}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
} 