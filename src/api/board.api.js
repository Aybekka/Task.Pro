/**
 * Board API layer
 * Mock şu an aktif. Gerçek backend'e geçmek için bu
 * dosyadaki mock import'larını axios/fetch çağrılarıyla değiştir.
 * Fonksiyon imzaları aynı kalır.
 */
import {
  mockGetBoards,
  mockCreateBoard,
  mockUpdateBoard,
  mockDeleteBoard,
  mockAddColumn,
  mockUpdateColumn,
  mockDeleteColumn,
  mockAddCard,
  mockUpdateCard,
  mockDeleteCard,
  mockMoveCard,
} from './mock/board.mock';

// BoardContext bu fonksiyonları çağırıyor, mock'tan gerçek API'ye geçişte
// BoardContext'e hiç dokunmamak için imzaları aynı tutuyorum
export const getBoards    = mockGetBoards;
export const createBoard  = mockCreateBoard;
export const updateBoard  = mockUpdateBoard;
export const deleteBoard  = mockDeleteBoard;

export const addColumn    = mockAddColumn;
export const updateColumn = mockUpdateColumn;
export const deleteColumn = mockDeleteColumn;

export const addCard      = mockAddCard;
export const updateCard   = mockUpdateCard;
export const deleteCard   = mockDeleteCard;
export const moveCard     = mockMoveCard;
