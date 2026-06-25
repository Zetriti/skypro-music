'use client';

import { addLike, removeLike } from '@/components/services/tracks/tracksApi';
import { TrackType } from '@/shearedTypes/shearedTypes';
import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { withReauth } from '@/utils/withReAuth';
import { useState } from 'react';

type returnTypeHook = {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: () => void;
  isLike: boolean;
};

export const useLikeTrack = (track: TrackType | null): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isLike = favoriteTracks.some((t) => t._id === track?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = () => {
    if (isLoading) return;

    if (!access) {
      return setErrorMsg('Нет авторизации');
    }

    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setIsLoading(true);
    setErrorMsg(null);
    if (track) {
      withReauth(
        (newToken) => actionApi(newToken || access, track._id),
        refresh,
        dispatch,
      )
        .then(() => {
          dispatch(actionSlice(track));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return {
    isLoading,
    errorMsg,
    toggleLike,
    isLike,
  };
};
