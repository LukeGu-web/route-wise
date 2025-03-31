import { View } from 'react-native';
import { Text } from './text';

const lineColorMap = {
  T1: '#f99d1c',
  T2: '#0098cd',
  T3: '#f37021',
  T4: '#005aa3',
  T5: '#c4258f',
  T6: '#7d3f21',
  T7: '#6f818e',
  T8: '#00954c',
  T9: '#d11f2f',
  CCN: '#F6891F',
  Metro:'#0f8389',
  Buses: '#00B5EF',
  LightRails: '#EE343F',
  Ferries: '#5AB031',
  Coach: '#732A82',
  footpath: '#456caa',
} as const;

type TrainLine = 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8' | 'T9' | 'CCN';

interface LineIconProps {
  mode: string;
  line: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export function LineIcon({ mode, line, size = 'xs' }: LineIconProps) {
  // Handle special case for walking
  if (line === 'Unknown' && mode === 'footpath') {
    return (
      <View 
        style={{ backgroundColor: `${lineColorMap.footpath}20` }}
        className="px-2 py-1 rounded-full"
      >
        <Text 
          style={{ color: lineColorMap.footpath }}
          className={`text-${size}`}
        >
          Walk
        </Text>
      </View>
    );
  }

  // Get the background and text color based on mode and line
  const getColors = () => {
    // For train lines (T1-T9 and CCN)
    if (mode.includes('Train') && /^(T[1-9]|CCN)$/.test(line)) {
      const trainLine = line as TrainLine;
      const bgColor = `${lineColorMap[trainLine]}20`; // 20% opacity
      const textColor = lineColorMap[trainLine];
      return { bgColor, textColor };
    }

    // For other modes
    const modeColorMap = {
      Metro: lineColorMap.Metro,
      Buses: lineColorMap.Buses,
      "Light Rail": lineColorMap.LightRails,
      Ferries: lineColorMap.Ferries,
      Coach: lineColorMap.Coach,
    };

    const defaultColor = '#6f818e'; // Default color if mode not found
    const color = Object.entries(modeColorMap).find(([key]) => 
      mode.includes(key)
    )?.[1] || defaultColor;

    return {
      bgColor: `${color}20`, // 20% opacity
      textColor: color,
    };
  };

  const { bgColor, textColor } = getColors();

  return (
    <View 
      style={{ backgroundColor: bgColor }}
      className="px-2 py-1 rounded-full"
    >
      <Text 
        style={{ color: textColor }}
        className={`text-${size}`}
      >
        {line}
      </Text>
    </View>
  );
} 