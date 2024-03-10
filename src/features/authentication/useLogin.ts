import { login as loginService } from '@/services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isLogginIn, mutate: login } = useMutation({
    mutationFn: loginService,
    onSuccess(user) {
      queryClient.setQueryData(['user'], user.user);
      toast.success('Login successfully');
      navigate('/', { replace: true });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { isLogginIn, login };
}

// 17
