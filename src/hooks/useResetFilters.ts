import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { resetFilters } from '@/store/features/trackSlice';

export const useResetFilters = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(resetFilters());
  }, [pathname, dispatch]);
};
