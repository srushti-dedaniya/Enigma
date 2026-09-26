import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout, UserLayout, OperationsLayout, AdminLayout, AuthLayout } from './layouts';
import { useAuthStore } from '../store/auth';

// Pages - Lazy loaded
const Dashboard = () => import('../features/user/pages/Dashboard').then(m => m.Dashboard);
const Scanner = () => import('../features/scanner/pages/Scanner').then(m => m.Scanner);
const Marketplace = () => import('../features/marketplace/pages/Marketplace').then(m => m.Marketplace);
const MaterialPassports = () => import('../features/qr/pages/MaterialPassports').then(m => m.MaterialPassports);
const Pickups = () => import('../features/pickups/pages/Pickups').then(m => m.Pickups);
const Journey = () => import('../features/journey/pages/Journey').then(m => m.Journey);
const Rewards = () => import('../features/user/pages/Rewards').then(m => m.Rewards);
const Community = () => import('../features/community/pages/Community').then(m => m.Community);
const Routes = () => import('../features/collector/pages/Routes').then(m => m.Routes);
const Manifests = () => import('../features/collector/pages/Manifests').then(m => m.Manifests);
const Telemetry = () => import('../features/collector/pages/Telemetry').then(m => m.Telemetry);
const Vehicles = () => import('../features/collector/pages/Vehicles').then(m => m.Vehicles);
const Ingestion = () => import('../features/recycler/pages/Ingestion').then(m => m.Ingestion);
const Specs = () => import('../features/recycler/pages/Specs').then(m => m.Specs);
const Passports = () => import('../features/recycler/pages/Passports').then(m => m.Passports);
const Procurement = () => import('../features/recycler/pages/Procurement').then(m => m.Procurement);
const WardHeatmaps = () => import('../features/admin/pages/WardHeatmaps').then(m => m.WardHeatmaps);
const Sankey = () => import('../features/admin/pages/Sankey').then(m => m.Sankey);
const Compliance = () => import('../features/admin/pages/Compliance').then(m => m.Compliance);
const CitizenEngagement = () => import('../features/admin/pages/CitizenEngagement').then(m => m.CitizenEngagement);
const Campaigns = () => import('../features/community/pages/Campaigns').then(m => m.Campaigns);
const RepairCafes = () => import('../features/community/pages/RepairCafes').then(m => m.RepairCafes);
const Volunteers = () => import('../features/community/pages/Volunteers').then(m => m.Volunteers);
const Donations = () => import('../features/community/pages/Donations').then(m => m.Donations);
const Login = () => import('../features/auth/pages/Login').then(m => m.Login);
const Register = () => import('../features/auth/pages/Register').then(m => m.Register);
const ForgotPassword = () => import('../features/auth/pages/ForgotPassword').then(m => m.ForgotPassword);
const ResetPassword = () => import('../features/auth/pages/ResetPassword').then(m => m.ResetPassword);
const Onboarding = () => import('../features/auth/pages/Onboarding').then(m => m.Onboarding);
const Search = () => import('../features/search/pages/Search').then(m => m.Search);
const Settings = () => import('../features/user/pages/Settings').then(m => m.Settings);
const NotFound = () => import('../pages/NotFound').then(m => m.NotFound);

// Protected route wrapper
function ProtectedRoute({ children, requiredRoles }: { children: React.ReactNode; requiredRoles?: string[] }) {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }
  
  if (requiredRoles && user && !requiredRoles.includes(user.persona)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

// Public routes
const publicRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
];

// Citizen routes
const citizenRoutes = [
  { path: 'dashboard', element: <ProtectedRoute requiredRoles={['citizen']}><Dashboard /></ProtectedRoute> },
  { path: 'scanner', element: <ProtectedRoute requiredRoles={['citizen']}><Scanner /></ProtectedRoute> },
  { path: 'pickups', element: <ProtectedRoute requiredRoles={['citizen']}><Pickups /></ProtectedRoute> },
  { path: 'journey', element: <ProtectedRoute requiredRoles={['citizen']}><Journey /></ProtectedRoute> },
  { path: 'rewards', element: <ProtectedRoute requiredRoles={['citizen']}><Rewards /></ProtectedRoute> },
  { path: 'community', element: <ProtectedRoute requiredRoles={['citizen']}><Community /></ProtectedRoute> },
  { path: 'settings', element: <ProtectedRoute requiredRoles={['citizen']}><Settings /></ProtectedRoute> },
];

// Business routes
const businessRoutes = [
  { path: 'dashboard', element: <ProtectedRoute requiredRoles={['business']}><Dashboard /></ProtectedRoute> },
  { path: 'marketplace', element: <ProtectedRoute requiredRoles={['business']}><Marketplace /></ProtectedRoute> },
  { path: 'compliance', element: <ProtectedRoute requiredRoles={['business']}><Compliance /></ProtectedRoute> },
  { path: 'esg', element: <ProtectedRoute requiredRoles={['business']}><Compliance /></ProtectedRoute> },
  { path: 'analytics', element: <ProtectedRoute requiredRoles={['business']}><Dashboard /></ProtectedRoute> },
];

// Collector routes
const collectorRoutes = [
  { path: 'dashboard', element: <ProtectedRoute requiredRoles={['collector']}><Dashboard /></ProtectedRoute> },
  { path: 'routes', element: <ProtectedRoute requiredRoles={['collector']}><Routes /></ProtectedRoute> },
  { path: 'manifests', element: <ProtectedRoute requiredRoles={['collector']}><Manifests /></ProtectedRoute> },
  { path: 'telemetry', element: <ProtectedRoute requiredRoles={['collector']}><Telemetry /></ProtectedRoute> },
  { path: 'vehicles', element: <ProtectedRoute requiredRoles={['collector']}><Vehicles /></ProtectedRoute> },
];

// Recycler routes
const recyclerRoutes = [
  { path: 'dashboard', element: <ProtectedRoute requiredRoles={['recycler']}><Dashboard /></ProtectedRoute> },
  { path: 'ingestion', element: <ProtectedRoute requiredRoles={['recycler']}><Ingestion /></ProtectedRoute> },
  { path: 'specs', element: <ProtectedRoute requiredRoles={['recycler']}><Specs /></ProtectedRoute> },
  { path: 'passports', element: <ProtectedRoute requiredRoles={['recycler']}><Passports /></ProtectedRoute> },
  { path: 'procurement', element: <ProtectedRoute requiredRoles={['recycler']}><Procurement /></ProtectedRoute> },
];

// Municipal routes
const municipalRoutes = [
  { path: 'dashboard', element: <ProtectedRoute requiredRoles={['municipal']}><Dashboard /></ProtectedRoute> },
  { path: 'wards', element: <ProtectedRoute requiredRoles={['municipal']}><WardHeatmaps /></ProtectedRoute> },
  { path: 'sankey', element: <ProtectedRoute requiredRoles={['municipal']}><Sankey /></ProtectedRoute> },
  { path: 'compliance', element: <ProtectedRoute requiredRoles={['municipal']}><Compliance /></ProtectedRoute> },
  { path: 'citizen-engagement', element: <ProtectedRoute requiredRoles={['municipal']}><CitizenEngagement /></ProtectedRoute> },
];

// Community routes
const communityRoutes = [
  { path: 'dashboard', element: <ProtectedRoute requiredRoles={['community']}><Dashboard /></ProtectedRoute> },
  { path: 'campaigns', element: <ProtectedRoute requiredRoles={['community']}><Campaigns /></ProtectedRoute> },
  { path: 'repair-cafes', element: <ProtectedRoute requiredRoles={['community']}><RepairCafes /></ProtectedRoute> },
  { path: 'volunteers', element: <ProtectedRoute requiredRoles={['community']}><Volunteers /></ProtectedRoute> },
  { path: 'donations', element: <ProtectedRoute requiredRoles={['community']}><Donations /></ProtectedRoute> },
];

// Shared routes accessible to all authenticated users
const sharedRoutes = [
  { path: 'search', element: <ProtectedRoute><Search /></ProtectedRoute> },
  { path: 'passports/:id', element: <ProtectedRoute><MaterialPassports /></ProtectedRoute> },
];

function getRoutesForPersona(persona: string) {
  switch (persona) {
    case 'citizen': return citizenRoutes;
    case 'business': return businessRoutes;
    case 'collector': return collectorRoutes;
    case 'recycler': return recyclerRoutes;
    case 'municipal': return municipalRoutes;
    case 'community': return communityRoutes;
    default: return citizenRoutes;
  }
}

function createPersonaRoutes(persona: string, layout: React.ComponentType) {
  const routes = getRoutesForPersona(persona);
  return routes.map(route => ({
    ...route,
    element: route.element,
  }));
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      ...publicRoutes,
      {
        path: 'dashboard',
        element: <UserLayout />,
        children: [
          // Dynamic routes based on persona will be added here
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

// Helper to get routes for current persona
export function getCurrentPersonaRoutes() {
  const { activePersona } = useAuthStore.getState();
  return getRoutesForPersona(activePersona);
}