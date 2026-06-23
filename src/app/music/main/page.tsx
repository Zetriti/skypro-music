'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
    (state) => state.tracks,
  );

  return (
    <>
      <Centerblock
        tracks={allTracks}
        loading={fetchIsLoading}
        errorRes={fetchError}
        title="Треки"
      />
    </>
  );
}
