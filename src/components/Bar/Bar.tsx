'use client';

import Link from 'next/link';
import styles from './bar.module.css';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  setBackTrack,
  setIsPlay,
  setNextTrack,
  toggleShuffle,
} from '@/store/features/trackSlice';
import { getTimePanel } from '@/utils/helper';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useLikeTrack } from '@/hooks/useLikeTraks'; // импортируем хук

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const currentTrackName = useAppSelector(
    (state) => state.tracks.currentTrack?.name,
  );
  const currentTrackAuthor = useAppSelector(
    (state) => state.tracks.currentTrack?.author,
  );
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const dispatch = useAppDispatch();

  const { toggleLike, isLike } = useLikeTrack(currentTrack);

  const [isLoop, setIsLoop] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setvolume] = useState(0.5);
  const [isLoad, setIsLoad] = useState(false);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setIsPlay(true);
      setDuration(audioRef.current.duration);
      setIsLoad(true);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const isVolume = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setvolume(Number(e.target.value));
    if (audioRef.current) {
      audioRef.current.volume = Number(e.target.value) / 100;
    }
  };

  const onChahgeProgress = (
    e: React.ChangeEvent<HTMLInputElement, Element>,
  ) => {
    if (audioRef.current) {
      const inputTime = Number(e.target.value);
      audioRef.current.currentTime = inputTime;
    }
  };

  const nextTrack = () => {
    dispatch(setNextTrack());
    dispatch(setIsPlay(true));
  };

  const backTrack = () => {
    dispatch(setBackTrack());
    dispatch(setIsPlay(true));
  };

  const toggleShuffleTrack = () => {
    dispatch(toggleShuffle());
  };

  const onEndedTrack = () => {
    dispatch(setNextTrack());
    dispatch(setIsPlay(true));
  };

  useEffect(() => {
    if (audioRef.current && currentTrack && isPlay) {
      audioRef.current.play();
    } else if (audioRef.current && !isPlay) {
      audioRef.current.pause();
    }
  }, [currentTrack, isPlay]);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setIsLoad(false);
  }, [currentTrack]);

  if (!currentTrack) return <></>;

  const playPauseTrack = () => {
    if (isPlay === false) {
      if (audioRef.current) {
        audioRef.current.play();
        dispatch(setIsPlay(true));
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        dispatch(setIsPlay(false));
      }
    }
  };

  const onToggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const handleLikeClick = () => {
    toggleLike();
  };

  return (
    <div className={styles.bar}>
      <audio
        style={{ display: 'none' }}
        ref={audioRef}
        controls
        src={currentTrack?.track_file}
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEndedTrack}
      ></audio>
      <div className={styles.bar__content}>
        <ProgressBar
          max={duration || 0}
          step={0.1}
          readOnly={!isLoad}
          value={currentTime}
          onChange={onChahgeProgress}
        >
          <div className={styles.loadMasseg}>
            {!isLoad ? 'Трек загружается...' : <></>}
          </div>
          <div className={styles.timeDisplay}>
            {getTimePanel(currentTime, duration)}
          </div>
        </ProgressBar>

        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev}>
                <svg className={styles.player__btnPrevSvg} onClick={backTrack}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classnames(styles.player__btnPlay, styles.btn)}
                onClick={playPauseTrack}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={
                      isPlay
                        ? '/img/icon/sprite.svg#icon-pause'
                        : '/img/icon/sprite.svg#icon-play'
                    }
                  ></use>
                </svg>
              </div>
              <div className={styles.player__btnNext} onClick={nextTrack}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classnames(styles.player__btnRepeat, styles.btnIcon)}
                onClick={onToggleLoop}
              >
                <svg
                  className={classnames(styles.player__btnRepeatSvg, {
                    [styles.player__btnRepeatSvgActive]: isLoop,
                  })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat" />
                </svg>
              </div>
              <div
                className={classnames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
                onClick={toggleShuffleTrack}
              >
                <svg
                  className={classnames(styles.player__btnShuffleSvg, {
                    [styles.player__btnShuffleSvgActive]: isShuffle,
                  })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrackName}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrackAuthor}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__likeDis}>
                <div
                  className={classnames(styles.trackPlay__like, styles.btnIcon)}
                  onClick={handleLikeClick}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use
                      xlinkHref={`/img/icon/sprite.svg#${isLike ? 'icon-dislike' : 'icon-like'}`}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classnames(styles.volume__progress, styles.btn)}>
                <input
                  className={classnames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                  onChange={isVolume}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
