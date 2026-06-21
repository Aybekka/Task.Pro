
/* K2 Gizemnur */
import { Link, Navigate, useParams } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import styles from './AuthPage.module.css';

const AUTH_MODES = new Set(['login', 'register']);

export default function AuthPage() {
  const { id } = useParams();

  if (!AUTH_MODES.has(id)) {
    return <Navigate to="/auth/login" replace />;
  }

  const isLogin = id === 'login';

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.kicker}></p>
          <h1 className={styles.title}></h1>
          <p className={styles.description}>
           
             
          </p>
        </div>

        <div className={styles.tabs} aria-label="Authentication mode">
          <Link to="/auth/login" className={`${styles.tab} ${isLogin ? styles.tabActive : ''}`}>
            Log In
          </Link>
          <Link to="/auth/register" className={`${styles.tab} ${!isLogin ? styles.tabActive : ''}`}>
            Register
          </Link>
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
