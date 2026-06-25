'use client';

import { authUser, getTokens } from '@/components/services/auth/authApi';
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import {
  setAccessToken,
  setRefreshToken,
  setUsername,
} from '@/store/features/authSlice';

export default function Signin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMassage, setErrorMassage] = useState('');
  const [isLoading, setIsLoadind] = useState(false);

  const onChangeEmail = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      return setErrorMassage('Заполните все поля');
    }

    setIsLoadind(true);
    authUser({ email, password })
      .then(() => {
        dispatch(setUsername(email));
        return getTokens({ email, password });
      })
      .then((res) => {
        dispatch(setAccessToken(res.access));
        dispatch(setRefreshToken(res.refresh));
        router.push('/music/main');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMassage(error.response.data.message);
          } else if (error.request) {
            setErrorMassage('Пропал интернет');
          } else {
            setErrorMassage('Неизвестная ошибка ');
          }
        }
      })
      .finally(() => {
        setIsLoadind(false);
      });
  };
  return (
    <>
      <Link href={'/music/main'}>
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}>{errorMassage}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnEnter}
      >
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
