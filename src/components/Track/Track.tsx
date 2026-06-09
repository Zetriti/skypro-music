'use client';

import { data } from '@/data';
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

export default function Track() {
  const dispatch = useAppDispatch();

  const isPlay = useAppSelector((state) => state.tracks.isPlay);

  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);

  const currentTrackId = useAppSelector(
    (state) => state.tracks.currentTrack?._id,
  );

  return (
    <div className={styles.content__playlist}>
      {data.map((track) => (
        <div
          key={track._id}
          className={styles.playlist__item}
          onClick={() => {
            dispatch(setCurrentPlaylist(data));
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
