/* K4 Gaye */
import { useAuth } from '../../context/AuthContext';
import { useBoard } from '../../context/BoardContext';
import styles from './Header.module.css';

export default function Header() {
  const { logout }    = useAuth();
  const { activeBoard } = useBoard();

  return (
    <header className={styles.header}>
      {/* Henüz hiç board seçilmemişse "TaskPro" yazsın, boş başlık görünmesin */}
      <h2 className={styles.boardTitle}>{activeBoard?.title ?? 'TaskPro'}</h2>
      <div className={styles.right}>
        {/* TODO Gaye: ThemeSelector, UserMenu, Filter button */}
        <button className={styles.logoutBtn} onClick={() => logout()}>
          Log out
        </button>
      </div>
    </header>
  );
}
