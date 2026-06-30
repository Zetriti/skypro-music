'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { resetFilters } from '@/store/features/trackSlice';
import styles from './not-found.module.css';
import Navigation from '@/components/Navigation/Navigation';
import Search from '@/components/Search/Search';
import Bar from '@/components/Bar/Bar';
import FeatchingTracks from '@/components/FeatchingTracks/FeatchingTracks';
import { iseInitAuth } from '@/hooks/useInitAuth';
import { useResetFilters } from '@/hooks/useResetFilters';
import { useLogout } from '@/hooks/useLogout';

export default function NotFound() {
  iseInitAuth();
  useResetFilters();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('Гость');
  const logout = useLogout();

  useEffect(() => {
    dispatch(resetFilters());

    if (typeof window !== 'undefined') {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <FeatchingTracks />
          <Navigation />
          <div className={styles.centerblock}>
            <Search />
            <div className={styles.content}>
              <h1 className={styles.title}>404</h1>
              <div className={styles.subtitleWrapper}>
                <h2 className={styles.subtitle}>Страница не найдена</h2>
                <Image
                  src="/smile_crying.svg"
                  alt="crying smile"
                  width={40}
                  height={40}
                  className={styles.smile}
                />
              </div>
              <p className={styles.description}>
                Возможно, она была удалена
                <br />
                или переименована на другой адрес
              </p>
              <Link href="/music/main" className={styles.button}>
                Вернуться на главную
              </Link>
            </div>
          </div>
          <div className={styles.sidebarWithoutPlaylists}>
            <div className={styles.sidebarPersonal}>
              <p className={styles.sidebarPersonalName}>{username}</p>
              <div onClick={logout} className={styles.sidebar__icon}>
                <svg>
                  <use xlinkHref="/img/icon/sprite.svg#logout"></use>
                </svg>
              </div>
            </div>
          </div>
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
