# TaskPro

TaskPro, ekiplerin board → column → card hiyerarşisiyle iş takibi yapabildiği bir Kanban uygulaması. Trello'ya benzer şekilde kullanıcı kayıt/giriş yapıyor, kendi board'larını oluşturuyor, board içine sütun (column) ve kart (card) ekleyip bunları taşıyabiliyor. Backend henüz hazır olmadığı için tüm veri `localStorage` üzerinde mock bir API katmanı ile tutuluyor.

## Önceki versiyona göre ne değişti

Proje başlangıçta Create React App + Redux Toolkit + react-router-dom v7 ile kurulmuştu. Ekip görev tanımı (Person 1 — Architect/Infrastructure) Vite + Context API + react-router-dom v6 + Outlet tabanlı bir HomePage layout istediği için aşağıdaki geçişler yapıldı:

- **Build aracı:** Create React App (`react-scripts`) kaldırıldı, **Vite** ile değiştirildi (`vite.config.js`, kök dizinde `index.html`, `src/main.jsx`).
- **State yönetimi:** `src/redux/` klasörü (slice'lar, store, selector'lar) tamamen kaldırıldı; yerine üç ayrı React Context geldi: `AuthContext`, `BoardContext`, `ThemeContext`.
- **Routing:** `react-router-dom` v7 → v6'ya düşürüldü. `HomePage` artık iş mantığı içermeyen saf bir layout (`Sidebar` + `Header` + `Outlet`); board'a özel mantık `Outlet` üzerinden render edilen `ScreensPage`'e taşındı (çünkü parent route'taki `useParams()` child route'un `:boardId` parametresini göremiyor — bu yüzden mantık parametreyi görebilen alt route'a kaydırıldı).
- **Ortam değişkenleri:** `REACT_APP_*` prefix'i Vite'ın beklediği `VITE_*` prefix'ine çevrildi.

## Klasör yapısı

```
src/
├── api/                  # Mock → gerçek API geçişine hazır soyutlama katmanı
│   ├── auth.api.js       # AuthContext'in çağırdığı sabit isimler (login, register, ...)
│   ├── board.api.js      # BoardContext'in çağırdığı sabit isimler (CRUD fonksiyonları)
│   └── mock/             # Gerçek backend gelene kadar localStorage tabanlı sahte API
│       ├── auth.mock.js
│       ├── board.mock.js
│       ├── seed.js       # Demo kullanıcı ve demo board verisi
│       └── storage.js    # localStorage okuma/yazma için tek merkez
├── context/
│   ├── AuthContext.jsx   # Kullanıcı oturumu: login, register, logout, updateProfile
│   ├── BoardContext.jsx  # Board/column/card CRUD + aktif board takibi
│   └── ThemeContext.jsx  # dark/light/violet tema + <html data-theme> yönetimi
├── components/
│   ├── Header/
│   ├── Sidebar/
│   ├── ScreensPage/      # Aktif board'un sütun/kart render'ı (route leaf component)
│   └── modals/
├── pages/
│   ├── WelcomePage/      # Giriş öncesi karşılama ekranı
│   ├── AuthPage/         # Login / Register formu
│   └── HomePage/         # Sidebar + Header + <Outlet/> layout'u
├── utils/
│   ├── validationSchemas.js  # Tüm Yup şemaları (login, register, board, column, card...)
│   └── dateHelpers.js        # Tarih/deadline yardımcı fonksiyonları (date-fns tabanlı)
├── App.jsx               # Route tanımları + PrivateRoute/PublicRoute koruma mantığı
└── main.jsx              # Provider ağacı (Auth → Board → Theme) + BrowserRouter
```

## State şeması (Context API)

Redux yerine Context + `useState` kullanıldığı için "state şeması" üç ayrı context'in tuttuğu state'lere karşılık geliyor:

**AuthContext**
```js
{
  user: { id, name, email, avatarUrl } | null,
  isLoggedIn: boolean,
  isLoading: boolean,     // login/register/updateProfile sırasında true
  isRefreshing: boolean,  // sayfa ilk açıldığında oturum kontrolü sürerken true
  error: string | null,
}
```

**BoardContext**
```js
{
  boards: Board[],            // Board: { id, title, icon, background, columns: Column[] }
  activeBoardId: string | null,
  activeBoard: Board | null,  // boards içinden türetilen, ayrı state değil
  isLoading: boolean,
  error: string | null,
}
// Column: { id, title, cards: Card[] }
// Card:   { id, title, description, priority: 'without'|'low'|'medium'|'high', deadline }
```

**ThemeContext**
```js
{
  theme: 'dark' | 'light' | 'violet',
}
```

Tüm context state'leri `api/mock/storage.js` üzerinden `localStorage`'a yazılıp okunuyor, böylece sayfa yenilense de oturum/tema/board verisi kaybolmuyor.

## Kullanılan teknolojiler

- React 19
- Vite 6 (`@vitejs/plugin-react`)
- react-router-dom 6 (nested routes, `Outlet`)
- React Context API (Redux yok)
- react-hook-form + `@hookform/resolvers/yup` + `yup` (form validasyonu)
- date-fns (deadline/overdue hesaplamaları)
- localStorage tabanlı mock API katmanı

## Çalıştırma komutları

```bash
npm install        # bağımlılıkları kur
npm run dev         # geliştirme sunucusunu başlat (http://localhost:3000)
npm run build       # production build (dist/ klasörü)
npm run preview     # production build'i lokalde önizle
```

Demo giriş bilgileri (mock kullanıcı, `api/mock/seed.js` içinde tanımlı):

```
email:    demo@taskpro.com
password: Demo1234
```
