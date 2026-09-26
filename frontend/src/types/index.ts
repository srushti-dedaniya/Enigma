export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  persona: PersonaType;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'citizen' | 'business' | 'collector' | 'recycler' | 'municipal' | 'community';

export type PersonaType = 'citizen' | 'business' | 'collector' | 'recycler' | 'municipal' | 'community';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationPreferences;
  language: string;
  units: 'metric' | 'imperial';
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface MaterialPassport {
  id: string;
  hash: string;
  materialType: MaterialType;
  grade: string;
  weight: number;
  unit: 'kg' | 'tonnes';
  purity: number;
  origin: Location;
  currentLocation: Location;
  status: PassportStatus;
  lifecycle: LifecycleStage[];
  certifications: Certification[];
  carbonFootprint: number;
  createdAt: string;
  updatedAt: string;
}

export type MaterialType = 'plastic' | 'paper' | 'glass' | 'metal' | 'organic' | 'ewaste' | 'textile' | 'composite';

export type PassportStatus = 'active' | 'in_transit' | 'processing' | 'completed' | 'archived' | 'flagged';

export interface Location {
  lat: number;
  lng: number;
  address: string;
  facilityId?: string;
  facilityName?: string;
}

export interface LifecycleStage {
  stage: number;
  name: string;
  timestamp: string;
  location: Location;
  actor: string;
  verification: VerificationData;
  metrics: StageMetrics;
}

export interface VerificationData {
  method: 'optical' | 'weight' | 'chemical' | 'manual' | 'iot';
  confidence: number;
  verifiedBy: string;
  certificateId?: string;
}

export interface StageMetrics {
  weight?: number;
  purity?: number;
  moisture?: number;
  temperature?: number;
  co2e?: number;
}

export interface Certification {
  standard: string;
  level: string;
  issuedBy: string;
  issuedAt: string;
  expiresAt?: string;
  certificateHash: string;
}

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  location: Location;
  capacity: Capacity;
  certifications: string[];
  status: 'active' | 'inactive' | 'maintenance';
  operator: string;
  contact: ContactInfo;
  acceptedMaterials: MaterialType[];
  operatingHours: OperatingHours;
}

export type FacilityType = 'mrf' | 'recycler' | 'compost' | 'landfill' | 'transfer_station' | 'collection_hub' | 'repair_cafe';

export interface Capacity {
  daily: number;
  monthly: number;
  unit: 'tonnes' | 'kg';
  currentUtilization: number;
}

export interface ContactInfo {
  phone: string;
  email: string;
  website?: string;
}

export interface OperatingHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string;
  close: string;
  isClosed: boolean;
}

export interface Vehicle {
  id: string;
  plate: string;
  type: VehicleType;
  capacity: number;
  currentLoad: number;
  location: Location;
  driver: Driver;
  status: VehicleStatus;
  sensors: SensorData;
  route?: Route;
}

export type VehicleType = 'ev_3wheeler' | 'ev_flatbed' | 'compactor' | 'heavy_tipper' | 'ev_cargo_van';

export type VehicleStatus = 'idle' | 'en_route' | 'loading' | 'unloading' | 'maintenance' | 'offline';

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  rating: number;
}

export interface SensorData {
  gps: { lat: number; lng: number; accuracy: number; timestamp: string };
  weight?: { gross: number; tare: number; net: number; timestamp: string };
  fillLevel?: number;
  battery?: number;
  temperature?: number;
}

export interface Route {
  id: string;
  name: string;
  waypoints: Waypoint[];
  status: RouteStatus;
  vehicleId: string;
  startTime: string;
  estimatedEndTime: string;
  actualEndTime?: string;
  metrics: RouteMetrics;
}

export interface Waypoint {
  id: string;
  sequence: number;
  location: Location;
  type: 'pickup' | 'dropoff' | 'depot';
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  estimatedTime: string;
  actualTime?: string;
  materials: MaterialLoad[];
}

export interface MaterialLoad {
  materialType: MaterialType;
  weight: number;
  passportId?: string;
}

export type RouteStatus = 'scheduled' | 'active' | 'completed' | 'cancelled';

export interface RouteMetrics {
  distance: number;
  duration: number;
  fuelConsumed: number;
  co2e: number;
  stopsCompleted: number;
  totalStops: number;
}

export interface MarketplaceListing {
  id: string;
  title: string;
  description: string;
  materialType: MaterialType;
  grade: string;
  quantity: number;
  unit: 'kg' | 'tonnes';
  price: number;
  currency: string;
  location: Location;
  seller: SellerInfo;
  specifications: MaterialSpecs;
  certifications: string[];
  status: ListingStatus;
  matchScore?: number;
  createdAt: string;
  expiresAt: string;
}

export type ListingStatus = 'active' | 'pending' | 'sold' | 'expired' | 'draft';

export interface SellerInfo {
  id: string;
  name: string;
  type: 'business' | 'municipal' | 'collector' | 'recycler';
  rating: number;
  verified: boolean;
}

export interface MaterialSpecs {
  purity: number;
  moisture: number;
  contamination: number;
  particleSize?: string;
  color?: string;
  other: Record<string, string>;
}

export interface CollectionRequest {
  id: string;
  userId: string;
  address: Location;
  materials: RequestMaterial[];
  preferredDate: string;
  preferredTimeSlot: TimeSlot;
  status: RequestStatus;
  assignedVehicle?: string;
  notes?: string;
  createdAt: string;
}

export interface RequestMaterial {
  type: MaterialType;
  estimatedWeight: number;
  description?: string;
  images?: string[];
}

export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'anytime';

export type RequestStatus = 'pending' | 'confirmed' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';

export interface TelemetryData {
  timestamp: string;
  nodeId: string;
  metrics: Record<string, number>;
  location?: Location;
  alerts: Alert[];
}

export interface Alert {
  id: string;
  type: AlertType;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: string;
  acknowledged: boolean;
  relatedEntityId?: string;
  relatedEntityType?: string;
}

export type AlertType = 'weight_variance' | 'purity_alert' | 'route_deviation' | 'capacity_exceeded' | 'maintenance_due' | 'compliance_issue' | 'contamination_detected';

export interface KPIMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  target?: number;
  status: 'on_track' | 'at_risk' | 'off_track';
}

export interface DashboardData {
  kpis: KPIMetric[];
  charts: ChartData[];
  recentActivity: ActivityItem[];
  alerts: Alert[];
}

export interface ChartData {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'sankey';
  title: string;
  data: any[];
  config: ChartConfig;
}

export interface ChartConfig {
  xKey?: string;
  yKeys?: string[];
  colors?: string[];
  height?: number;
}

export interface ActivityItem {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user?: string;
  entityId?: string;
  entityType?: string;
}

export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: MessageMetadata;
  actions?: CopilotAction[];
}

export interface MessageMetadata {
  intent?: string;
  confidence?: number;
  entities?: Entity[];
  context?: Record<string, any>;
}

export interface Entity {
  type: string;
  value: string;
  confidence: number;
}

export interface CopilotAction {
  type: 'navigate' | 'execute' | 'show_data' | 'create' | 'analyze';
  label: string;
  payload: any;
}

export interface SearchResult {
  id: string;
  type: 'material' | 'passport' | 'facility' | 'vehicle' | 'user' | 'alert';
  title: string;
  subtitle: string;
  description: string;
  metadata: Record<string, any>;
  relevanceScore: number;
  url: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  success: boolean;
}