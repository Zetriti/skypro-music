'use client';

import FilterItem from '../FilterItem/FilterItem';
import styles from './filter.module.css';
import { useState } from 'react';
import { TrackType } from '@/shearedTypes/shearedTypes';

interface FilterProps {
  tracks: TrackType[];
}

export default function Filter({ tracks }: FilterProps) {
  const [isOpen, setIsOpen] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  const onOpenDropdownList = (title: string) => {
    setIsOpen(title === isOpen ? '' : title);
    setActiveFilter(title);
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
      />
      <FilterItem
        title="году выпуска"
        onClick={() => onOpenDropdownList('году выпуска')}
        isOpen={isOpen === 'году выпуска'}
        activeFilter={activeFilter}
        tracks={tracks}
      />
      <FilterItem
        title="жанру"
        onClick={() => onOpenDropdownList('жанру')}
        isOpen={isOpen === 'жанру'}
        activeFilter={activeFilter}
        tracks={tracks}
      />
    </div>
  );
}
