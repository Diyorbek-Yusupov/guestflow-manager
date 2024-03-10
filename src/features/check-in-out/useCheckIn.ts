import { updateBooking } from '@/services/apiBookings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface BreakfastPayload {
  hasBreakfast?: boolean;
  extrasPrice?: number;
  totalPrice?: number;
}

interface CheckinPayload {
  bookingId: number;
  breakfast: BreakfastPayload;
}

export function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: CheckinPayload) =>
      updateBooking(bookingId, {
        isPaid: true,
        status: 'checked-in',
        ...breakfast,
      }),
    onSuccess(data) {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ['booking'] });
      navigate('/');
    },
    onError(error) {
      toast.error('There was an error while checking in');
      console.error(error);
    },
  });

  return { checkIn, isCheckingIn };
}
