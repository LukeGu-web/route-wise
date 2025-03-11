import { useQuery } from '@tanstack/react-query';
import { routesApi, RouteResponse } from '~/lib/api';

interface UseRoutesParams {
  origin: string;
  destination: string;
  date: Date;
  city?: string;
  enabled?: boolean;
}

export function useRoutes({
  origin,
  destination,
  date,
  city,
  enabled = true
}: UseRoutesParams) {
  return useQuery({
    queryKey: ['routes', origin, destination, date.toISOString(), city],
    queryFn: () => routesApi.getRoutes({
      origin,
      destination,
      date: date.toISOString(),
      city
    }),
    enabled: enabled && !!origin && !!destination, // 只有当有起点和终点时才启用查询
  });
}

export function useRouteDetails(routeId: string, enabled = true) {
  return useQuery({
    queryKey: ['route', routeId],
    queryFn: () => routesApi.getRouteDetails(routeId),
    enabled: enabled && !!routeId, // 只有当有路线 ID 时才启用查询
  });
} 