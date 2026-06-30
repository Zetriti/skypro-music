'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './navigation.module.css';
import { useState } from 'react';
import { useAppSelector } from '@/store/store';
import { useLogout } from '@/hooks/useLogout';

export default function Navigation() {
  const [isOpen, setOpen] = useState(false);
  const logout = useLogout();

  const access = useAppSelector((state) => state.auth.access);

  const goToLogin = () => {
    logout();
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Link href="/music/main">
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src="/img/logo.png"
            alt={'logo'}
          />
        </Link>
      </div>
      <div className={styles.nav__burger} onClick={() => setOpen(!isOpen)}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>

      <div className={`${styles.nav__menu} ${isOpen ? styles.active : ''}`}>
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href={'/music/main'} className={styles.menu__link}>
              Главное
            </Link>
          </li>

          {access && (
            <li className={styles.menu__item}>
              <Link href="/music/favorites" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
          )}

          <li className={styles.menu__item}>
            {access ? (
              <p onClick={logout} className={styles.menu__link}>
                Выйти
              </p>
            ) : (
              <p onClick={goToLogin} className={styles.menu__link}>
                Войти
              </p>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
