import { Outlet } from 'react-router-dom';
import { Header, Sidebar, Footer } from '../components/common';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      <Header showPersonaSwitcher={false} />
      <div className="pl-64">
        <main className="relative pt-26 bg-surface min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      <main className="relative pt-0 bg-surface min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}