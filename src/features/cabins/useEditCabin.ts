import toast from 'react-hot-toast';
import { createEditCabin } from '@/services/apiCabins';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ICabinPayload } from '@/type';

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ payload, id }: { payload: ICabinPayload; id: number }) =>
      createEditCabin(payload, id),
    onSuccess: () => {
      toast.success('Cabin has been edited');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabin, isEditing };
}
