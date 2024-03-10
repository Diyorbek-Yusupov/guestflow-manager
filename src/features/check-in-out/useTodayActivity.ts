import { getStaysTodayActivity } from '@/services/apiBookings';
import { useQuery } from '@tanstack/react-query';

export function useTodayActivity() {
  const { data: todayActivity, isLoading } = useQuery({
    queryKey: ['today-activity'],
    queryFn: getStaysTodayActivity,
  });

  return { todayActivity, isLoading };
}
