import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthContext';
import { registerSchema } from './authSchemas';
import styles from './AuthPage.module.css';

export default function RegisterForm() {
  const { register: registerUser, isLoading, error: authError } = useAuth();
  const [localError, setLocalError] = useState(null);

  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  async function onSubmit(data) {
    setLocalError(null);
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      setLocalError(err.message);
    }
  }

  const error = localError || authError;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      {error && <p className={styles.error} aria-live="polite">{error}</p>}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="register-name">Name</label>
        <input
          id="register-name"
          {...field('name')}
          type="text"
          placeholder="Enter your name"
          className={styles.input}
          autoComplete="name"
        />
        {errors.name && <span className={styles.fieldError}>{errors.name.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="register-email">Email</label>
        <input
          id="register-email"
          {...field('email')}
          type="email"
          placeholder="Enter your email"
          className={styles.input}
          autoComplete="email"
        />
        {errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="register-password">Password</label>
        <input
          id="register-password"
          {...field('password')}
          type="password"
          placeholder="Create a password"
          className={styles.input}
          autoComplete="new-password"
        />
        {errors.password && <span className={styles.fieldError}>{errors.password.message}</span>}
      </div>

    

    <button type="submit" className={styles.btnSubmit} disabled={isLoading}>
        {isLoading ? 'Please wait…' : 'Register Now'}
      </button>
    </form>
  );
}

