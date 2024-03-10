import { deleteBooking as deleteBookingService } from '@/services/apiBookings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId: number) => deleteBookingService(bookingId),
    onSuccess: (_, bookignId) => {
      toast.success(`#${bookignId} booking has been deleted`);
      queryClient.invalidateQueries({ queryKey: ['booking'] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteBooking };
}

export default useDeleteBooking;
