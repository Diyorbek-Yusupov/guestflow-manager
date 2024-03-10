import { updateBooking } from '@/services/apiBookings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface CheckOutPayload {
  bookingId: number;
}

export function useCheckOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId }: CheckOutPayload) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess(data) {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ['booking'] });
      navigate('/');
    },
    onError(error) {
      toast.error('There was an error while checking out');
      console.error(error);
    },
  });

  return { checkOut, isCheckingOut };
}
