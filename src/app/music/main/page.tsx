'use client';

import styles from './page.module.css';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect, useState } from 'react';
import { getTracks } from '@/components/services/tracks/tracksApi';
import { TrackType } from '@/shearedTypes/shearedTypes';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTracks()
      .then((res) => {
        setTracks(res);
        setError('');
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          if (err.response) {
            setError(err.response.data?.message || 'Ошибка сервера');
          } else if (err.request) {
            setError('Пропал интернет');
          } else {
            setError('Неизвестная ошибка');
          }
        } else {
          setError('Произошла ошибка');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <div className={styles.errorContainer}>Ошибка: {error}</div>;
  }

  return <Centerblock tracks={tracks} loading={loading} />;
}
