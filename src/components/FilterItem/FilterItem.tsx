'use client';

import classNames from 'classnames';
import styles from './filterItem.module.css';
import { getUniqueValuesByKey } from '@/utils/helper';
import { TrackType } from '@/shearedTypes/shearedTypes';
import { useAppSelector } from '@/store/store';

type TitleItemProp = {
  title: string;
  onClick: () => void;
  isOpen: boolean;
  activeFilter: string;
  tracks: TrackType[];
  onSelect: (value: string) => void;
};

export default function FilterItem({
  title,
  onClick,
  isOpen,
  activeFilter,
  tracks,
  onSelect,
}: TitleItemProp) {
  const selectedAuthor = useAppSelector(
    (state) => state.tracks.filters.authors,
  );
  const selectedYear = useAppSelector((state) => state.tracks.filters.years);
  const selectedGenre = useAppSelector((state) => state.tracks.filters.genres);

  const uniqueAuthors = getUniqueValuesByKey(tracks, 'author');
  const uniqueGenres = getUniqueValuesByKey(tracks, 'genre');

  const uniqueReleaseYears = [
    'По умолчанию',
    'Сначала новые',
    'Сначала старые',
  ];

  const getSelectedCount = () => {
    if (title === 'исполнителю') {
      return selectedAuthor.length;
    }
    if (title === 'жанру') {
      return selectedGenre.length;
    }
    if (title === 'году выпуска') {
      return selectedYear && selectedYear !== 'По умолчанию' ? 1 : 0;
    }
    return 0;
  };

  const selectedCount = getSelectedCount();

  return (
    <div
      className={classNames(styles.filter__button, {
        [styles.active]: activeFilter === title || selectedCount > 0,
        [styles.hasSelected]: selectedCount > 0,
      })}
      onClick={onClick}
    >
      {title}
      {selectedCount > 0 && (
        <span className={styles.filter__badge}>{selectedCount}</span>
      )}
      {isOpen && (
        <div className={styles.filter__wrapper}>
          <ul className={styles.filter__list}>
            {title === 'исполнителю' &&
              uniqueAuthors.map((author) => (
                <li
                  className={classNames(styles.filter__item, {
                    [styles.filter__item_selected]:
                      selectedAuthor.includes(author),
                  })}
                  key={author}
                  onClick={() => onSelect(author)}
                >
                  {author}
                </li>
              ))}

            {title === 'году выпуска' &&
              uniqueReleaseYears.map((year) => (
                <li
                  className={classNames(styles.filter__item, {
                    [styles.filter__item_selected]: selectedYear.includes(year),
                  })}
                  key={year}
                  onClick={() => onSelect(year)}
                >
                  {year}
                </li>
              ))}

            {title === 'жанру' &&
              uniqueGenres.map((genre) => (
                <li
                  className={classNames(styles.filter__item, {
                    [styles.filter__item_selected]:
                      selectedGenre.includes(genre),
                  })}
                  key={genre}
                  onClick={() => onSelect(genre)}
                >
                  {genre}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
