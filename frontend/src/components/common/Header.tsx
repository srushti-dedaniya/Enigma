import { useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils';
import { Button, Avatar, Dropdown, Badge } from '../ui';
import { useAuthStore } from '../../store/auth';
import { PERSONA_CONFIG } from '../../constants';

interface HeaderProps {
  children?: ReactNode;
  showSearch?: boolean;
  showPersonaSwitcher?: boolean;
}

export function Header({ children, showSearch = true, showPersonaSwitcher = true }: HeaderProps) {
  const location = useLocation();
  const { user, switchPersona, isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const activePersona = user?.persona || 'citizen';
  const personaConfig = PERSONA_CONFIG[activePersona];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const personaItems = Object.entries(PERSONA_CONFIG).map(([key, config]) => ({
    label: config.label,
    value: key,
    icon: <span className="material-symbols-outlined text-[18px]">{config.icon}</span>,
    disabled: key === activePersona,
  }));

  return (
    <header className="fixed top-0 left-64 right-0 z-30 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-space-lg flex items-center justify-between gap-space-md">
        <div className="flex-1 max-w-xl">
          {showSearch && (
            <form onSubmit={handleSearch} className="relative flex items-center w-full">
              <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-space-md py-space-xs bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline outline-none focus:bg-surface-container-lowest transition-colors"
                placeholder="Search circular materials, DIN standard, batch ID, or passport hash..."
              />
            </form>
          )}
        </div>

        <div className="flex items-center gap-space-sm">
          {showPersonaSwitcher && isAuthenticated && (
            <Dropdown
              trigger={
                <Button variant="outline" leftIcon={<span className="material-symbols-outlined text-primary text-[18px]">{personaConfig.icon}</span>}>
                  {personaConfig.label}
                </Button>
              }
              items={personaItems}
              onSelect={switchPersona}
              align="right"
            />
          )}

          {children}

          <div className="relative">
            <Button variant="outline" onClick={() => setNotificationsOpen(!notificationsOpen)}>
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <Badge variant="error" size="xs" className="-top-1 -right-1 absolute">3</Badge>
            </Button>
          </div>

          {isAuthenticated && user && (
            <Dropdown
              trigger={
                <Button variant="ghost" leftIcon={<Avatar name={user.name} size="sm" />} className="gap-space-xs">
                  {user.name}
                </Button>
              }
              items={[
                { label: 'Profile', value: 'profile', icon: <span className="material-symbols-outlined text-[18px]">person</span> },
                { label: 'Settings', value: 'settings', icon: <span className="material-symbols-outlined text-[18px]">settings</span> },
                { divider: true },
                { label: 'Sign Out', value: 'logout', icon: <span className="material-symbols-outlined text-[18px]">logout</span>, danger: true },
              ]}
              onSelect={(value) => {
                if (value === 'logout') {
                  useAuthStore.getState().logout();
                }
              }}
              align="right"
            />
          )}

          {!isAuthenticated && (
            <Button variant="primary" onClick={() => window.location.href = '/login'}>
              Sign In
            </Button>
          )}
        </div>
      </div>

      <div className="h-10 px-space-lg bg-surface-container-low flex items-center justify-between overflow-x-auto text-nowrap">
        <div className="flex items-center gap-space-lg">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[16px]">speed</span>
            <span className="font-label-sm text-label-sm text-outline uppercase">Live Circular Ticker:</span>
          </div>
          <div className="flex items-center gap-space-md font-label-sm text-label-sm">
            <span className="text-on-surface">DIVERTED: <strong className="font-semibold text-primary font-label-md text-label-md">1,284.4 T</strong></span>
            <span className="text-outline">|</span>
            <span className="text-on-surface">AI MATCH: <strong className="font-semibold text-secondary font-label-md text-label-md">94.2%</strong></span>
            <span className="text-outline">|</span>
            <span className="text-on-surface">SEGREGATION: <strong className="font-semibold text-tertiary-container font-label-md text-label-md">72.0%</strong></span>
            <span className="text-outline">|</span>
            <span className="text-on-surface">RECIRCULATION: <strong className="font-semibold text-primary font-label-md text-label-md">88.6%</strong></span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-outline">
          <span className="material-symbols-outlined text-[14px]">sync</span>
          <span>Syncing Telemetry Node #EU-702</span>
        </div>
      </div>
    </header>
  );
}