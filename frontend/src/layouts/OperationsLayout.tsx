import { Outlet } from 'react-router-dom';
import { Header, Sidebar, Footer } from '../components/common';

export function OperationsLayout() {
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