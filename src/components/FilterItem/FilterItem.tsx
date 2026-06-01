'use client';

import classNames from 'classnames';
import styles from './filterItem.module.css';
import { data } from '@/data';
import { getUniqueValuesByKey } from '@/utils/helper';

type titleItemProp = {
  title: string;
  onClick: () => void;
  isOpen: boolean;
  activeFilter: string;
};

export default function FilterItem({
  title,
  onClick,
  isOpen,
  activeFilter,
}: titleItemProp) {
  const uniqueAuthors = getUniqueValuesByKey(data, 'author');

  const uniqueReleaseYears = [
    'По умолчанию',
    'Сначала новые',
    'Сначала старые',
  ];

  const uniqueGenres = getUniqueValuesByKey(data, 'genre');

  return (
    <>
      <div
        className={
          isOpen
            ? classNames(styles.filter__button, {
                [styles.active]: activeFilter === title,
              })
            : styles.filter__button
        }
        onClick={() => onClick()}
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
    </>
  );
}
