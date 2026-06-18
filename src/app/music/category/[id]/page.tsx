'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { getSelect } from '@/components/services/tracks/tracksApi';
import { TrackType } from '@/shearedTypes/shearedTypes';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [title, setTitle] = useState('Треки');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('ID не указан');
      return;
    }

    getSelect(id)
      .then((res) => {
        setTracks(res.tracks);
        setTitle(res.name);
        setError('');
      })
      .catch((err) => {
        console.error('Ошибка загрузки:', err);
        if (err instanceof AxiosError) {
          if (err.response) {
            setError(err.response.data?.message || 'Ошибка сервера');
          } else if (err.request) {
            setError('Пропал интернет');
          } else {
            setError('Неизвестная ошибка');
          }
        } else {
          setError('Произошла ошибка при загрузке');
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (error) {
    return (
      <div style={{ color: 'white', padding: '20px' }}>Ошибка: {error}</div>
    );
  }

  return <Centerblock tracks={tracks} title={title} loading={loading} />;
}
