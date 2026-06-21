import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon';
import styles from './ColumnModal.module.css';

export default function AddColumnModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    onSubmit({ title: title.trim() });
    onClose();
  };

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Add column</h2>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <Icon name="close" size={18} />
        </button>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(''); }}
            autoFocus
          />
          {error && <span className={styles.error}>{error}</span>}

          <button type="submit" className={styles.submitBtn}>
            <span className={styles.submitPlus}>+</span>
            Add
          </button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
