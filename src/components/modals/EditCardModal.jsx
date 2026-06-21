import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { format, isToday, parseISO } from 'date-fns';
import Icon from '../Icon/Icon';
import Calendar from '../Calendar/Calendar';
import styles from './CardModal.module.css';

const PRIORITIES = [
  { value: 'low', color: '#8fa1d0' },
  { value: 'medium', color: '#e09cb5' },
  { value: 'high', color: '#bedbb0' },
  { value: 'without', color: 'var(--priority-without)' },
];

function formatDeadlineDisplay(dateString) {
  if (!dateString) return null;
  const date = parseISO(dateString);
  if (isToday(date)) {
    return `Today, ${format(date, 'MMMM d')}`;
  }
  return format(date, 'EEEE, MMMM d');
}

export default function EditCardModal({ card, onClose, onSubmit }) {
  const [title, setTitle] = useState(card.title || '');
  const [description, setDescription] = useState(card.description || '');
  const [priority, setPriority] = useState(card.priority || 'without');
  const [deadline, setDeadline] = useState(card.deadline || '');
  const [showCalendar, setShowCalendar] = useState(false);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

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
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      deadline: deadline || null,
    });
    onClose();
  };

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Edit card</h2>
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

          <textarea
            className={styles.textarea}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className={styles.section}>
            <p className={styles.label}>Label color</p>
            <div className={styles.priorities}>
              {PRIORITIES.map(p => (
                <button
                  key={p.value}
                  type="button"
                  className={`${styles.priorityBtn} ${priority === p.value ? styles.selected : ''}`}
                  style={{ background: p.color }}
                  onClick={() => setPriority(p.value)}
                  aria-label={p.value}
                />
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <p className={styles.label}>Deadline</p>
            <button
              type="button"
              className={deadline ? styles.deadlineValue : styles.deadlinePlaceholder}
              onClick={() => setShowCalendar(true)}
            >
              {deadline ? formatDeadlineDisplay(deadline) : 'Select a date'}
            </button>
          </div>

          <button type="submit" className={styles.submitBtn}>
            <span className={styles.submitPlus}>+</span>
            Edit
          </button>
        </form>
      </div>

      {showCalendar && (
        <Calendar
          value={deadline}
          minDate={today}
          onChange={(date) => setDeadline(date)}
          onClose={() => setShowCalendar(false)}
        />
      )}
    </div>,
    document.getElementById('modal-root')
  );
}
