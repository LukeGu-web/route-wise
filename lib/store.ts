import { create } from 'zustand';

// 定义城市类型
export type City = 'Sydney' | 'Melbourne' | 'Brisbane';

// 定义 store 的状态接口
interface CityState {
  // 当前选择的城市
  selectedCity: City;
  // 更改城市的方法
  setSelectedCity: (city: City) => void;
}

// 创建 store
export const useCityStore = create<CityState>((set) => ({
  // 初始状态
  selectedCity: 'Sydney',
  
  // 更改城市的方法
  setSelectedCity: (city) => set({ selectedCity: city }),
})); 