'use client';

import classnames from 'classnames';
import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Track from '../Track/Track';
import { TrackType } from '@/shearedTypes/shearedTypes';
import { useEffect } from 'react';
import { setPagePlaylist } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

interface CenterblockProps {
  errorRes: string | null;
  tracks: TrackType[];
  title?: string;
  loading?: boolean;
  pagePlaylist: TrackType[];
}

export default function Centerblock({
  errorRes,
  tracks,
  title = '',
  loading = false,
  pagePlaylist,
}: CenterblockProps) {
  const dispatch = useAppDispatch();
  const { filteredTracks, filters } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    if (!loading && !errorRes) {
      dispatch(setPagePlaylist(pagePlaylist));
    }
  }, [loading, errorRes, pagePlaylist, dispatch]);

  const hasFilters =
    filters.authors.length > 0 ||
    filters.genres.length > 0 ||
    filters.years !== 'По умолчанию' ||
    filters.searchString.trim() !== '';

  const displayTracks = hasFilters ? filteredTracks : tracks;

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={pagePlaylist} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classnames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        {errorRes ? (
          <div className={styles.errorMessage}>{errorRes}</div>
        ) : loading ? (
          <div className={styles.loadingMessage}>Загрузка...</div>
        ) : displayTracks.length === 0 ? (
          <div className={styles.loadingMessage}>
            {filters.searchString ? 'Ничего не найдено' : 'Нет треков'}
          </div>
        ) : (
          displayTracks.map((track) => (
            <Track key={track._id} track={track} tracks={displayTracks} />
          ))
        )}
      </div>
    </div>
  );
}
