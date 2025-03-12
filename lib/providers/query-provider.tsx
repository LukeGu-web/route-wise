import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 创建一个 QueryClient 实例
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 默认配置
      staleTime: 1000 * 60 * 5, // 数据 5 分钟内被视为新鲜
      gcTime: 1000 * 60 * 30, // 数据在缓存中保留 30 分钟
      retry: 1, // 失败时重试 1 次
      refetchOnWindowFocus: false, // 窗口获得焦点时不重新获取数据
    },
  },
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
} 