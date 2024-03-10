import { updateSetting as updateSettingApi } from '@/services/apiSettings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Settings updated');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  return { isUpdating, updateSettings };
}
