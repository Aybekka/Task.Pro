/* K2 Gizemnur */
import { Link } from 'react-router-dom';
import styles from './WelcomePage.module.css';
import avatarImg from '../../assets/welcome-avatar.png';

export default function WelcomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <img src={avatarImg} alt="User Avatar" className={styles.avatar} />
        
        <div className={styles.logoWrapper}>
          <div className={styles.logoIcon}>
          
            <svg className="icon icon-Vector-1">
              <use href="/symbol-defs.svg#icon-Vector-1" xlinkHref="/symbol-defs.svg#icon-Vector-1"></use>
            </svg>
          </div>
          <h1 className={styles.logo}>Task Pro</h1>
        </div>
        
        <p className={styles.tagline}>
          Supercharge your productivity and take control of your tasks with Task Pro - Don't wait, start achieving your goals now!
        </p>

        <div className={styles.actions}>
          <Link to="/auth/register" className={styles.btnPrimary}>
            Registration
          </Link>
          <Link to="/auth/login" className={styles.btnLink}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}