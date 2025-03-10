import { create } from 'zustand';

// 定义城市类型
export type CityName = 'Sydney' | 'Melbourne' | 'Brisbane';

// 定义城市信息接口
export interface CityInfo {
  name: CityName;
  label: string;
  isAvailable: boolean;
}

// 定义 store 的状态接口
interface CityState {
  // 城市列表
  cities: CityInfo[];
  // 当前选择的城市
  selectedCity: CityName;
  // 更改城市的方法
  setSelectedCity: (city: CityName) => void;
}

// 创建 store
export const useCityStore = create<CityState>((set) => ({
  // 城市列表
  cities: [
    { name: 'Sydney', label: 'Sydney', isAvailable: true },
    { name: 'Melbourne', label: 'Melbourne (coming soon)', isAvailable: false },
    { name: 'Brisbane', label: 'Brisbane (coming soon)', isAvailable: false },
  ],
  
  // 初始状态
  selectedCity: 'Sydney',
  
  // 更改城市的方法
  setSelectedCity: (city) => set({ selectedCity: city }),
})); 