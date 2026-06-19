import { storage, KEYS } from './storage';
import { DEMO_BOARDS } from './seed';

// auth.mock.js'deki getUsers ile aynı mantık: localStorage boşsa demo board'ları tohumla
function getBoards() {
  const boards = storage.get(KEYS.BOARDS);
  if (!boards) {
    storage.set(KEYS.BOARDS, DEMO_BOARDS);
    return DEMO_BOARDS;
  }
  return boards;
}

// Backend yokken benzersiz id üretmek için timestamp + rastgele bir parça kullanıyorum,
// aynı milisaniyede iki kayıt oluşursa çakışmasın diye
function uid() {
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

export async function mockGetBoards() {
  await delay(100);
  return getBoards();
}

export async function mockCreateBoard({ title, icon, background }) {
  await delay(150);
  const board = { id: uid(), title, icon, background, columns: [] };
  storage.set(KEYS.BOARDS, [...getBoards(), board]);
  return board;
}

export async function mockUpdateBoard(boardId, data) {
  await delay(150);
  const boards = getBoards().map(b => (b.id === boardId ? { ...b, ...data } : b));
  storage.set(KEYS.BOARDS, boards);
  return boards.find(b => b.id === boardId);
}

export async function mockDeleteBoard(boardId) {
  await delay(150);
  storage.set(KEYS.BOARDS, getBoards().filter(b => b.id !== boardId));
}

export async function mockAddColumn(boardId, { title }) {
  await delay(150);
  const column = { id: uid(), title, cards: [] };
  const boards = getBoards().map(b =>
    b.id === boardId ? { ...b, columns: [...b.columns, column] } : b
  );
  storage.set(KEYS.BOARDS, boards);
  return column;
}

export async function mockUpdateColumn(boardId, columnId, { title }) {
  await delay(150);
  // updated'ı dışarıda tutuyorum, çünkü map içinden direkt return edemiyorum
  // ama fonksiyonun sonunda güncellenmiş column'u geri döndürmem gerekiyor
  let updated = null;
  const boards = getBoards().map(b => {
    if (b.id !== boardId) return b;
    const columns = b.columns.map(c => {
      if (c.id !== columnId) return c;
      updated = { ...c, title };
      return updated;
    });
    return { ...b, columns };
  });
  storage.set(KEYS.BOARDS, boards);
  return updated;
}

export async function mockDeleteColumn(boardId, columnId) {
  await delay(150);
  const boards = getBoards().map(b =>
    b.id === boardId ? { ...b, columns: b.columns.filter(c => c.id !== columnId) } : b
  );
  storage.set(KEYS.BOARDS, boards);
}

export async function mockAddCard(boardId, columnId, cardData) {
  await delay(150);
  const card = { id: uid(), ...cardData };
  const boards = getBoards().map(b => {
    if (b.id !== boardId) return b;
    return {
      ...b,
      columns: b.columns.map(c =>
        c.id === columnId ? { ...c, cards: [...c.cards, card] } : c
      ),
    };
  });
  storage.set(KEYS.BOARDS, boards);
  return card;
}

export async function mockUpdateCard(boardId, columnId, cardId, data) {
  await delay(150);
  let updated = null;
  const boards = getBoards().map(b => {
    if (b.id !== boardId) return b;
    return {
      ...b,
      columns: b.columns.map(c => {
        if (c.id !== columnId) return c;
        return {
          ...c,
          cards: c.cards.map(card => {
            if (card.id !== cardId) return card;
            updated = { ...card, ...data };
            return updated;
          }),
        };
      }),
    };
  });
  storage.set(KEYS.BOARDS, boards);
  return updated;
}

export async function mockDeleteCard(boardId, columnId, cardId) {
  await delay(150);
  const boards = getBoards().map(b => {
    if (b.id !== boardId) return b;
    return {
      ...b,
      columns: b.columns.map(c =>
        c.id === columnId ? { ...c, cards: c.cards.filter(cd => cd.id !== cardId) } : c
      ),
    };
  });
  storage.set(KEYS.BOARDS, boards);
}

export async function mockMoveCard(boardId, { fromColumnId, toColumnId, cardId, toIndex }) {
  await delay(100);
  let movedCard = null;
  let boards = getBoards().map(b => {
    if (b.id !== boardId) return b;
    // Önce kartı kaynak kolondan çıkarıyorum ve bir kenara not ediyorum
    let columns = b.columns.map(c => {
      if (c.id !== fromColumnId) return c;
      movedCard = c.cards.find(cd => cd.id === cardId);
      return { ...c, cards: c.cards.filter(cd => cd.id !== cardId) };
    });
    // Sonra hedef kolona, istenen index'e splice ile geri ekliyorum (aynı kolon içi sıralama değişikliği de buradan geçiyor)
    columns = columns.map(c => {
      if (c.id !== toColumnId) return c;
      const cards = [...c.cards];
      cards.splice(toIndex, 0, movedCard);
      return { ...c, cards };
    });
    return { ...b, columns };
  });
  storage.set(KEYS.BOARDS, boards);
}
