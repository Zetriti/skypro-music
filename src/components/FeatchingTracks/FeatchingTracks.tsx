'use client';

import { getTracks, getFavoriteTracks } from '../services/tracks/tracksApi';
import {
  setAllTracks,
  setFeatchError,
  setFeatchIsLoading,
  setFavoriteTracks,
} from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

export default function FeatchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state) => state.tracks);
  const access = useAppSelector((state) => state.auth.access);

  useEffect(() => {
    if (allTracks.length === 0) {
      dispatch(setFeatchIsLoading(true));
      getTracks()
        .then((res) => {
          dispatch(setAllTracks(res));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              dispatch(setFeatchError(error.response.data));
            } else if (error.request) {
              dispatch(setFeatchError('Произошла ошибка. Попробуй позже'));
            } else {
              dispatch(setFeatchError('Неизвестная ошибка'));
            }
          }
        })
        .finally(() => {
          dispatch(setFeatchIsLoading(false));
        });
    } else {
      dispatch(setFeatchIsLoading(false));
    }
  }, [allTracks.length, dispatch]);

  useEffect(() => {
    if (access) {
      getFavoriteTracks(access)
        .then((favorites) => {
          dispatch(setFavoriteTracks(favorites));
        })
        .catch((error) => {
          console.error('Ошибка загрузки избранного:', error);
        });
    } else {
      dispatch(setFavoriteTracks([]));
    }
  }, [access, dispatch]);

  return null;
}
