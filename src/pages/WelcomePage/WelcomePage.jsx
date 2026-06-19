/* K2 Gizemnur */
import { Link } from 'react-router-dom';
import styles from './WelcomePage.module.css';

export default function WelcomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.logo}>TaskPro</h1>
        <p className={styles.tagline}>
          Supercharge your productivity and manage your tasks like a Pro!
        </p>
        <div className={styles.actions}>
          <Link to="/auth/login"    className={styles.btnPrimary}>Log In</Link>
          <Link to="/auth/register" className={styles.btnSecondary}>Register</Link>
        </div>
        {/* Demo bilgilerini burada gösteriyorum ki herkes kendi hesabını açmak zorunda kalmadan hızlıca deneyebilsin */}
        <p className={styles.note}>
          Demo: <strong>demo@taskpro.com</strong> / <strong>Demo1234</strong>
        </p>
      </div>
    </div>
  );
}
