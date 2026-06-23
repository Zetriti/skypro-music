'use client';

import classNames from 'classnames';
import styles from './filterItem.module.css';
import { getUniqueValuesByKey } from '@/utils/helper';
import { TrackType } from '@/shearedTypes/shearedTypes';

type TitleItemProp = {
  title: string;
  onClick: () => void;
  isOpen: boolean;
  activeFilter: string;
  tracks: TrackType[];
};

export default function FilterItem({
  title,
  onClick,
  isOpen,
  activeFilter,
  tracks,
}: TitleItemProp) {
  const uniqueAuthors = getUniqueValuesByKey(tracks, 'author');
  const uniqueGenres = getUniqueValuesByKey(tracks, 'genre');

  const uniqueReleaseYears = [
    'По умолчанию',
    'Сначала новые',
    'Сначала старые',
  ];

  return (
    <div
      className={
        isOpen
          ? classNames(styles.filter__button, {
              [styles.active]: activeFilter === title,
            })
          : styles.filter__button
      }
      onClick={onClick}
    >
      {title}
      {isOpen && (
        <div className={styles.filter__wrapper}>
          <ul className={styles.filter__list}>
            {title === 'исполнителю' &&
              uniqueAuthors.map((author) => (
                <li className={styles.filter__item} key={author}>
                  {author}
                </li>
              ))}

            {title === 'году выпуска' &&
              uniqueReleaseYears.map((year) => (
                <li className={styles.filter__item} key={year}>
                  {year}
                </li>
              ))}

            {title === 'жанру' &&
              uniqueGenres.map((genre) => (
                <li className={styles.filter__item} key={genre}>
                  {genre}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
