/* K2 Gizemnur */
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthContext';
import { loginSchema, registerSchema } from '../../utils/validationSchemas';
import styles from './AuthPage.module.css';

export default function AuthPage() {
  const { mode }  = useParams();
  // mode 'register' değilse login kabul ediyorum, böylece bilinmeyen bir mode geldiğinde
  // sayfa patlamak yerine login formuna düşüyor
  const isLogin   = mode !== 'register';
  const navigate  = useNavigate();
  const { login, register: registerUser, isLoading, error: authError } = useAuth();
  const [localError, setLocalError] = useState(null);

  const { register: field, handleSubmit, formState: { errors } } = useForm({
    // Login ve register için ayrı Yup şeması seçiyorum, çünkü register'da confirmPassword gibi ekstra alanlar var
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  async function onSubmit(data) {
    setLocalError(null);
    // Redux thunk'ta dispatch sonucunu meta.requestStatus ile kontrol ediyorduk,
    // Context tarafına geçince login/register artık başarısızlıkta throw ediyor,
    // o yüzden try/catch ile aynı akışı sağlıyorum
    try {
      if (isLogin) {
        await login({ email: data.email, password: data.password });
      } else {
        await registerUser({ name: data.name, email: data.email, password: data.password });
      }
      navigate('/home');
    } catch (err) {
      setLocalError(err.message);
    }
  }

  // localError'u öncelikli gösteriyorum, çünkü kullanıcı yeni bir submit denediğinde
  // eski context hatası ekranda asılı kalmasın
  const error = localError || authError;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>{isLogin ? 'Log In' : 'Register'}</h2>
        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
          {!isLogin && (
            <div className={styles.field}>
              <input {...field('name')} type="text" placeholder="Enter your name" className={styles.input} />
              {errors.name && <span className={styles.fieldError}>{errors.name.message}</span>}
            </div>
          )}
          <div className={styles.field}>
            <input {...field('email')} type="email" placeholder="Enter your email" className={styles.input} />
            {errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
          </div>
          <div className={styles.field}>
            <input {...field('password')} type="password" placeholder="Password" className={styles.input} />
            {errors.password && <span className={styles.fieldError}>{errors.password.message}</span>}
          </div>
          {!isLogin && (
            <div className={styles.field}>
              <input {...field('confirmPassword')} type="password" placeholder="Confirm password" className={styles.input} />
              {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword.message}</span>}
            </div>
          )}
          <button type="submit" className={styles.btnSubmit} disabled={isLoading}>
            {isLoading ? 'Please wait…' : isLogin ? 'Log In Now' : 'Register Now'}
          </button>
        </form>

        <p className={styles.toggle}>
          {isLogin
            ? <><span>Need an account? </span><Link to="/auth/register">Register</Link></>
            : <><span>Already have an account? </span><Link to="/auth/login">Log In</Link></>
          }
        </p>
      </div>
    </div>
  );
}
