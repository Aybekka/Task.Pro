/* K6 Gülistan — temel portal bileşeni */
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, title, children }) {
  // Escape tuşuyla kapanmasını istedim, klavye kullanan biri için modal'dan çıkmak fare gerektirmemeli
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      {/* stopPropagation koymazsam overlay'e tıklama mantığı modal içine de sızıp her tıklamada kapatıyordu */}
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    // index.html'de #modal-root tanımlı ama yine de yoksa diye document.body'ye düşürüyorum
    document.getElementById('modal-root') ?? document.body
  );
}
