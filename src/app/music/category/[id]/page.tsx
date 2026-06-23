'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { getSelect } from '@/components/services/tracks/tracksApi';
import { TrackType } from '@/shearedTypes/shearedTypes';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useAppSelector } from '@/store/store';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { allTracks, fetchIsLoading } = useAppSelector((state) => state.tracks);
  const [isLoading, setIsLoading] = useState(true);
  const [errorRes, setErrorRes] = useState<string | null>(null);
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [title, setTitle] = useState('');
  const [trackIds, setTrackIds] = useState<number[] | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setErrorRes(null);

    getSelect(id)
      .then(({ name, trackIds }) => {
        setTitle(name);
        setTrackIds(trackIds);
      })
      .catch((error) => {
        if (error instanceof AxiosError)
          if (error.response) {
            setErrorRes(error.response.data);
          } else if (error.request) {
            setErrorRes('Ошибка выдачи');
          }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (trackIds && allTracks.length > 0) {
      const filtered = allTracks.filter((track) =>
        trackIds.includes(track._id),
      );
      setTracks(filtered);
    }
  }, [trackIds, allTracks]);

  return (
    <>
      <Centerblock
        tracks={tracks}
        loading={isLoading}
        errorRes={errorRes}
        title={title}
      />
    </>
  );
}
