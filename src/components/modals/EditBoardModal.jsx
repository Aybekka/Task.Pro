import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useBoard } from '../../context/BoardContext';
import Modal from './Modal';
import styles from './FormModal.module.css';

const ICONS = ['icon-project', 'icon-star', 'icon-loading', 'icon-puzzle', 'icon-container', 'icon-lightning', 'icon-colors', 'icon-hexagon'];
const ICON_EMOJIS = { 'icon-project': '🗂️', 'icon-star': '⭐', 'icon-loading': '🔄', 'icon-puzzle': '🧩', 'icon-container': '📦', 'icon-lightning': '⚡', 'icon-colors': '🎨', 'icon-hexagon': '⬡' };
const BACKGROUNDS = ['', '/bg/bg1.svg', '/bg/bg2.svg', '/bg/bg3.svg', '/bg/bg4.svg', '/bg/bg5.svg'];

const schema = yup.object({ title: yup.string().required('Title is required') });

const EditBoardModal = ({ board, onClose }) => {
    const { updateBoard } = useBoard();

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { title: board.title, icon: board.icon, background: board.background },
    });

    const selectedIcon = watch('icon');
    const selectedBg = watch('background');

    const onSubmit = async (data) => {
        await updateBoard(board.id, data);
        onClose();
    };

    return (
        <Modal title="Edit board" onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.field}>
                    <input className={`${styles.input} ${errors.title ? styles.inputError : ''}`} {...register('title')} />
                    {errors.title && <span className={styles.error}>{errors.title.message}</span>}
                </div>

                <div className={styles.section}>
                    <p className={styles.sectionLabel}>Icons</p>
                    <div className={styles.iconGrid}>
                        {ICONS.map((icon) => (
                            <button key={icon} type="button" className={`${styles.iconBtn} ${selectedIcon === icon ? styles.selected : ''}`} onClick={() => setValue('icon', icon)}>
                                {ICON_EMOJIS[icon]}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <p className={styles.sectionLabel}>Background</p>
                    <div className={styles.bgGrid}>
                        {BACKGROUNDS.map((bg, i) => (
                            <button key={i} type="button" className={`${styles.bgBtn} ${selectedBg === bg ? styles.selected : ''}`} onClick={() => setValue('background', bg)}>
                                {bg ? (
                                    <img
                                        src={bg}
                                        alt=""
                                        className={styles.bgPreview}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                ) : (
                                    <span className={styles.noBg}>∅</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <button type="submit" className={styles.submit}>Edit</button>
            </form>
        </Modal>
    );
};

export default EditBoardModal;
