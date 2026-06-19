/* K5 Oğulcan */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBoard } from '../../context/BoardContext';
import styles from './ScreensPage.module.css';

export default function ScreensPage() {
  // boardId'yi App.jsx'teki nested route'tan (/home/:boardId) okuyorum;
  // bu component artık <Outlet/> üzerinden render edildiği için useParams burada çalışıyor
  const { boardId } = useParams();
  const { boards, activeBoard, setActiveBoardId, addColumn } = useBoard();

  // URL'de boardId varsa onu aktif yap, yoksa (sadece /home'a girildiyse) ilk board'a düş
  useEffect(() => {
    if (boardId) {
      setActiveBoardId(boardId);
    } else if (boards.length > 0) {
      setActiveBoardId(boards[0].id);
    }
  }, [boardId, boards, setActiveBoardId]);

  if (!activeBoard) {
    return (
      <div className={styles.empty}>
        <p>No board selected. Create a board from the sidebar.</p>
      </div>
    );
  }

  return (
    <div className={styles.board}>
      {activeBoard.columns.map(column => (
        <div key={column.id} className={styles.column}>
          <div className={styles.columnHeader}>
            <h3 className={styles.columnTitle}>{column.title}</h3>
            {/* TODO Oğulcan: edit/delete column actions */}
          </div>
          <div className={styles.cards}>
            {column.cards.map(card => (
              <div key={card.id} className={styles.card}>
                <p className={styles.cardTitle}>{card.title}</p>
                {card.description && (
                  <p className={styles.cardDesc}>{card.description}</p>
                )}
                <div className={styles.cardMeta}>
                  {/* Önceliği renkli bir nokta olarak gösteriyorum, CSS değişkeni priority değerine göre değişiyor */}
                  <span
                    className={styles.priority}
                    style={{ background: `var(--priority-${card.priority})` }}
                  />
                  {card.deadline && (
                    <span className={styles.deadline}>{card.deadline}</span>
                  )}
                </div>
                {/* TODO Oğulcan: card action icons (edit, delete, move) */}
              </div>
            ))}
          </div>
          {/* TODO Oğulcan: + Add a card → CardModal */}
          <button className={styles.addCardBtn}>+ Add a card</button>
        </div>
      ))}

      {/* TODO Oğulcan: + Add another column → ColumnModal */}
      <button
        className={styles.addColBtn}
        onClick={() => addColumn(activeBoard.id, { title: 'New Column' })}
      >
        + Add another column
      </button>
    </div>
  );
}
