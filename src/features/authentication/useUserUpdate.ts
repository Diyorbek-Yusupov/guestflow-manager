import { updateCurrentUser } from '@/services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useUserUpdate() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess(res) {
      toast.success('User has been updated!');
      queryClient.setQueryData(['user'], res?.user);
    },
    onError(error) {
      toast.error(error.message);
      console.error(error);
    },
  });

  return { isUpdating, updateUser };
}
