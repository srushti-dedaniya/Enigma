import { Link } from 'react-router-dom';
import { cn } from '../../utils';

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest py-space-lg mt-space-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="w-full px-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[14px]">cyclone</span>
          </div>
          <span className="font-body-sm text-body-sm text-outline">
            CIRCULO Material Circularity Network © 2025. Standard ISO 59004 Aligned.
          </span>
        </div>
        <div className="flex items-center gap-space-md font-body-sm text-body-sm text-on-surface-variant">
          <Link className="hover:text-on-surface transition-colors" href="#">Ecosystem Governance</Link>
          <Link className="hover:text-on-surface transition-colors" href="#">Passport Registry API</Link>
          <Link className="hover:text-on-surface transition-colors" href="#">Audit Telemetry Spec</Link>
        </div>
      </div>
    </footer>
  );
}