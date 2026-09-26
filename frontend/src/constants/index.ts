export const PERSONA_CONFIG = {
  citizen: {
    label: 'Citizen',
    description: 'Household waste segregation & rewards',
    icon: 'person',
    color: 'primary',
    routes: ['/dashboard', '/scanner', '/journey', '/pickups', '/rewards'],
    features: ['ai_scanner', 'doorstep_pickup', 'green_credits', 'material_tracking'],
    tier: 'Level-1 Public',
  },
  business: {
    label: 'Business',
    description: 'Bulk waste management & EPR compliance',
    icon: 'corporate_fare',
    color: 'secondary',
    routes: ['/dashboard', '/marketplace', '/compliance', '/esg', '/analytics'],
    features: ['bulk_listings', 'epr_automation', 'esg_reporting', 'auction_marketplace'],
    tier: 'Level-3 Commercial',
  },
  collector: {
    label: 'Collector',
    description: 'Fleet operations & route optimization',
    icon: 'local_shipping',
    color: 'tertiary',
    routes: ['/dashboard', '/routes', '/manifests', '/telemetry', '/vehicles'],
    features: ['route_optimization', 'live_weighing', 'crypto_manifests', 'bin_telemetry'],
    tier: 'Level-2 Logistics',
  },
  recycler: {
    label: 'Recycler',
    description: 'Feedstock intake & DIN specifications',
    icon: 'precision_manufacturing',
    color: 'primary',
    routes: ['/dashboard', '/ingestion', '/specs', '/passports', '/procurement'],
    features: ['din_passports', 'feedstock_procurement', 'circular_premium', 'quality_lab'],
    tier: 'Level-4 Industrial Hub',
  },
  municipal: {
    label: 'Municipal',
    description: 'City-wide circular governance',
    icon: 'account_balance',
    color: 'secondary',
    routes: ['/dashboard', '/wards', '/sankey', '/compliance', '/citizen_engagement'],
    features: ['sankey_diagrams', 'ward_heatmaps', 'statutory_filing', 'methane_telemetry'],
    tier: 'Sovereign Oversight',
  },
  community: {
    label: 'Community',
    description: 'Civic drives & repair cafés',
    icon: 'volunteer_activism',
    color: 'tertiary',
    routes: ['/dashboard', '/campaigns', '/repair_cafes', '/volunteers', '/donations'],
    features: ['event_orchestration', 'repair_toolkits', 'fair_pay_ledger', 'upcycle_distribution'],
    tier: 'Civic Partner',
  },
} as const;

export const MATERIAL_TYPES = [
  { value: 'plastic', label: 'Plastics', icon: 'recycling', color: 'primary' },
  { value: 'paper', label: 'Paper & Cardboard', icon: 'description', color: 'tertiary' },
  { value: 'glass', label: 'Glass', icon: 'wine_bar', color: 'secondary' },
  { value: 'metal', label: 'Metals', icon: 'precision_manufacturing', color: 'outline' },
  { value: 'organic', label: 'Organic Waste', icon: 'compost', color: 'tertiary-container' },
  { value: 'ewaste', label: 'E-Waste', icon: 'memory', color: 'error' },
  { value: 'textile', label: 'Textiles', icon: 'checkroom', color: 'secondary-container' },
  { value: 'composite', label: 'Composites', icon: 'category', color: 'on-surface-variant' },
] as const;

export const PASSPORT_STATUS_CONFIG = {
  active: { label: 'Active', color: 'primary', icon: 'check_circle' },
  in_transit: { label: 'In Transit', color: 'secondary', icon: 'local_shipping' },
  processing: { label: 'Processing', color: 'tertiary', icon: 'settings' },
  completed: { label: 'Completed', color: 'primary', icon: 'task_alt' },
  archived: { label: 'Archived', color: 'outline', icon: 'archive' },
  flagged: { label: 'Flagged', color: 'error', icon: 'warning' },
} as const;

export const VEHICLE_TYPES = [
  { value: 'ev_3wheeler', label: 'EV 3-Wheeler', capacity: 500, unit: 'kg', icon: 'electric_bike' },
  { value: 'ev_flatbed', label: 'EV Flatbed', capacity: 1500, unit: 'kg', icon: 'local_shipping' },
  { value: 'compactor', label: 'Compactor Unit', capacity: 5000, unit: 'kg', icon: 'compress' },
  { value: 'heavy_tipper', label: 'Heavy Tipper', capacity: 10000, unit: 'kg', icon: 'construction' },
  { value: 'ev_cargo_van', label: 'EV Cargo Van', capacity: 2000, unit: 'kg', icon: 'delivery_truck' },
] as const;

export const FACILITY_TYPES = [
  { value: 'mrf', label: 'Material Recovery Facility', icon: 'factory' },
  { value: 'recycler', label: 'Recycler / Smelter', icon: 'precision_manufacturing' },
  { value: 'compost', label: 'Composting Facility', icon: 'compost' },
  { value: 'landfill', label: 'Landfill', icon: 'delete' },
  { value: 'transfer_station', label: 'Transfer Station', icon: 'transfer_within_a_station' },
  { value: 'collection_hub', label: 'Collection Hub', icon: 'hub' },
  { value: 'repair_cafe', label: 'Repair Café', icon: 'handyman' },
] as const;

export const ROUTE_STATUSES = {
  scheduled: { label: 'Scheduled', color: 'outline' },
  active: { label: 'Active', color: 'primary' },
  completed: { label: 'Completed', color: 'primary' },
  cancelled: { label: 'Cancelled', color: 'error' },
} as const;

export const ALERT_SEVERITY = {
  info: { color: 'secondary', icon: 'info', bg: 'bg-secondary-fixed/20' },
  warning: { color: 'tertiary', icon: 'warning', bg: 'bg-tertiary-fixed/20' },
  critical: { color: 'error', icon: 'error', bg: 'bg-error-container/20' },
} as const;

export const COPILOT_QUICK_ACTIONS = [
  { label: 'Scan Material', icon: 'camera_alt', action: 'scan' },
  { label: 'Find Buyers', icon: 'storefront', action: 'find_buyers' },
  { label: 'Optimize Route', icon: 'route', action: 'optimize_route' },
  { label: 'Check Compliance', icon: 'policy', action: 'check_compliance' },
  { label: 'Create Listing', icon: 'add_circle', action: 'create_listing' },
  { label: 'Schedule Pickup', icon: 'schedule', action: 'schedule_pickup' },
] as const;

export const DASHBOARD_KPIS = {
  citizen: [
    { id: 'diverted', label: 'Diverted', unit: 'kg' },
    { id: 'replaced', label: 'Items Replaced', unit: 'items' },
    { id: 'value', label: 'Value Recovered', unit: '₹' },
    { id: 'credits', label: 'Circular Credits', unit: 'pts' },
  ],
  business: [
    { id: 'discharged', label: 'Bulk Discharged', unit: 'tonnes' },
    { id: 'diverted', label: 'Landfill Diversion', unit: 'tonnes' },
    { id: 'value', label: 'Value Recouped', unit: '₹' },
    { id: 'carbon', label: 'Carbon Avoided', unit: 't CO2e' },
  ],
  collector: [
    { id: 'pickups', label: 'Assigned Pickups', unit: 'stops' },
    { id: 'payload', label: 'Payload', unit: 'tonnes' },
    { id: 'progress', label: 'Run Progress', unit: '%' },
    { id: 'efficiency', label: 'Carbon Efficiency', unit: 'kWh/km' },
  ],
  recycler: [
    { id: 'capacity', label: 'Feedstock Capacity', unit: '%' },
    { id: 'inflow', label: 'Inflow Need', unit: 'tonnes/day' },
    { id: 'carbon', label: 'Scope 3 Avoided', unit: 't CO2e' },
    { id: 'purity', label: 'Avg Purity', unit: '%' },
  ],
  municipal: [
    { id: 'generated', label: 'Total Generated', unit: 'tonnes' },
    { id: 'diverted', label: 'Landfill Diversion', unit: 'tonnes' },
    { id: 'fleet', label: 'Active Fleet', unit: 'vehicles' },
    { id: 'listings', label: 'Circular Listings', unit: 'lots' },
  ],
  community: [
    { id: 'drives', label: 'Neighborhood Drives', unit: 'count' },
    { id: 'salvaged', label: 'Mass Salvaged', unit: 'kg' },
    { id: 'volunteers', label: 'Engaged Citizens', unit: 'count' },
    { id: 'social_value', label: 'Social Value', unit: '₹' },
  ],
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    refresh: '/api/auth/refresh',
    logout: '/api/auth/logout',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
    verifyEmail: '/api/auth/verify-email',
  },
  user: {
    profile: '/api/user/profile',
    preferences: '/api/user/preferences',
    personas: '/api/user/personas',
    switchPersona: '/api/user/switch-persona',
  },
  materials: {
    list: '/api/materials',
    create: '/api/materials',
    get: '/api/materials/:id',
    update: '/api/materials/:id',
    delete: '/api/materials/:id',
    search: '/api/materials/search',
  },
  passports: {
    list: '/api/passports',
    create: '/api/passports',
    get: '/api/passports/:id',
    verify: '/api/passports/:id/verify',
    transfer: '/api/passports/:id/transfer',
    history: '/api/passports/:id/history',
  },
  marketplace: {
    listings: '/api/marketplace/listings',
    create: '/api/marketplace/listings',
    get: '/api/marketplace/listings/:id',
    match: '/api/marketplace/match',
    bid: '/api/marketplace/listings/:id/bid',
  },
  fleet: {
    vehicles: '/api/fleet/vehicles',
    routes: '/api/fleet/routes',
    telemetry: '/api/fleet/telemetry',
    dispatch: '/api/fleet/dispatch',
  },
  facilities: {
    list: '/api/facilities',
    get: '/api/facilities/:id',
    search: '/api/facilities/search',
  },
  pickups: {
    request: '/api/pickups',
    list: '/api/pickups',
    get: '/api/pickups/:id',
    cancel: '/api/pickups/:id/cancel',
  },
  scanner: {
    analyze: '/api/scanner/analyze',
    history: '/api/scanner/history',
  },
  copilot: {
    chat: '/api/copilot/chat',
    suggestions: '/api/copilot/suggestions',
    actions: '/api/copilot/execute',
  },
  reports: {
    generate: '/api/reports/generate',
    list: '/api/reports',
    get: '/api/reports/:id',
  },
  search: {
    global: '/api/search',
    suggestions: '/api/search/suggestions',
  },
  notifications: {
    list: '/api/notifications',
    markRead: '/api/notifications/:id/read',
    markAllRead: '/api/notifications/read-all',
    preferences: '/api/notifications/preferences',
  },
} as const;

export const STORAGE_KEYS = {
  authToken: 'circulo_auth_token',
  refreshToken: 'circulo_refresh_token',
  userPreferences: 'circulo_user_preferences',
  activePersona: 'circulo_active_persona',
  recentSearches: 'circulo_recent_searches',
  copilotHistory: 'circulo_copilot_history',
  offlineQueue: 'circulo_offline_queue',
} as const;

export const WEBSOCKET_EVENTS = {
  telemetry: 'telemetry',
  alert: 'alert',
  routeUpdate: 'route_update',
  passportUpdate: 'passport_update',
  marketplaceMatch: 'marketplace_match',
  notification: 'notification',
} as const;

export const PAGINATION_DEFAULTS = {
  page: 1,
  pageSize: 20,
  maxPageSize: 100,
} as const;

export const DATE_FORMATS = {
  display: 'MMM d, yyyy',
  displayTime: 'MMM d, yyyy h:mm a',
  iso: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  dateOnly: 'yyyy-MM-dd',
  timeOnly: 'HH:mm',
} as const;