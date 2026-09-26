import { Link, useLocation, NavLink } from 'react-router-dom';
import { cn } from '../../utils';
import { Button, Avatar, Badge } from '../ui';
import { useAuthStore } from '../../store/auth';
import { PERSONA_CONFIG } from '../../constants';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  roles?: string[];
  badge?: string;
  children?: NavItem[];
}

const navigationConfig: Record<string, NavItem[]> = {
  citizen: [
    { path: '/dashboard', label: 'Overview', icon: 'dashboard' },
    { path: '/scanner', label: 'AI Scanner', icon: 'camera_alt' },
    { path: '/pickups', label: 'Schedule Pickup', icon: 'local_shipping' },
    { path: '/journey', label: 'Material Journey', icon: 'timeline' },
    { path: '/rewards', label: 'Rewards & Credits', icon: 'card_membership' },
    { path: '/community', label: 'Community', icon: 'groups' },
  ],
  business: [
    { path: '/dashboard', label: 'Overview', icon: 'dashboard' },
    { path: '/marketplace', label: 'Marketplace', icon: 'storefront' },
    { path: '/compliance', label: 'EPR Compliance', icon: 'policy' },
    { path: '/esg', label: 'ESG Reporting', icon: 'analytics' },
    { path: '/analytics', label: 'Analytics', icon: 'insights' },
  ],
  collector: [
    { path: '/dashboard', label: 'Overview', icon: 'dashboard' },
    { path: '/routes', label: 'Routes', icon: 'route' },
    { path: '/manifests', label: 'Manifests', icon: 'receipt_long' },
    { path: '/telemetry', label: 'Telemetry', icon: 'sensors' },
    { path: '/vehicles', label: 'Vehicles', icon: 'directions_car' },
  ],
  recycler: [
    { path: '/dashboard', label: 'Overview', icon: 'dashboard' },
    { path: '/ingestion', label: 'Feedstock Ingestion', icon: 'inventory' },
    { path: '/specs', label: 'DIN Specs', icon: 'science' },
    { path: '/passports', label: 'Passports', icon: 'badge' },
    { path: '/procurement', label: 'Procurement', icon: 'shopping_cart' },
  ],
  municipal: [
    { path: '/dashboard', label: 'Overview', icon: 'dashboard' },
    { path: '/wards', label: 'Ward Heatmaps', icon: 'map' },
    { path: '/sankey', label: 'Sankey Diagrams', icon: 'account_tree' },
    { path: '/compliance', label: 'Compliance', icon: 'policy' },
    { path: '/citizen-engagement', label: 'Citizen Engagement', icon: 'groups' },
  ],
  community: [
    { path: '/dashboard', label: 'Overview', icon: 'dashboard' },
    { path: '/campaigns', label: 'Campaigns', icon: 'campaign' },
    { path: '/repair-cafes', label: 'Repair Cafés', icon: 'handyman' },
    { path: '/volunteers', label: 'Volunteers', icon: 'volunteer_activism' },
    { path: '/donations', label: 'Donations', icon: 'favorite' },
  ],
};

export function Sidebar() {
  const location = useLocation();
  const { user, activePersona } = useAuthStore();
  const personaConfig = PERSONA_CONFIG[activePersona];
  const navItems = navigationConfig[activePersona] || navigationConfig.citizen;

  const handlePersonaSwitch = (persona: string) => {
    useAuthStore.getState().setActivePersona(persona as any);
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-40 flex flex-col shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-space-md flex items-center justify-between bg-surface-container-lowest">
        <div className="flex items-center gap-space-xs">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[20px]">cyclone</span>
          </div>
          <div>
            <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary">CIRCULO</span>
            <span className="block font-label-sm text-label-sm text-outline uppercase">Ecosystem OS</span>
          </div>
        </div>
      </div>

      <div className="px-space-md py-space-sm">
        <div className="bg-surface-container-low p-space-xs rounded-lg">
          <label className="block px-space-xs font-label-sm text-label-sm text-outline uppercase mb-space-xs">Active Persona</label>
          <div className="flex items-center justify-between px-space-sm py-space-xs bg-surface-container-lowest rounded shadow-[0_1px_4px_rgba(25,28,30,0.04)]">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[18px]">{personaConfig.icon}</span>
              <span className="font-body-sm text-body-sm font-semibold text-on-surface">{personaConfig.label}</span>
            </div>
            <span className="material-symbols-outlined text-outline text-[16px]">unfold_more</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-space-sm py-space-xs">
        <div className="px-space-sm py-space-xs font-label-sm text-label-sm text-outline uppercase">Ecosystem Core</div>
        <nav className="flex flex-col gap-space-xs">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                'flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors',
                isActive
                  ? 'bg-primary-container text-on-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              )}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="font-body-md text-body-md">{item.label}</span>
              {item.badge && (
                <Badge variant="primary" size="xs" className="ml-auto">{item.badge}</Badge>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-space-lg px-space-sm py-space-xs font-label-sm text-label-sm text-outline uppercase">Persona Switcher</div>
        <div className="flex flex-col gap-space-xs">
          {Object.entries(PERSONA_CONFIG).map(([key, config]) => (
            <Button
              key={key}
              variant={key === activePersona ? 'primary' : 'outline'}
              fullWidth
              justify="start"
              leftIcon={<span className="material-symbols-outlined text-[16px]">{config.icon}</span>}
              rightIcon={key === activePersona ? <span className="material-symbols-outlined text-[16px]">check</span> : undefined}
              onClick={() => handlePersonaSwitch(key)}
              className="text-left"
            >
              {config.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-space-md bg-surface-container-low">
        <div className="flex items-center gap-space-sm p-space-xs bg-surface-container-lowest rounded-lg shadow-[0_1px_4px_rgba(25,28,30,0.03)]">
          <span className="material-symbols-outlined text-secondary text-[20px]">psychology</span>
          <div className="flex-1">
            <p className="font-body-sm text-body-sm font-semibold text-on-surface">Ecosystem Copilot</p>
            <p className="font-label-sm text-label-sm text-outline">v4.2 Circular Agent</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        </div>
      </div>
    </aside>
  );
}