import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBoard } from '../../context/BoardContext';
import Column from '../Column/Column';
import CreateCardModal from '../modals/CreateCardModal';
import EditCardModal from '../modals/EditCardModal';
import AddColumnModal from '../modals/AddColumnModal';
import EditColumnModal from '../modals/EditColumnModal';
import Icon from '../Icon/Icon';
import styles from './ScreensPage.module.css';

export default function ScreensPage() {
  const { boardId } = useParams();
  const {
    boards,
    activeBoard,
    setActiveBoardId,
    addColumn,
    updateColumn,
    deleteColumn,
    addCard,
    updateCard,
    deleteCard,
    moveCard,
  } = useBoard();

  const [createCardColumnId, setCreateCardColumnId] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [editingCardColumnId, setEditingCardColumnId] = useState(null);
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);

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

  const handleAddCard = (columnId) => {
    setCreateCardColumnId(columnId);
  };

  const handleCreateCard = async (cardData) => {
    await addCard(activeBoard.id, createCardColumnId, cardData);
    setCreateCardColumnId(null);
  };

  const handleEditCard = (card, columnId) => {
    setEditingCard(card);
    setEditingCardColumnId(columnId);
  };

  const handleUpdateCard = async (cardData) => {
    await updateCard(activeBoard.id, editingCardColumnId, editingCard.id, cardData);
    setEditingCard(null);
    setEditingCardColumnId(null);
  };

  const handleDeleteCard = async (columnId, cardId) => {
    await deleteCard(activeBoard.id, columnId, cardId);
  };

  const handleMoveCard = async (moveData) => {
    await moveCard(activeBoard.id, moveData);
  };

  const handleAddColumn = async (data) => {
    await addColumn(activeBoard.id, data);
  };

  const handleEditColumn = (column) => {
    setEditingColumn(column);
  };

  const handleUpdateColumn = async (columnId, data) => {
    await updateColumn(activeBoard.id, columnId, data);
  };

  const handleDeleteColumn = (columnId) => {
    deleteColumn(activeBoard.id, columnId);
  };

  return (
    <div className={styles.board}>
      {activeBoard.columns.map(column => (
        <Column
          key={column.id}
          column={column}
          columns={activeBoard.columns}
          boardId={activeBoard.id}
          onAddCard={handleAddCard}
          onEditCard={(card) => handleEditCard(card, column.id)}
          onDeleteCard={handleDeleteCard}
          onMoveCard={handleMoveCard}
          onEditColumn={handleEditColumn}
          onDeleteColumn={handleDeleteColumn}
        />
      ))}

      <button className={styles.addColBtn} onClick={() => setShowAddColumn(true)}>
        <Icon name="plus" size={14} />
        Add another column
      </button>

      {createCardColumnId && (
        <CreateCardModal
          onClose={() => setCreateCardColumnId(null)}
          onSubmit={handleCreateCard}
        />
      )}

      {editingCard && (
        <EditCardModal
          card={editingCard}
          onClose={() => { setEditingCard(null); setEditingCardColumnId(null); }}
          onSubmit={handleUpdateCard}
        />
      )}

      {showAddColumn && (
        <AddColumnModal
          onClose={() => setShowAddColumn(false)}
          onSubmit={handleAddColumn}
        />
      )}

      {editingColumn && (
        <EditColumnModal
          column={editingColumn}
          onClose={() => setEditingColumn(null)}
          onSubmit={handleUpdateColumn}
        />
      )}
    </div>
  );
}
