import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header, Sidebar, Footer } from '../components/common';
import { useAuthStore } from '../store/auth';

export function UserLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      <Header />
      <div className="pl-64">
        <main className="relative pt-26 bg-surface min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}