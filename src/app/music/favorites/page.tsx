'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';

export default function FavoritesPage() {
  const { favoriteTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );

  return (
    <Centerblock
      tracks={favoriteTracks}
      loading={fetchIsLoading}
      errorRes={fetchError}
      title="Мой плейлист"
    />
  );
}
