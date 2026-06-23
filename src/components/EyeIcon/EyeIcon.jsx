import styles from './AuthPage.module.css';

export default function EyeIcon({ isVisible }) {
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
