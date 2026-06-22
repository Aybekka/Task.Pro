import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useBoard } from '../../context/BoardContext';
import { boardSchema } from '../../utils/validationSchemas';
import { BOARD_ICONS, BOARD_ICON_EMOJIS, BOARD_BACKGROUNDS } from '../../constants/boardIcons';
import Modal from './Modal';
import styles from './FormModal.module.css';

const AddBoardModal = ({ onClose }) => {
    const { createBoard } = useBoard();
    const navigate = useNavigate();

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(boardSchema),
        defaultValues: { icon: 'icon-project', background: '' },
    });

    const selectedIcon = watch('icon');
    const selectedBg = watch('background');

    const onSubmit = async (data) => {
        const board = await createBoard(data);
        navigate(`/home/${board.id}`);
        onClose();
    };

    return (
        <Modal title="New board" onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.field}>
                    <input
                        className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                        placeholder="Title"
                        {...register('title')}
                    />
                    {errors.title && <span className={styles.error}>{errors.title.message}</span>}
                </div>

                <div className={styles.section}>
                    <p className={styles.sectionLabel}>Icons</p>
                    <div className={styles.iconGrid}>
                        {BOARD_ICONS.map((icon) => (
                            <button
                                key={icon}
                                type="button"
                                className={`${styles.iconBtn} ${selectedIcon === icon ? styles.selected : ''}`}
                                onClick={() => setValue('icon', icon)}
                                title={icon}
                            >
                                {BOARD_ICON_EMOJIS[icon]}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <p className={styles.sectionLabel}>Background</p>
                    <div className={styles.bgGrid}>
                        {BOARD_BACKGROUNDS.map((bg, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`${styles.bgBtn} ${selectedBg === bg ? styles.selected : ''}`}
                                onClick={() => setValue('background', bg)}
                                title={bg || 'No background'}
                            >
                                {bg ? (
                                    <img
                                        src={bg}
                                        alt={`background ${i}`}
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

                <button type="submit" className={styles.submit}>
                    <span className={styles.submitPlus}>+</span>
                    Create
                </button>
            </form>
        </Modal>
    );
};

export default AddBoardModal;
