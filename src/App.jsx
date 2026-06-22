import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));
const AuthPage = lazy(() => import('./pages/AuthPage/AuthPage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  const { isLoggedIn, isRefreshing } = useAuth();

  if (isRefreshing) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1f1f1f' }}>
        <p style={{ color: '#BEDBB0' }}>Loading...</p>
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? '/home' : '/welcome'} replace />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/auth/:id" element={<AuthPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/:boardId"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;

