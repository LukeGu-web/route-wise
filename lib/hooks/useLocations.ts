import { useQuery } from '@tanstack/react-query';
import { locationsApi } from '~/lib/api';

export function useLocationSuggestions(query: string, city?: string) {
  return useQuery({
    queryKey: ['locationSuggestions', query, city],
    queryFn: () => locationsApi.getLocationSuggestions(query, city),
    enabled: query.length > 1, // 只有当查询字符串长度大于 1 时才启用查询
    staleTime: 1000 * 60 * 10, // 10 分钟内不重新获取数据
  });
} 