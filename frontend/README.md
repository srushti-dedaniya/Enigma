# CIRCULO Frontend

React 18 + TypeScript + Vite + TailwindCSS frontend for the CIRCULO Circular Material Intelligence Platform.

## Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Full type safety
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS with custom CIRCULO design system
- **React Router v6** - File-based routing with lazy loading
- **TanStack Query (React Query)** - Server state management
- **Zustand** - Client state management
- **React Hook Form + Zod** - Form handling and validation
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Lucide React / Material Symbols** - Icons

## Project Structure

```
frontend/
├── public/
│   ├── images/          # Static images
│   ├── icons/           # Static icons
│   └── logos/           # Logo files
├── src/
│   ├── app/             # App entry, routing, providers
│   │   ├── App.tsx      # Main app component
│   │   ├── routes.tsx   # Route configuration
│   │   └── providers.tsx # Context providers
│   ├── assets/          # Processed assets (images, icons, animations)
│   ├── components/      # Shared UI components
│   │   ├── ui/          # Base UI components (Button, Card, Input, etc.)
│   │   ├── charts/      # Chart components (LineChart, BarChart, SankeyChart, etc.)
│   │   ├── maps/        # Map components (MapView, MapMarker, GeofenceEditor)
│   │   ├── forms/       # Form components (FormField, FormSection, FieldArray)
│   │   └── common/      # Common layout components (Header, Sidebar, Footer)
│   ├── layouts/         # Layout components
│   │   ├── PublicLayout.tsx    # For public pages (login, register)
│   │   ├── UserLayout.tsx      # For authenticated user pages
│   │   ├── OperationsLayout.tsx # For operations/fleet pages
│   │   └── AdminLayout.tsx     # For municipal/admin pages
│   ├── features/        # Feature-based modules (domain-driven)
│   │   ├── user/        # User dashboard, rewards, settings
│   │   ├── marketplace/ # Circular marketplace & AI matching
│   │   ├── scanner/     # AI material scanner
│   │   ├── collector/   # Fleet operations & route optimization
│   │   ├── admin/       # Municipal admin dashboard
│   │   ├── pickups/     # Pickup scheduling & management
│   │   ├── qr/          # Material passport & QR scanning
│   │   ├── journey/     # Material journey tracking
│   │   ├── copilot/     # AI Copilot assistant
│   │   ├── reports/     # Reporting & analytics
│   │   ├── community/   # Community drives & repair cafés
│   │   ├── recycler/    # Industrial recycler operations
│   │   ├── auth/        # Authentication & onboarding
│   │   └── search/      # Universal search & registry
│   ├── services/        # API services
│   │   ├── api.ts       # Axios instance with interceptors
│   │   ├── auth.ts      # Authentication service
│   │   └── firebase.ts  # Firebase configuration
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand stores
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── constants/       # Application constants
│   ├── styles/          # Global styles & Tailwind imports
│   └── main.tsx         # Application entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## Design System

The CIRCULO design system is implemented through TailwindCSS with custom:

- **Colors**: Semantic color tokens (primary, secondary, tertiary, surface, outline, etc.)
- **Typography**: Plus Jakarta Sans + JetBrains Mono with custom scale
- **Spacing**: Custom spacing scale (space-xs, space-sm, space-md, space-lg, space-xl, gutter, margin)
- **Border Radius**: Consistent radius scale
- **Shadows**: Elevation system

### Color Palette

```css
--color-primary: #006234;           /* Emerald green - primary actions */
--color-secondary: #0058bb;         /* Blue - secondary actions */
--color-tertiary: #864200;          /* Amber - warnings/tertiary */
--color-error: #ba1a1a;             /* Red - errors/danger */
--color-surface: #f8f9fc;           /* Base background */
--color-on-surface: #191c1e;        /* Primary text */
--color-outline: #6f7a70;           /* Borders/dividers */
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Starts dev server at http://localhost:3000

### Build

```bash
npm run build
```

Production build in `dist/`

### Type Check

```bash
npm run typecheck
```

### Lint

```bash
npm run lint
```

## Key Features

### 6 Personas / Roles

1. **Citizen** - Household waste segregation, rewards, pickup scheduling
2. **Business** - Bulk waste management, EPR compliance, ESG reporting
3. **Collector** - Fleet operations, route optimization, telemetry
4. **Recycler** - Feedstock ingestion, DIN specs, quality lab
5. **Municipal** - City-wide governance, ward heatmaps, Sankey diagrams
6. **Community** - Civic drives, repair cafés, volunteer management

### Core Modules

- **AI Material Scanner** - Neural spectrometry for instant material ID
- **Circular Marketplace** - AI-matched B2B exchange with escrow
- **Material Passports** - DIN SPEC 91446 verified digital twins
- **Fleet Telemetry** - Real-time GPS, weight sensors, route optimization
- **Copilot AI** - Natural language circular economy assistant
- **Universal Search** - Cross-entity search with filters

## Environment Variables

```env
VITE_API_URL=http://localhost:8000/api
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_VAPID_KEY=your_vapid_key
```

## API Integration

The `api.ts` service handles:
- Automatic token refresh
- Request/response interceptors
- Error formatting
- File uploads with progress

## State Management

- **Server State**: TanStack Query (caching, background refetch, deduplication)
- **Client State**: Zustand (auth, UI state, notifications, copilot)
- **Forms**: React Hook Form + Zod validation

## Routing

Routes are organized by persona with lazy-loaded components:

```typescript
// Public routes: /login, /register, /forgot-password
// Protected routes: /dashboard, /marketplace, /scanner, etc.
// Persona-specific routes under each layout
```

## Deployment

```bash
npm run build
# Deploy dist/ to your hosting platform
```

## Contributing

1. Follow the feature-based architecture
2. Use TypeScript strictly
3. Follow the design system tokens
4. Write tests for new components
4. Update types when adding API endpoints