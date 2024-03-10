import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBooking } from '@/services/apiBookings';

function useBooking() {
  const { bookingId } = useParams();

  const id = Number(bookingId);
  const { data, isLoading } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBooking(id),
  });

  return { data, isLoading };
}

export default useBooking;
