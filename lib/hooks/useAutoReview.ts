import { useEffect } from 'react';
import { useReviewStore } from '~/lib/stores/useReviewStore';

export function useAutoReview() {
  const { incrementUsageCount, checkAndRequestReview } = useReviewStore();

  useEffect(() => {
    // 增加使用次数
    incrementUsageCount();

    // 等待1分钟后检查是否需要弹出评分界面
    const timer = setTimeout(() => {
      checkAndRequestReview();
    }, 60000);

    return () => clearTimeout(timer);
  }, []);
} 