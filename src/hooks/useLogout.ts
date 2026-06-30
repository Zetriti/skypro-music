import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { clearUser } from '@/store/features/authSlice';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = () => {
    dispatch(clearUser());
    router.push('/auth/signin');
  };

  return logout;
};
