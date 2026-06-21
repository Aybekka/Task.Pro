import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthContext';
import { loginSchema } from './authSchemas';
import styles from './AuthPage.module.css';

function EyeIcon({ isVisible }) {
  return isVisible ? (
    <svg className={styles.visibilityIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg className={styles.visibilityIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3l18 18" />
      <path d="M4.5 8.5C7 5.5 9.5 4 12 4c6.5 0 10 8 10 8a20.1 20.1 0 0 1-3.8 5.2" />
      <path d="M9.5 9.5A3 3 0 0 1 14.5 14.5" />
      <path d="M6.3 6.3A19.4 19.4 0 0 0 2 12s3.5 6 10 6c1.4 0 2.7-.2 3.9-.5" />
    </svg>
  );
}

export default function LoginForm() {
  const { login, isLoading, error: authError } = useAuth();
  const [localError, setLocalError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(data) {
    setLocalError(null);
    try {
      await login({ email: data.email, password: data.password });
    } catch (err) {
      setLocalError(err.message);
    }
  }

  const error = localError || authError;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      {error && <p className={styles.error} aria-live="polite">{error}</p>}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="login-email">Email</label>
        <input
          id="login-email"
          {...field('email')}
          type="email"
          placeholder="Enter your email"
          className={styles.input}
          autoComplete="email"
        />
        {errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="login-password">Password</label>
        <div className={styles.passwordField}>
          <input
            id="login-password"
            {...field('password')}
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Confirm a password"
            className={`${styles.input} ${styles.passwordInput}`}
            autoComplete="current-password"
          />
          <button
            type="button"
            className={styles.visibilityBtn}
            onClick={() => setIsPasswordVisible(value => !value)}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isPasswordVisible}
          >
            <EyeIcon isVisible={isPasswordVisible} />
          </button>
        </div>
        {errors.password && <span className={styles.fieldError}>{errors.password.message}</span>}
      </div>

      <button type="submit" className={styles.btnSubmit} disabled={isLoading}>
        {isLoading ? 'Please wait…' : 'Log In Now'}
      </button>
    </form>
  );
}