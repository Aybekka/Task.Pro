/* K3 Burak */
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBoard } from '../../context/BoardContext';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { boards, activeBoardId, setActiveBoardId } = useBoard();

  function selectBoard(board) {
    // Hem context'teki activeBoardId'yi hem URL'yi güncelliyorum, çünkü ScreensPage
    // boardId'yi URL'den okuyor — sadece context'i değiştirsem adres çubuğu yalan söylerdi
    setActiveBoardId(board.id);
    navigate(`/home/${board.id}`);
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <p className={styles.logo}>TaskPro</p>
        <p className={styles.sectionTitle}>My boards</p>
        <nav className={styles.boardList}>
          {boards.map(board => (
            <button
              key={board.id}
              className={`${styles.boardItem} ${activeBoardId === board.id ? styles.active : ''}`}
              onClick={() => selectBoard(board)}
            >
              <span className={styles.boardName}>{board.title}</span>
            </button>
          ))}
        </nav>
        {/* TODO Burak: + Create new board → BoardModal */}
        <button className={styles.addBtn}>+ Create new board</button>
      </div>

      <div className={styles.bottom}>
        {/* TODO Burak: Help & Feedback */}
        <p className={styles.userName}>{user?.name}</p>
        <button className={styles.logoutBtn} onClick={() => logout()}>
          Log out
        </button>
      </div>
    </aside>
  );
}
