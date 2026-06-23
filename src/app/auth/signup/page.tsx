'use client';

import { AxiosError } from 'axios';
import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { regUser } from '@/components/services/auth/authApi';
import { translateError, translateErrorsArray } from '@/utils/errorMessages';

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameError('');
  };

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    setPasswordConfirmError('');
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setPasswordConfirmError('Пароли не совпадают');
      return;
    }

    if (!email.trim() || !password.trim() || !username.trim()) {
      setGeneralError('Все поля обязательны для заполнения');
      return;
    }

    setIsLoading(true);
    setGeneralError('');
    setEmailError('');
    setPasswordError('');
    setUsernameError('');
    setPasswordConfirmError('');

    try {
      const res = await regUser({ email, password, username });
      console.log('Успешная регистрация:', res);
      router.push('/auth/signin');
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const data = error.response.data;
        console.log('Ответ сервера:', data);

        const errors = data?.data?.errors;

        if (errors && typeof errors === 'object') {
          if (errors.email) {
            const translated = translateErrorsArray(
              Array.isArray(errors.email) ? errors.email : [errors.email],
            );
            setEmailError(translated.join(' '));
          }
          if (errors.password) {
            const translated = translateErrorsArray(
              Array.isArray(errors.password)
                ? errors.password
                : [errors.password],
            );
            setPasswordError(translated.join(' '));
          }
          if (errors.username) {
            const translated = translateErrorsArray(
              Array.isArray(errors.username)
                ? errors.username
                : [errors.username],
            );
            setUsernameError(translated.join(' '));
          }

          if (
            data.message &&
            !errors.email &&
            !errors.password &&
            !errors.username
          ) {
            setGeneralError(translateError(data.message));
          }
        } else {
          setGeneralError(translateError(data.message || 'Ошибка регистрации'));
        }
      } else {
        setGeneralError('Неизвестная ошибка');
      }
    } finally {
      setIsLoading(false);
    }
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
        placeholder="Почта"
        value={email}
        onChange={onChangeEmail}
      />
      {emailError && <div className={styles.errorField}>{emailError}</div>}

      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        placeholder="Логин"
        value={username}
        onChange={onChangeUsername}
      />
      {usernameError && (
        <div className={styles.errorField}>{usernameError}</div>
      )}

      <input
        className={styles.modal__input}
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={onChangePassword}
      />
      {passwordError && (
        <div className={styles.errorField}>{passwordError}</div>
      )}

      <input
        className={styles.modal__input}
        type="password"
        placeholder="Повторите пароль"
        value={passwordConfirm}
        onChange={onChangePasswordConfirm}
      />
      {passwordConfirmError && (
        <div className={styles.errorField}>{passwordConfirmError}</div>
      )}

      {generalError && (
        <div className={styles.errorContainer}>{generalError}</div>
      )}

      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnSignupEnt}
      >
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </>
  );
}
