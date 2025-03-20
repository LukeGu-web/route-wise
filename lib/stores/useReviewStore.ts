import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StoreReview from 'expo-store-review';

interface ReviewState {
  hasReviewed: boolean;
  usageCount: number;
  incrementUsageCount: () => void;
  setHasReviewed: (value: boolean) => void;
  checkAndRequestReview: () => Promise<void>;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    devtools((set, get) => ({
      hasReviewed: false,
      usageCount: 0,
      incrementUsageCount: () => {
        const currentCount = get().usageCount;
        set({ usageCount: currentCount + 1 });
      },
      setHasReviewed: (value) => set({ hasReviewed: value }),
      checkAndRequestReview: async () => {
        try {
          const { hasReviewed, usageCount } = get();
          
          // 如果已经评分过或使用次数不足5次，则不弹出
          if (hasReviewed || usageCount < 5) {
            return;
          }

          // 检查是否支持评分功能
          const isAvailable = await StoreReview.isAvailableAsync();
          if (!isAvailable) {
            return;
          }

          // 检查是否可以执行评分操作
          const hasAction = await StoreReview.hasAction();
          if (hasAction) {
            await StoreReview.requestReview();
            // 标记用户已经看到评分界面
            set({ hasReviewed: true });
          }
        } catch (error) {
          console.error('Failed to handle auto review:', error);
        }
      },
    })),
    {
      name: 'review-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 