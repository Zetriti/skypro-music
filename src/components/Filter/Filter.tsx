'use client';

import FilterItem from '../FilterItem/FilterItem';
import styles from './filter.module.css';
import { useState } from 'react';
import { TrackType } from '@/shearedTypes/shearedTypes';
import { useAppDispatch } from '@/store/store';
import {
  setFilterAuthors,
  setFilterGenre,
  setFilterYears,
} from '@/store/features/trackSlice';
import { data } from '@/data';

interface FilterProps {
  tracks: TrackType[];
}

export default function Filter({ tracks }: FilterProps) {
  const [isOpen, setIsOpen] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const dispatch = useAppDispatch();

  const onOpenDropdownList = (title: string) => {
    setIsOpen(title === isOpen ? '' : title);
    setActiveFilter(title);
  };

  const onSelectAuthor = (author: string) => {
    dispatch(setFilterAuthors(author));
  };

  const onSelectGenre = (genres: string) => {
    dispatch(setFilterGenre(genres));
  };

  const onSelectYear = (year: string) => {
    dispatch(setFilterYears(year));
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <FilterItem
        title="исполнителю"
        onClick={() => onOpenDropdownList('исполнителю')}
        isOpen={isOpen === 'исполнителю'}
        activeFilter={activeFilter}
        tracks={tracks}
        onSelect={onSelectAuthor}
      />
      <FilterItem
        title="году выпуска"
        onClick={() => onOpenDropdownList('году выпуска')}
        isOpen={isOpen === 'году выпуска'}
        activeFilter={activeFilter}
        tracks={tracks}
        onSelect={onSelectYear}
      />
      <FilterItem
        title="жанру"
        onClick={() => onOpenDropdownList('жанру')}
        isOpen={isOpen === 'жанру'}
        activeFilter={activeFilter}
        tracks={tracks}
        onSelect={onSelectGenre}
      />
    </div>
  );
}
