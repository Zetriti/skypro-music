'use client';

import styles from './track.module.css';
import { formatTime } from '@/utils/helper';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlaylist,
  setCurrentTrack,
  setIsPlay,
} from '@/store/features/trackSlice';
import classNames from 'classnames';
import { TrackType } from '@/shearedTypes/shearedTypes';

interface TrackProps {
  tracks: TrackType[];
}

export default function Track({ tracks }: TrackProps) {
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const currentTrackId = useAppSelector(
    (state) => state.tracks.currentTrack?._id,
  );

  if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
    return <div className={styles.emptyMessage}>Нет доступных треков</div>;
  }

  return (
    <div className={styles.content__playlist}>
      {tracks.map((track) => (
        <div
          key={track._id}
          className={styles.playlist__item}
          onClick={() => {
            dispatch(setCurrentPlaylist(tracks)); // передаём весь массив
            if (currentTrack?._id === track._id) {
              dispatch(setIsPlay(!isPlay));
            } else {
              dispatch(setCurrentTrack(track));
              dispatch(setIsPlay(true));
            }
          }}
        >
          <div className={styles.playlist__track}>
            <div className={styles.track__title}>
              <div className={styles.track__titleImage}>
                <svg
                  className={classNames(styles.track__titleSvg, {
                    [styles.track__selected]:
                      currentTrack && currentTrackId === track._id,
                    [styles.track__active]:
                      isPlay === true && currentTrackId === track._id,
                  })}
                >
                  {currentTrackId !== track._id && (
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  )}
                </svg>
              </div>
              <div className="track__title-text">
                <Link className={styles.track__titleLink} href="">
                  {track.name}
                  <span className={styles.track__titleSpan}></span>
                </Link>
              </div>
            </div>
            <div className={styles.track__author}>
              <Link className={styles.track__authorLink} href="">
                {track.author}
              </Link>
            </div>
            <div className={styles.track__album}>
              <Link className={styles.track__albumLink} href="">
                {track.album}
              </Link>
            </div>
            <div className="track__time">
              <svg className={styles.track__timeSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
              </svg>
              <span className={styles.track__timeText}>
                {formatTime(track.duration_in_seconds)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
