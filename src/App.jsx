import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Sayfaları lazy yaptım, çünkü ilk açılışta sadece WelcomePage'in yüklenmesi yeterli, diğerleri gerektiğinde insin
const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));
const AuthPage    = lazy(() => import('./pages/AuthPage/AuthPage'));
const HomePage    = lazy(() => import('./pages/HomePage/HomePage'));
const ScreensPage = lazy(() => import('./components/ScreensPage/ScreensPage'));

function PrivateRoute({ children }) {
  const { isLoggedIn, isRefreshing } = useAuth();
  // isRefreshing bitmeden hiçbir şey render etmiyorum, yoksa sayfa yenilendiğinde
  // kullanıcı daha login kontrolü tamamlanmadan bir anlığına /welcome'a fırlatılıyordu
  if (isRefreshing) return null;
  return isLoggedIn ? children : <Navigate to="/welcome" replace />;
}

function PublicRoute({ children }) {
  const { isLoggedIn, isRefreshing } = useAuth();
  if (isRefreshing) return null;
  return !isLoggedIn ? children : <Navigate to="/home" replace />;
}

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route
          path="/welcome"
          element={<PublicRoute><WelcomePage /></PublicRoute>}
        />
        <Route
          path="/auth/:id"
          element={<PublicRoute><AuthPage /></PublicRoute>}
        />
        {/* /home artık bir layout route: HomePage sadece Sidebar+Header+Outlet çiziyor,
            asıl board içeriği aşağıdaki iki child route'tan biri eşleşince Outlet'e basılıyor */}
        <Route
          path="/home"
          element={<PrivateRoute><HomePage /></PrivateRoute>}
        >
          {/* boardId verilmediyse (sadece /home) index route devreye giriyor */}
          <Route index element={<ScreensPage />} />
          {/* /home/:boardId ile direkt bir board'a deep-link atılabiliyor */}
          <Route path=":boardId" element={<ScreensPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </Suspense>
  );
}
